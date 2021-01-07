import { PatientWithoutSsn, NewPatientEntry, Patient, Entry } from '../types';
import PatientEntries from '../data/patients';
import { v1 as uuid } from 'uuid';


const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    const PatientEntriesWithoutSsn: PatientWithoutSsn[] =
    PatientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
    return PatientEntriesWithoutSsn;
};

const addPatient = (object: NewPatientEntry): Patient => {
    const newEntry = {
        id: uuid(),
        ...object,
        entries: [] as Entry[]
    };

    PatientEntries.push(newEntry);
    return newEntry;
};

const getPatientById = (id: string): Patient | undefined => {
    const foundPatient = PatientEntries.find(entry => entry.id === id);
    return foundPatient;
};

export default {
    getPatientsWithoutSsn, addPatient, getPatientById
};