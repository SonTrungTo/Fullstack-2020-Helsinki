import React from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue } from '../state';
import { Gender, Patient, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import { showPatient, setDiagnosesList } from '../state/reducer';
import EntryDetails from "../EntryDetails";

const PatientInfo: React.FC = () => {
    const [{ patient, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{id: string}>();
    React.useEffect(() => {
        const fetchPatient = async (id: string) => {
          try {
            const { data: patientFromApi } = await axios.get<Patient | null>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(showPatient(patientFromApi));
          } catch (error) {
            console.error(error);
          }
        };
    
        if (!patient || patient.id !== id) {
            fetchPatient(id).then(() => console.log('patient fetched!'),
        (error) => console.log(error.message));
        }
    
      }, [id]);

      React.useEffect(() => {
        const fetchDiagnosesList = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnosesList(diagnosesFromApi));
            } catch (error) {
                console.error(error);
            }
        };

        if (patient !== null && patient.entries.length !== 0) {
            for (const entry of patient.entries) {
                if (Array.isArray(entry.diagnosisCodes) && entry.diagnosisCodes.length !== 0) {
                    fetchDiagnosesList().then(() => console.log('Diagnoses list fetched!'),
                        (error) => console.log(error.message));
                    break;
                }
            }
        }

      }, [patient]);

    const patientGenderReactElement = (gender: Gender) => {
        switch (gender) {
            case 'male':
                return <Icon name='mars' size='large' />;

            case 'female':
                return <Icon name='venus' size='large' />;
        
            default:
                return <Icon name='genderless' size='large' />;
        }
    };

    const showDiagnosisName = (code: Diagnosis['code']): Diagnosis['name'] | null => {
        return !diagnoses[code] ? null : diagnoses[code].name;
    };

    if (!patient) {
        return null;
    }

    return (
        <div className="App">
            <Container>
                <h1>{patient.name} {patientGenderReactElement(patient.gender)} </h1>
                <div style={{marginTop: 20, marginBottom: 20}}>
                    <div>ssn: {patient.ssn}</div>
                    <div>occupation: {patient.occupation}</div>
                    <div>date of birth: {patient.dateOfBirth}</div>
                </div>
                { patient.entries.length === 0 ? null :
                <div>
                    <h3>entries</h3>
                    {patient.entries.map(entry =>
                        <div key={entry.id}>
                            <EntryDetails entry={ entry } />
                            <ul>
                                { Array.isArray(entry.diagnosisCodes) ?
                                entry.diagnosisCodes.map(code =>
                                    <li key={ code }>
                                        { code }
                                        <span style={{marginLeft: 10}}>
                                            { showDiagnosisName(code) }
                                        </span>
                                    </li>
                                    )
                                : null
                                }
                            </ul>
                        </div>
                        )
                    }
                </div> }
            </Container>
        </div>
    );
};

export default PatientInfo;