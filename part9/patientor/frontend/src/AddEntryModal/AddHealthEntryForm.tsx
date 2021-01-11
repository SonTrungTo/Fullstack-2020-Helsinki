import React from "react";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, NumberField,
    DiagnosisSelection } from "../AddPatientModal/FormField";
import { HealthEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

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
    const [{ diagnoses }] = useStateValue();

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
            const wrongTypeError = 'Wrong Type of Entry';
            const errors: { [field: string]: string } = {};
            if (!values.date) {
                errors.date = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (values.type !== 'HealthCheck') {
                errors.type = wrongTypeError;
            }
            if (!values.description) {
                errors.description = requiredError;
            }
            return errors;
        }}
        >
            {({ isValid, dirty,
            setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field 
                            label="Date"
                            name="date"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            name="specialist"
                            placeholder="Specialist"
                            component={TextField}
                        />
                        <Field
                            label="Type"
                            name="type"
                            placeholder="Type"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            name="description"
                            placeholder="Description"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={ Object.values(diagnoses) }
                            setFieldTouched={ setFieldTouched }
                            setFieldValue={ setFieldValue }
                        />
                        <Field
                            label="Health Rating"
                            name="healthCheckRating"
                            value={ 0 }
                            min={0}
                            max={3}
                            component={NumberField}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    type="button"
                                    onClick={ onCancel }
                                    color="red">
                                        Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    disabled={ !dirty || !isValid }
                                    color="green">
                                        Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
    </Formik>
    );
};

export default AddHealthEntryForm;