import { Container, Typography } from "@mui/material";
import React from 'react'
import { Stack } from "@mui/material";
import commonProfileStyles from "../../commonProfileStyles";

const ProfileContainer = (props:{
    heading:string,
    children:React.ReactNode
}) => {
    const commonProfStyles = commonProfileStyles()
    return (
        <Stack component="section" direction = "column" spacing = {1}>
            <h1>{props.heading}</h1>
            {props.children}
        </Stack>
    )
}

export default ProfileContainer;