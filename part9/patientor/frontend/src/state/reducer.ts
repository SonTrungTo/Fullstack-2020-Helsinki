import { State } from "./state";
import { Patient } from "../types";

export type Action =
    {
      type: "SHOW_PATIENT";
      payload: Patient | null;
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SHOW_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (list: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: list
  };
};


export const createNewPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const showPatient = (patient: Patient | null): Action => {
  return {
    type: 'SHOW_PATIENT',
    payload: patient
  };
};