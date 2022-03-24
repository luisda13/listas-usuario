const { response, Router } = require("express");
const express = require("express");
const router = express.Router();
const service = require('./../models/usuario');

const list=(req,res) =>
service.list()
.then((response)=>res.json(response))
.catch((error)=>res.send(error));

const single =(req,res)=>
service.list({codUsuario: req.params.codUsuario})
.then((response)=>res.json(response))
.catch((error)=>res.send(error));

const create =(req,res) =>{
    const usuario =({identificacion,codUsuario,nombres,apellidos,fechaNacimiento,género} =req.body);
    return service.create(usuario)
    .then((response)=>res.json(response))
    .catch((error)=>res.send(error));
}

const update =(req,res) =>{
    
    const usuario =({identificacion,codUsuario,nombres,apellidos,fechaNacimiento,género} =req.body);
    return service.update({"codUsuario":req.params.codUsuario},req.body)
    .then((response)=>res.json(response))
    .catch((error)=>res.send(error));
}

const eliminar =(req,res) =>{
    return service.eliminar({"codUsuario":req.params.codUsuario})
    .then((response)=>res.json(response))
    .catch((error)=>res.send(error));
}

router.get('/all',list);
router.get("/:idForanea", single);
router.post("/", create);
router.put("/update/:codUsuario", update);
router.delete("/delete/:codUsuario", eliminar);

module.exports =router;
