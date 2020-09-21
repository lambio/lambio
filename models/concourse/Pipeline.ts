import fs from 'fs'
import fetch from 'node-fetch'
import _ from 'lodash'
import { ConcourseModel } from './ConcourseModel'

export class Pipeline extends ConcourseModel {
    asset: any
    name: string
    teamName: string
    assetUrl: string
    assetNewYaml: string

    constructor(asset) {
        super()
        this.teamName = asset.project.teamName
        this.name = `${asset.project.name}-${asset.name}`
        this.assetUrl = `${this.api}/teams/${this.teamName}/pipelines/${this.name}`
        this.assetNewYaml = this.evaluateYaml(asset)
    }

    evaluateYaml(asset) {
        let pipelineTemplate = fs.readFileSync(`infra/${asset.type}/${asset.type}-pipeline.yml`)
        let pipelineText = pipelineTemplate.toString()
        _.templateSettings.interpolate = /\(\(([\s\S]+?)\)\)/g; // Pattern like ((var))
        let compiled = _.template(pipelineText);
        return compiled(asset.info);
    }

    async save(pipelineVersion = null) {
        let headers = {...this.headers, "Content-type": "application/x-yaml"}
        if (pipelineVersion) {
            headers["X-Concourse-Config-Version"] = pipelineVersion
        }
        return fetch(this.assetUrl + '/config', {
            headers,
            method: 'PUT',
            body: this.assetNewYaml
        })
    }

    async create() {
        // Create pipeline
        let response = await this.save()
        // Unpuase pipeline
        return fetch(this.assetUrl + '/unpause', {
            headers: {...this.headers},
            method: 'PUT',            
        })
    }

    async update() {
        // Get current pipeline version
        let response = await fetch(this.assetUrl + '/config', {
            headers: {...this.headers},
        })
        let pipelineVersion = response.headers.get('X-Concourse-Config-Version')      
        // Update pipeline
        return this.save(pipelineVersion)
    }

    async remove() {
        return fetch(this.assetUrl, {
            method: 'DELETE',
            headers: {...this.headers}
        })
    }
}