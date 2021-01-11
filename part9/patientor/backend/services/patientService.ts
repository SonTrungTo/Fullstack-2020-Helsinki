import { PatientWithoutSsn, NewPatientEntry, Patient, Entry,
NewEntry } from '../types';
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

const addEntry = (id: string, entry: NewEntry): Entry => {
    const newEntry = {
        id: uuid(),
        ...entry
    };

    const foundPatient = PatientEntries.find(patient => patient.id === id);
    if (!foundPatient) {
        throw new Error('Patient not found! Cannot add entry!');
    }
    foundPatient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatientsWithoutSsn, addPatient, getPatientById, addEntry
};