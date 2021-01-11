export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export type Entry = 
    | HealthEntry
    | OccupationalHealthcareEntry
    | HospitalEntry;

export type NewEntry = 
    | Omit<HealthEntry, 'id'>
    | Omit<OccupationalHealthcareEntry, 'id'>
    | Omit<HospitalEntry, 'id'>;

interface BaseEntry {
    id: string;
    date: string;
    type: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital',
    discharge: Discharge
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}