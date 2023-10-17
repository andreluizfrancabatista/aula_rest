const express = require('express')
const router = express.Router()
const Model = require('../model/model')

//Post
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    try{
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)
    }
    catch (error){
        res.status(400).json({message: error.message})
    }
})

//GetAll
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find()
        res.json(data)
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
})

//Get by id
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id)
        res.json(data)
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
})

//Update
router.patch('/update/:id', async (req, res) => {
    try{
        const id = req.params.id
        const updateData = req.body
        const options = {new: true}

        const result = await Model.findByIdAndUpdate(id, updateData, options)
        res.send(result)
    }
    catch (error){
        res.status(400).json({message: error.message})
    }
})

//Delete
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await Model.findByIdAndDelete(id)
        res.send(`Documento com ${data.name} foi apagado...`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router