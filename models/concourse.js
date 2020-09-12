require('dotenv').config()
const fs = require('fs');
const fetch = require('node-fetch');

class ConcourseClient {

    constructor() {
      this.token = process.env.CONCOURSE_TOKEN
      this.api = process.env.CONCOURSE_API
    }
    async sendPipeline(asset, project, pipelineVersion) {
        // Create pipeline        
        let headers = { 
            'Authorization': `Bearer ${this.token}`,
            "Content-type": "application/x-yaml",
        }
        if (pipelineVersion) {
            headers["X-Concourse-Config-Version"] = pipelineVersion
        }
        let pipelineTemplate = fs.readFileSync(`infra/${asset.type}/${asset.type}-pipeline.yml`)
        await fetch(`${this.api}/teams/${project.teamName}/pipelines/${asset.name}/config`, {
            headers,
            method: 'PUT',
            body: pipelineTemplate
        })
    }
    async createPipeline(asset, project) {
        // Create pipeline
        this.sendPipeline(asset, project)
        // Unpuase pipeline 
        await fetch(`${this.api}/teams/${project.teamName}/pipelines/${asset.name}/unpause`, {
            headers: {'Authorization': `Bearer ${this.token}`},
            method: 'PUT',            
        })
    }

    async updatePipeline(asset, project) {
        // Get current pipeline version
        let response = await fetch(`${this.api}/teams/${project.teamName}/pipelines/${asset.name}/config`, {
            headers: { 'Authorization': `Bearer ${this.token}`}
        })
        let pipelineVersion = response.headers.get('X-Concourse-Config-Version')      
        // Update pipeline
        this.sendPipeline(asset, project, pipelineVersion)
    }
}

// Test
con = new ConcourseClient()
con.updatePipeline({name: 'trivy-scanner', type: 'trivy'}, {teamName: 'main'})
module.exports = ConcourseClient