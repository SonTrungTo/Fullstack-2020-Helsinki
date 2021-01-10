import React from "react";

import HealthCheck from "../components/HealthCheck";
import Hospital from "../components/Hospital";
import OccupationalHealthcare from "../components/OccupationalHealthcare";

import { assertNever } from "../utils";
import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <Hospital entry={ entry } />;

        case 'HealthCheck':
            return <HealthCheck entry={ entry } />;

        case 'OccupationalHealthcare':
            return <OccupationalHealthcare entry={ entry } />;
    
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;