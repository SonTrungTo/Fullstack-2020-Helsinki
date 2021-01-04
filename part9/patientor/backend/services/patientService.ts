import { PatientWithoutSsn } from '../types';
import { PatientEntriesWithoutSsn } from '../data/patients';

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return PatientEntriesWithoutSsn;
};

export default {
    getPatientsWithoutSsn
};