import React from 'react';
import "./StatBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

function StatBox({ title, cases, isRed, active, total, ...props }) {
    return (
            <Card onClick={props.onClick} className={`statBox ${active && "statBox--selected"} ${isRed && "statBox--red"}`}>
                <CardContent>
                    {/* image icon */}
                    {/* <LocalHospitalIcon /> */}
                    
                    {/* title */}
                    <Typography color="textSecondary" className="statBox_title">{title}</Typography>
                    {/* number cases */}

                    <h2 className={`statBox_cases ${!isRed && "statBox_cases--green"}`}>{cases}</h2>

                    {/* total */}

                    <Typography color="textSecondary" className="statBox_total">{total} Total</Typography>

                </CardContent>
            </Card>
            
    );
}

export default StatBox
