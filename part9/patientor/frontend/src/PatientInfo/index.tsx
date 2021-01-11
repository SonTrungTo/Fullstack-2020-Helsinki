import React, { useState } from 'react';
import { Container, Icon, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue } from '../state';
import { Gender, Patient, Diagnosis, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { showPatient, setDiagnosesList, addEntry } from '../state/reducer';
import EntryDetails from "../EntryDetails";
import AddPatientModal from "../AddEntryModal";
import { HealthEntryFormValues } from '../AddEntryModal/AddHealthEntryForm';

const PatientInfo: React.FC = () => {
    const [{ patient, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{id: string}>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError]= useState<string | undefined>(undefined);
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

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: HealthEntryFormValues) => {
        try {
            const { data: addedEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry({entry: addedEntry, id}));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
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
            <AddPatientModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            onClose={closeModal}
            error={error}
            />
            <Button onClick={ () => openModal() }>Add</Button>
        </div>
    );
};

export default PatientInfo;