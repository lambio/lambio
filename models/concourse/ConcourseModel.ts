
export class ConcourseModel {
    api: string
    headers: Object

    constructor() {
        this.api = process.env.CONCOURSE_API
        this.headers = { 'Authorization': `Bearer ${process.env.CONCOURSE_TOKEN}` }
    }
}