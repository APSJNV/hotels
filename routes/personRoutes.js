const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

// Post route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log('Received data:', data);
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data saved successfully:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving person:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract ID from URL params
        const updatedPersonData = req.body; // Updated data sent by client

        const response = await Person.findByIdAndUpdate(
            personId,
            updatedPersonData,
            {
                new: true, // Return the updated document
                runValidators: true, // Run mongoose validators
            }
        );
        if(!response){
            return res.status(404).json({error:'Person Not found'})
        }

        console.log('Data updated successfully');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error updating person:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// for delete

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract ID from URL params

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person Not Found' });
        }

        console.log('Person deleted successfully');
        res.status(200).json({ message: 'Person deleted successfully', data: response });
    } catch (err) {
        console.error('Error deleting person:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
