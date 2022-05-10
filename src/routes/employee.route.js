const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const employeeController = require('../controllers/employee.controller');

const storage = multer.diskStorage({
    destination:'./src/image/',
    filename:(req,file,cb)=>{
        return cb(null, Date.now() + "--" + file.originalname);
    }
})

const upload = multer({
    storage: storage
})

router.get('/', employeeController.getEmployeeList);

router.get('/:id',employeeController.getEmployeeByID);

router.post('/',upload.array('image', 2), employeeController.createNewEmployee);

router.put('/:id',employeeController.updateEmployee);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;