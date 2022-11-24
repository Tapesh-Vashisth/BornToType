import {Button, Container, Paper} from '@mui/material'
import React,{useState} from 'react'
import {makeStyles} from '@mui/styles'
import commonProfileStyles from './commonProfileStyles';
import themes from '../../features/theme/themes';
import { Stack } from '@mui/material';
import { useAppSelector } from '../../store/hooks';

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
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding:"1rem"
    },
    buttonList:{
        listStyle:"none",
        justifyContent:"space-between"
    },
}))

const Profile = () => {
    const commonProfStyles = commonProfileStyles();
    const theme = useAppSelector((state) => state.theme);
    const profStyles = styles()
    const [buttonHandling,setButtonHandling] = useState({
        first:true,
        second:false
    })

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
            <Paper className={profStyles.paperContainer} style = {{backgroundColor: themes[theme.theme].background}}>
                <div>
                    <div className={`${commonProfStyles.flexRow} ${profStyles.buttonList}`}>
                        {list.map((item,index)=>(
                            <div key={index}>
                                <button className={commonProfStyles.buttonStyle} type="button"
                                    onClick={item.clickFunction}
                                    style = {{backgroundColor: themes[theme.theme].playgroundcolor, color: themes[theme.theme].fontColor}}
                                >
                                    {item.title}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <Stack direction = "column" spacing = {4}>
                    {list.map((item,index)=>(
                        <Paper key={index} className={profStyles.paperContainer} style = {{backgroundColor: themes[theme.theme].background, color: themes[theme.theme].fontColor}}>
                            {item.clickBoolean && <item.jsx />}
                        </Paper>
                    ))}
                </Stack>
            </Paper>
        </Container>
    )
}

export default Profile;