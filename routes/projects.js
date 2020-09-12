var Project = require('../models').Project;
var Asset = require('../models').Asset;
var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const projects = await Project.findAll()
    res.send(projects);
});

router.get('/:id', async function(req, res, next) {
    const project = await Project.findOne({where: {id: req.params.id}, include: [Asset]})
    res.send(project);
});

router.post('/:id/assets', async function(req, res, next) {
    var project = await Project.findOne({where: {id: req.params.id}, include: [Asset]})
    var asset = await Asset.create({
        name: req.body.name, 
        type: req.body.type, 
        info: req.body.info
    });
    await project.addAsset(asset)
    res.send(project)
});

router.post('/', async function(req, res, next) {
    const id = req.body.id || null
    const [record, created] = await Project.upsert({
        id: id,
        name: req.body.name,
        desctiption: req.body.desctiption,
        teamName: req.body.teamName 
    },{ returning: true });
    res.send(record)
});

module.exports = router;