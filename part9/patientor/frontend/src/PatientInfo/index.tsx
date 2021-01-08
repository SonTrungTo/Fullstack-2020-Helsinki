import React from 'react';
import axios from 'axios';
import { Container, Button } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { Patient } from '../types';

const PatientInfo: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue();

    return;
};

export default PatientInfo;