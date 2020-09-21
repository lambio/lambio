import { Project } from '../models/Project'
import { Asset } from '../models/Asset'
import express from 'express'
var router = express.Router();

router.get('/', async function (req, res) {
    const projects = await Project.find()
    res.send(projects);
});

router.post('/add', async function (req, res) {
    let project = new Project()
    project.name = req.body.name
    project.description = req.body.description
    project.teamName = req.body.teamName
    await project.save()
    res.send(project)
});

router.get('/:id', async function (req, res) {
    const project = await Project.findOne({ where: { id: req.params.id }, relations: ["assets"] })
    res.send(project);
});

router.delete('/:id', async function (req, res) {
    let project = await Project.findOne({ where: { id: req.params.id } })
    project.remove()
    res.send();
});

router.post('/:id/assets', async function (req, res) {
    let project = await Project.findOne({ where: { id: req.params.id } })
    let asset = new Asset()
    asset.name = req.body.name,
        asset.type = req.body.type,
        asset.info = req.body.info
    asset.project = project
    asset.save()
    res.send(project)
});

export { router };