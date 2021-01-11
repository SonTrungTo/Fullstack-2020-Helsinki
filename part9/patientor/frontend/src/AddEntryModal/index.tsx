import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddHealthEntryForm,
    { HealthEntryFormValues } from "./AddHealthEntryForm";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HealthEntryFormValues) => void;
    error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddHealthEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddPatientModal;