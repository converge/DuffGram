import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class About extends React.Component {
    render() {
        return (
            <div className="">
	    <h1>About</h1>
            <Card >
                <CardContent>
                    <Typography color="textSecondary" gutterBottom={true}>
			Author: João Vanzuita<br/>

			<br/>email: joaovanzuita@me.com
                    </Typography>
                </CardContent>
            </Card>
        </div>);
    }
}
