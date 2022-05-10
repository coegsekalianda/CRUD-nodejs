var dbConn = require('../../config/db.config');

var Employee = function(employee){
    this.first_name = employee.body.first_name;
    this.last_name = employee.body.last_name;
    this.email = employee.body.email;
    this.phone = employee.body.phone;
    this.organization = employee.body.organization;
    this.designation = employee.body.designation;
    this.salary = employee.body.salary;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.image = employee.files.filename;
}

Employee.getGetAllEmployee = (result) => {
    dbConn.query('SELECT * FROM employees' , (err,res) => {
        if(err){
            console.log('Error while fetching employees',err);
            result(null,err);
        }else{
            console.log('Employees fetched succesfully');
            result(null,res);
        }
    })
}

Employee.getEmployeeByID = (id,result) => {
    dbConn.query('SELECT * FROM employees WHERE id=?', id, (err,res) => {
        if(err){
            console.log('Error while fetching employees by id',err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

Employee.createEmployee = (employeeReqData,result) => {
    dbConn.query('INSERT INTO employees SET ?', employeeReqData, (err,res) => {
        if(err){
            console.log('Error while inserting data');
            result(null,err);
        }else{
            console.log('Employee created succesfully');
            result(null,res);
        }
    })
}

Employee.updateEmployee = (id, employeeReqData, result)=>{
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", 
    [employeeReqData.first_name,employeeReqData.last_name, employeeReqData.email, employeeReqData.phone, employeeReqData.organization, employeeReqData.designation, employeeReqData.salary, id], 
        (err, res)=>{
        if(err){
            console.log('Error while updating employee');
            result(null,err);
        }else{
            console.log('Employee updated  succesfully');
            result(null,res);
        }
    });
}

Employee.deleteEmployee = (id, result)=>{
    dbConn.query('DELETE FROM employees Where id=?', [id], (err, res)=>{
        if(err){
            console.log('Error while deleting employee');
            result(null,err);
        }else{
            result(null,res);
        }
    })
    /*dbConn.query("UPDATE employees SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
        if(err){
            console.log('Error while deleting employee');
            result(null,err);
        }else{
            console.log('Employee deleted  succesfully');
            result(null,res);
        }
    });*/
}


module.exports = Employee;