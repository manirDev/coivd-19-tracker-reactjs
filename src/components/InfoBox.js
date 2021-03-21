import React from 'react'
import './InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Info } from '@material-ui/icons'
function InfoBox({title,total,cases,lastUpdate, active,isYellow,isBlue, isRed,isGreen,  ...props }) {
    return (
        <Card onClick={props.onClick}
        className={`infoBox ${active && "infoBox--blue"} ${isBlue && "infobox--blue"}
        ${isGreen && " InfoBox--green"} 
        ${
            isRed && "infoBox--red" 
          }
        ${isYellow && "infobox--yellow"}`}>
            <CardContent className="box_content">
                {/*title */}
                <Typography className="infobox_title" color="textSecondary">{title}</Typography>
                {/*cases */}
                <h2 className="infobox_cases">{cases}</h2>
                <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                {/*total */}
                <Typography className="infobox_total" color="textSecondary">{total} Total</Typography>
                
            </CardContent>
        </Card>
    )
}

export default InfoBox
