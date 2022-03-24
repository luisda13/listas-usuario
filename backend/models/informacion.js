const bd = require("./../db");

const list =(params = {})=>bd(process.env.T_INFORMACION).where(params).select("*");

const create = (obj) => bd(process.env.T_INFORMACION).insert(obj);

const update = (id,obj) => bd(process.env.T_INFORMACION).where(id).update(obj);

const eliminar = (id) => bd(process.env.T_INFORMACION).where(id).delete();

module.exports={list,create,update,eliminar};