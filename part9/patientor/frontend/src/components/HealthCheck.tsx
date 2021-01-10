import React from "react";
import { HealthEntry, HealthCheckRating } from "../types";

import { Card, CardContent, CardHeader,
CardDescription, Icon } from "semantic-ui-react";

const HealthCheck: React.FC<{ entry: HealthEntry }>
    = ({ entry }) => {
        const showHealthRating = (rating: HealthCheckRating) => {
            switch (rating) {
                case 0:
                    return <Icon name='heart' color='green' size='small' />;

                case 1:
                    return <Icon name='heart' color='yellow' size='small' />;

                case 2:
                    return <Icon name='heart' color='orange' size='small' />;

                case 3:
                    return <Icon name='heart' color='red' size='small' />;
            
                default:
                    return null;
            }
        };

        return (
            <div style={{ width: '100%' }}>
                <Card fluid>
                    <CardContent>
                        <CardHeader>
                            { entry.date }
                            <span style={{ marginLeft: 20, marginRight: 20 }}>
                                <Icon name='user md' size='large' />
                            </span>
                        </CardHeader>
                        <CardDescription>
                            <p style={{ fontWeight: 'lighter' }}>
                                { entry.description }
                            </p>
                            <div>
                                { showHealthRating(entry.healthCheckRating) }
                            </div>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        );
};

export default HealthCheck;