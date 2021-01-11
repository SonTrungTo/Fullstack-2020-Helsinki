import React, { useState } from "react";
import { Modal, Segment, Dropdown, DropdownProps } from "semantic-ui-react";
import AddHealthEntryForm,
    { HealthEntryFormValues } from "./AddHealthEntryForm";
import AddOccupationalForm from "./AddOccupationalHealthcareForm";
import { OccupationalEntryFormValues } from "./AddOccupationalHealthcareForm";
import { EntryOption } from "../AddPatientModal/FormField";

export type EntryForm =
    | HealthEntryFormValues
    | OccupationalEntryFormValues;

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryForm) => void;
    error?: string;
}

const entryOptions: EntryOption[] = [
    { value: 'Hospital', text: 'Hospital Check', key: '1' },
    { value: 'HealthCheck', text: 'Health Check', key: '2' },
    { value: 'OccupationalHealthcare', text: 'Occupational Check', key: '3' }
];

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    const [optionValue, setOptionValue] = useState<EntryOption['value']>('Hospital');

    const FormReturn = (optionValue: EntryOption['value']) => {
        switch (optionValue) {
            case 'HealthCheck':
                return <AddHealthEntryForm onSubmit={onSubmit} onCancel={onClose} />;

            case 'OccupationalHealthcare':
                return <AddOccupationalForm onSubmit={onSubmit} onCancel={onClose} />;
        
            default:
                return null;
        }
    };

    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon closeOnDimmerClick={false}>
            <Modal.Header>Add a new entry</Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <label style={{fontWeight: 'bold'}}>Pick the type of form: </label>
                <Dropdown
                    fluid
                    selection
                    options={ entryOptions }
                    onChange={ (_e, { value }) => setOptionValue(value as DropdownProps['data']) }
                />
                { FormReturn(optionValue) }
            </Modal.Content>
        </Modal>
    );
};

export default AddPatientModal;