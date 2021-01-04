import DiagnoseEntries from "../data/diagnoses";

import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
    return DiagnoseEntries;
};

export default {
    getDiagnoses
};