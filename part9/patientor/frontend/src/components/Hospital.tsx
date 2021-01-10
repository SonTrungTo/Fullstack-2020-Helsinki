import React from "react";
import { HospitalEntry } from "../types";

import { Card, CardHeader,
CardContent, CardDescription, Icon } from "semantic-ui-react";

const Hospital: React.FC<{ entry: HospitalEntry }>
= ({ entry }) => {
    return (
        <div style={{ width: '100%' }}>
            <Card fluid>
                <CardContent>
                    <CardHeader>
                        { entry.date }
                        <span style={{ marginLeft: 20, marginRight: 20 }}>
                            <Icon name='ambulance' size='large' />
                        </span>
                    </CardHeader>
                    <CardDescription>
                        <p style={{ fontWeight: 'lighter' }}>
                            { entry.description }
                        </p>
                        <div>
                            <h3>Discharge date</h3>
                            <ul>
                                <li>{ entry.discharge.date }</li>
                                <li>{ entry.discharge.criteria }</li>
                            </ul>
                        </div>
                        </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
};

export default Hospital;