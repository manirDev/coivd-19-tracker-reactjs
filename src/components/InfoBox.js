import React from 'react'
import './InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core'
function InfoBox({title,total,cases,lastUpdate, footer, ...props }) {
    return (
        <Card onClick={props.onClick} classes="infobox">
            <CardContent>
                {/*title */}
                <Typography className="infobox_title" color="textSecondary">{title}</Typography>
                {/*cases */}
                <h2 className="infobox_cases">{cases}</h2>
                <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                {/*total */}
                <Typography className="infobox_total" color="textSecondary">{total} Total</Typography>
                <small>{footer}</small>
            </CardContent>
        </Card>
    )
}

export default InfoBox
