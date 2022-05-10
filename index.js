const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const employeeRoutes = require('./src/routes/employee.route');

app.use('/api/v1/employee', employeeRoutes);

app.get("/", async (req,res)=>{
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Express server is running at port ${port}`);
});