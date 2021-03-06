import React from "react";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";

/* 
 * We are supporting only one entry: HealthEntry, omitting id
 * since it is irrelevant.
 */
export type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
    onSubmit: (values: OccupationalEntryFormValues) => void;
    onCancel: () => void;
}

const AddOccupationalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
    <Formik
        initialValues={{
            date: '',
            specialist: '',
            type: 'OccupationalHealthcare',
            description: '',
            diagnosisCodes: [],
            employerName: '',
            sickLeave: undefined
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = 'Field is required';
            const wrongTypeError = 'Wrong Type of Entry';
            const missingDateError = 'Missing start/end date of sick leave';
            const errors: { [field: string]: string } = {};
            if (!values.date) {
                errors.date = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (values.type !== 'OccupationalHealthcare') {
                errors.type = wrongTypeError;
            }
            if (!values.description) {
                errors.description = requiredError;
            }
            if (values.sickLeave && ((!values.sickLeave.startDate && values.sickLeave.endDate)
            || (values.sickLeave.startDate && !values.sickLeave?.endDate))) {
                errors.sickLeave = missingDateError;
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
                            label="Employer Name"
                            name="employerName"
                            placeholder="Place of employment"
                            component={TextField}
                        />
                        <Field
                            label="Sick Leave Start Date"
                            name="sickLeave.startDate"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
                        />
                        <Field
                            label="Sick Leave End Date"
                            name="sickLeave.endDate"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
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

export default AddOccupationalForm;