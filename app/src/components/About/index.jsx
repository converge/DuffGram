import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class About extends React.Component {
    render() {
        return (
            <div className="">
            <Typography color="textSecondary" gutterBottom="gutterBottom">
                <h1>About</h1>
            </Typography>
            <Card >
                <CardContent>
                    <Typography color="textSecondary" gutterBottom="gutterBottom">
                        <p>Author: João Vanzuita</p>
                        <p>email: joaovanzuita@me.com</p>
                    </Typography>
                </CardContent>
            </Card>
        </div>);
    }
}
