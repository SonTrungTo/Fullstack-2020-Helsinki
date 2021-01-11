/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NewEntry, Discharge, HealthCheckRating,
    SickLeave } from "./types";

const toNewEntry = (object: any): NewEntry => {
    const type = parseType(object.type);
    const date = parseDate(object.date);
    const specialist = parseSpecialist(object.specialist);
    const description = parseDescription(object.description);
    const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    switch (type) {
        case 'Hospital':
            return {
                date,
                type,
                specialist,
                description,
                diagnosisCodes,
                discharge: parseDischarge(object.discharge)
            };

        case 'HealthCheck':
            return {
                date,
                type,
                specialist,
                description,
                diagnosisCodes,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };

        case 'OccupationalHealthcare':
            return {
                date,
                type,
                specialist,
                description,
                diagnosisCodes,
                employerName: parseEmployerName(object.employerName),
                sickLeave: object.sickLeave === undefined ? undefined : parseSickLeave(object.sickLeave)
            };
    
        default:
            return assertNever(type);
    }
};

const parseType = (type: any): string => {
    if (!type || !isString(type)) {
        throw new Error('Invalid or missing type: ' + type);
    }
    return type;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Invalid or missing date: ' + date);
    }
    return date;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Invalid or missing specialist: ' + specialist);
    }
    return specialist;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Invalid or missing description: ' + description);
    }
    return description;
};

const parseDiagnosisCodes = (codes: any[]): string[] => {
    if (!isArray(codes)) {
        throw new Error('Invalid diagnosis code: ' + codes);
    }
    return codes;
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Invalid discharge: ' + discharge);
    }
    return discharge;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error('Invalid or missing health check rating: ' + rating);
    }
    return rating;
};

const parseEmployerName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Invalid or missing employer name: ' + name);
    }
    return name;
};

const parseSickLeave = (object: any): SickLeave => {
    if (!object || !isSickLeave(object)) {
        throw new Error('Invalid sick leave: ' + object);
    }
    return object;
};

const assertNever = (value: string): never => {
    throw new Error(`Unexpected type: ${JSON.stringify(value)}`);
};

const isString = (str: any): str is string => {
    return typeof str === "string" || str instanceof String;
};

const isArray = (ar: any[]): ar is string[] => {
    return Array.isArray(ar) &&
ar.filter(ele => typeof ele === 'string' || ele instanceof String).length === ar.length;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isDischarge = (param: any): param is Discharge => {
    if (!param.date || !isString(param.date) || !isDate(param.date)) {
        throw new Error('Invalid or missing discharge date: ' + param.date);
    }
    if (!param.criteria || !isString(param.criteria)) {
        throw new Error('Invalid or missing discharge criteria: ' + param.criteria);
    }
    return true;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isSickLeave = (param: any): param is SickLeave => {
    if (!param.startDate || !isString(param.startDate) || !isDate(param.startDate)) {
        throw new Error('Invalid or missing start date of sick leave: ' + param.startDate);
    }
    if (!param.endDate || !isString(param.endDate) || !isDate(param.endDate)) {
        throw new Error('Invalid or missing end date of sick leave: ' + param.endDate);
    }
    return true;
};