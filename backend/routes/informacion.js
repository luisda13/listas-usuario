const express = require("express");
const router = express.Router();
const service = require('./../models/informacion');

const list=(req,res) =>
service.list()
.then((response)=>res.json(response))
.catch((error)=>res.send(error));

const single =(req,res)=>
service.list({idForanea: req.params.idForanea})
.then((response)=>res.json(response))
.catch((error)=>res.send(error));

const create =(req,res) =>{
    const informacion =({idForanea,nombres,numeroContacto,tipoNumero,parentesco} =req.body);
    return service.create(informacion)
    .then((response)=>res.json(response))
    .catch((error)=>res.send(error));
}

const update =(req,res) =>{
    return service.update({"idForanea":req.params.idForanea},req.body)
    .then((response)=>res.json(response))
    .catch((error)=>res.send(error));
}

const eliminar =(req,res) =>{
    return service.eliminar({"idForanea":req.params.idForanea})
    .then((response)=>res.json(response))
    .catch((error)=>res.send(error));
}

router.get('/all',list);
router.get("/:idForanea", single);
router.post("/", create);
router.put("/update/:idForanea", update);
router.delete("/delete/:idForanea", eliminar);

module.exports =router;
