import {Button, Container, Paper} from '@mui/material'
import React,{useState} from 'react'
import {makeStyles} from '@mui/styles'
import commonProfileStyles from './commonProfileStyles';

const MyInformation = React.lazy(()=>import("./ProfileComponents/MyInformation"))
const Sessions = React.lazy(()=>import("./ProfileComponents/Sessions"))

interface ListItemProps{
    title:string,
    clickBoolean:boolean,
    clickFunction:(e:React.MouseEvent<HTMLButtonElement>) => void,
    jsx:React.LazyExoticComponent<() => JSX.Element>
}

const styles = makeStyles((theme)=>({
    mainContainer:{
        padding:"1rem",
    },
    paperContainer:{
        padding:"1rem"
    },
    buttonList:{
        listStyle:"none",
        justifyContent:"space-between"
    },
}))

const Profile = () => {
    const commonProfStyles = commonProfileStyles();
    const profStyles = styles()
    const [buttonHandling,setButtonHandling] = useState({
        first:true,
        second:false
    })

    console.log(buttonHandling)

    const infoButtonHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setButtonHandling({first:true,second:false});
    }

    const sessionsButtonHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setButtonHandling({first:false,second:true})
    }

    const list:ListItemProps[] = [
        {
            title:"My Information",
            clickBoolean:buttonHandling.first,
            clickFunction:infoButtonHandler,
            jsx:MyInformation
        },
        {
            title:"Sessions",
            clickBoolean:buttonHandling.second,
            clickFunction:sessionsButtonHandler,
            jsx:Sessions
        }
    ]

    return (
        <Container component="main" className={`${commonProfStyles.flexColumn} ${profStyles.mainContainer}`}>
            <Paper className={profStyles.paperContainer}>
                <div>
                    <ul className={`${commonProfStyles.flexRow} ${profStyles.buttonList}`}>
                        {list.map((item,index)=>(
                            <li key={index}>
                                <button className={commonProfStyles.buttonStyle} type="button"
                                    onClick={item.clickFunction}
                                >
                                    {item.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {list.map((item,index)=>(
                        <Paper key={index} className={profStyles.paperContainer}>
                            {item.clickBoolean && <item.jsx />}
                        </Paper>
                    ))}
                </div>
            </Paper>
        </Container>
    )
}

export default Profile;