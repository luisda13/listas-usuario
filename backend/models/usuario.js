const bd = require("./../db");

const list =(params = {})=>bd(process.env.T_USUARIO).where(params).select("*");

const create = (obj) => bd(process.env.T_USUARIO).insert(obj);

const update = (id,obj) => bd(process.env.T_USUARIO).where(id).update(obj);

const eliminar = (id) => bd(process.env.T_USUARIO).where(id).delete();

module.exports={list,create,update,eliminar};