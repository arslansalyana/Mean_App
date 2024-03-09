const express = require('express');
const router = express.Router();

const { Employee } = require('../models/employee');
const { ObjectId } = require('mongodb'); // Correct import statement for ObjectId

// GET => localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find({})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log('Error in Retrieving Employees: ' + JSON.stringify(err, undefined, 2));
            res.status(500).send('Error in Retrieving Employees');
        });
});

// POST => localhost:3000/employees/
router.post('/', (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    }); 
    emp.save()
        .then(employee => {
            res.status(201).json(employee);
        })
        .catch(err => {
            console.log('Error in Creating Employee: ' + JSON.stringify(err, undefined, 2));
            res.status(500).send('Error in Creating Employee');
        });
});

// GET => localhost:3000/employees/:id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) { // Corrected to use ObjectId
        return res.status(404).send('Invalid ID');
    }
    Employee.findById(req.params.id)
        .then(employee => {
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.send(employee);
        })
        .catch(err => {
            console.log('Error in Retrieving Employee: ' + JSON.stringify(err, undefined, 2));
            res.status(500).send('Error in Retrieving Employee');
        });
});

// PUT => localhost:3000/employees/:id
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) { // Corrected to use ObjectId
        return res.status(404).send('Invalid ID');
    }
    const emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true })
        .then(employee => {
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.send(employee);
        })
        .catch(err => {
            console.log('Error in Updating Employee: ' + JSON.stringify(err, undefined, 2));
            res.status(500).send('Error in Updating Employee');
        });
});

// DELETE => localhost:3000/employees/:id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) { // Corrected to use ObjectId
        return res.status(404).send('Invalid ID');
    }
    Employee.findByIdAndDelete(req.params.id)
        .then(employee => {
            if (!employee) {
                return res.status(404).send('Employee not found');
            }
            res.send(employee);
        })
        .catch(err => {
            console.log('Error in Deleting Employee: ' + JSON.stringify(err, undefined, 2));
            res.status(500).send('Error in Deleting Employee');
        });
});

module.exports = router;