import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSsn());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newEntry = patientService.addPatient({
        name, dateOfBirth, ssn, gender, occupation
    });
    return res.json(newEntry);
});

export default router;