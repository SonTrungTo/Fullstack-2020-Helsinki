import React from "react";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, NumberField } from "../AddPatientModal/FormField";
import { HealthEntry, HealthCheckRating } from "../types";

/* 
 * We are supporting only one entry: HealthEntry, omitting id
 * since it is irrelevant.
 */
export type HealthEntryFormValues = Omit<HealthEntry, 'id'>;

interface Props {
    onSubmit: (values: HealthEntryFormValues) => void;
    onCancel: () => void;
}

const AddHealthEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

    return (
    <Formik
        initialValues={{
            date: '',
            specialist: '',
            type: 'HealthCheck',
            description: '',
            diagnosisCodes: [],
            healthCheckRating: HealthCheckRating.Healthy
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = 'Field is required';
            const errors: { [field: string]: string } = {};
            if (!values.date) {
                errors.date = requiredError;
            }
        }}
        >

    </Formik>
    );
};

export default AddHealthEntryForm;