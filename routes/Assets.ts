import {Project} from '../models/Project'
import {Asset} from '../models/Asset'
import express from 'express'
var router = express.Router();

router.get('/:id', async function(req, res, next) {
    let asset = await Asset.findOne({where: {id: req.params.id}, relations: ["project"]})
    res.send(asset);
});

router.delete('/:id', async function(req, res, next) {
    let asset = await Asset.findOne({where: {id: req.params.id}, relations: ["project"]})
    asset.remove()
    res.send();
});

export { router };