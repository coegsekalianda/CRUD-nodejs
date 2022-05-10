const EmployeeModel = require('../models/employee.model');

exports.getEmployeeList = (req,res)=>{
    EmployeeModel.getGetAllEmployee((err,employees)=>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Employee', employees);
        res.send(employees)
    })
}

exports.getEmployeeByID = (req,res)=>{
    EmployeeModel.getEmployeeByID(req.params.id, (err,employee)=>{
        if(err)
        res.send(err);
        console.log('Single employee data', employee);
        res.send(employee)
    })
}

exports.createNewEmployee = (req,res)=>{
    const employeeReqData = new EmployeeModel(req);
    console.log('employeeReqData', employeeReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        console.log('valid data');
        EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
            if(err)
            res.send(err);
            res.json({status: true, message: 'Succes', data: employee.inserId})
        })
    }
}

exports.updateEmployee = (req,res)=>{
    const employeeReqData = new EmployeeModel(req);
    console.log('employeeReqData update', employeeReqData);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        EmployeeModel.updateEmployee(req.params.id, employeeReqData, (err, employee) => {
            if(err)
            res.send(err);
            res.json({status: true, message: 'Updated'})      
        })
    }
}

exports.deleteEmployee = (req,res) => {
    EmployeeModel.deleteEmployee(req.params.id, (err, employee)=>{
        if(err)
        res.send(err);
        res.json({succes: true, message: 'Employee Deleted'})
    })
}