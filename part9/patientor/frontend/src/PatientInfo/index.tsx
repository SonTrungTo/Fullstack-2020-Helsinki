import React from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue } from '../state';
import { Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { showPatient } from '../state/reducer';

const PatientInfo: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue();
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
    if (!patient) {
        return null;
    }

    return (
        <div className="App">
            <Container>
                <h1>{patient.name} {patientGenderReactElement(patient.gender)} </h1>
                <ul>
                    <li>ssn: {patient.ssn}</li>
                    <li>occupation: {patient.occupation}</li>
                    <li>date of birth: {patient.dateOfBirth}</li>
                </ul>
            </Container>
        </div>
    );
};

export default PatientInfo;