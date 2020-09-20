import fs from 'fs'
import fetch from 'node-fetch'
import _ from 'lodash'

export class ConcourseClient {
    token: string
    api: string

    constructor() {
      this.token = process.env.CONCOURSE_TOKEN
      this.api = process.env.CONCOURSE_API
    }

    createURL(asset) {
        return `${this.api}/teams/${asset.project.teamName}/pipelines/${asset.project.name}-${asset.name}`
    }

    evaluatePipelineYaml(asset) {
        let pipelineTemplate = fs.readFileSync(`infra/${asset.type}/${asset.type}-pipeline.yml`)
        let pipelineText = pipelineTemplate.toString()
        _.templateSettings.interpolate = /\(\(([\s\S]+?)\)\)/g; // Pattern like ((var))
        let compiled = _.template(pipelineText);
        return compiled(asset.info);
    }

    async sendPipeline(asset, pipelineVersion = null) {
        let headers = { 
            'Authorization': `Bearer ${this.token}`,
            "Content-type": "application/x-yaml",
        }
        if (pipelineVersion) {
            headers["X-Concourse-Config-Version"] = pipelineVersion
        }
        
        let pipelineTemplate = this.evaluatePipelineYaml(asset)
        return await fetch(this.createURL(asset) + '/config', {
            headers,
            method: 'PUT',
            body: pipelineTemplate
        })
    }
    async createPipeline(asset) {
        // Create pipeline
        await this.sendPipeline(asset)
        // Unpuase pipeline
        await fetch(this.createURL(asset) + '/unpause', {
            headers: {'Authorization': `Bearer ${this.token}`},
            method: 'PUT',            
        })
    }

    async updatePipeline(asset) {
        // Get current pipeline version
        let response = await fetch(this.createURL(asset) + '/config', {
            headers: { 'Authorization': `Bearer ${this.token}`}
        })
        let pipelineVersion = response.headers.get('X-Concourse-Config-Version')      
        // Update pipeline
        this.sendPipeline(asset, pipelineVersion)
    }

    async removePipeline(asset) {
        let response = await fetch(this.createURL(asset), {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${this.token}`}
        })
    }
}