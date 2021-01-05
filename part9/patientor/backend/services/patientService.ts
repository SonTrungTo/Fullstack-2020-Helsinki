import { PatientWithoutSsn, NewPatientEntry, Patient } from '../types';
import PatientEntries from '../data/patients';
import { v1 as uuid } from 'uuid';


const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    const PatientEntriesWithoutSsn: PatientWithoutSsn[] =
    PatientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
    return PatientEntriesWithoutSsn;
};

const addPatient = (object: NewPatientEntry): Patient => {
    const newEntry = {
        id: uuid(),
        ...object
    };

    PatientEntries.push(newEntry);
    return newEntry;
};

export default {
    getPatientsWithoutSsn, addPatient
};