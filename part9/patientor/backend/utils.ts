/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NewPatientEntry, Gender, Entry } from './types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Invalid or missing name: ${name}`);
    }
    return name;
};

const parseDateOfBirth = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Invalid or missing birthday: '+ date);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Invalid or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Invalid or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Invalid or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseEntries = (entries: any[]): Entry[] => {
    if (!Array.isArray(entries) || !isEntry(entries)) {
        throw new Error('Invalid entry structure!');
    }
    return entries;
};

const isString = (str: any): str is string => {
    return typeof str === "string" || str instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntry = (param: any[]): param is Entry[] => {
    param.forEach(entry => {
        switch (entry.type) {
            case 'Hospital':
                break;

            case 'OccupationalHealthcare':
                break;

            case 'HealthCheck':
                break;
        
            default:
                throw new Error(`Unexpected entry type: ${JSON.stringify(entry)}`);
        }
    });
    return true;
};

export default toNewPatientEntry;