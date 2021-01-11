/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSsn());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatientById(id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(400).send('Error: Patient not found!');
    }
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
});

router.post('/', (req, res) => {
    try {
        const newEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newEntry);
        res.json(addedEntry);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;