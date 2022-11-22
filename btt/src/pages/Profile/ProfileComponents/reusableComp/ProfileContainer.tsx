import { Container, Typography } from "@mui/material";
import React from 'react'
import commonProfileStyles from "../../commonProfileStyles";

const ProfileContainer = (props:{
    heading:string,
    children:React.ReactNode
}) => {
    const commonProfStyles = commonProfileStyles()
    return (
        <Container component="section" className={`${commonProfStyles.flexColumn}`}>
            <h1>{props.heading}</h1>
            {props.children}
        </Container>
    )
}

export default ProfileContainer;