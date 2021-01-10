import React from "react";
import { OccupationalHealthcareEntry } from "../types";

import { Card, Icon, CardHeader, CardContent,
CardDescription } from "semantic-ui-react";

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }>
    = ({ entry }) => {
        return (
            <div style={{ width: '100%' }}>
                <Card fluid>
                    <CardContent>
                        <CardHeader>
                            { entry.date }
                            <span style={{ marginLeft: 20, marginRight: 20 }}>
                                <Icon name='stethoscope' size='large' />
                            </span>
                            { entry.employerName }
                        </CardHeader>
                        <CardDescription>
                            <p style={{ fontWeight: 'lighter' }}>
                                { entry.description }
                            </p>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        );
};

export default OccupationalHealthcare;