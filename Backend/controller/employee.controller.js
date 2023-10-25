const {Employee} = require("../models/models");

async function getAllEmployees(req,res){
    const employees =  await Employee.findAll();
    console.log(employees);
    res.json(employees)
}
async function getUserByIDController(req,res){
    const id = req.params.id
     Employee.findByPk(id).then(data=>{
        res.json(data.toJSON());
     }).catch(err=>{
        res.json({error:true,message:err.message})
     })
}
async function deleteUserController(req, res) {
    const id = req.params.id;

    try {
        const result = await Employee.destroy({
            where: {
                EmployeeID: id
            }
        });

        if (result === 1) {
            res.json('entry deleted');
        } else {
            res.json({ error: true, message: 'ID not found' });
        }
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
}
async function createUserController(req,res){
    const data= req.body;
    const Joi = require('joi');
    const schema = Joi.object().keys({
        EmployeeID: Joi.number().integer().greater(6).required(),
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
    });

    const { error } = schema.validate(data);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        console.log(data);
        res.json('ok');
        Employee.create(data)
    }
}

async function updateUserController(req,res){
    id = req.params.id
    placeholder = req.body
    console.log(placeholder)
    try{
        await Employee.update(placeholder,
            {
                where: {EmployeeID:id}
            })
        res.json("done")

    }catch(err){
        res.json("error",err)
    }
}
module.exports= {getAllEmployees,getUserByIDController,deleteUserController,createUserController,updateUserController}