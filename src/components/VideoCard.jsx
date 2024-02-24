import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import {BloodtypeOutlined, CheckCircle} from '@mui/icons-material'
import { demoChannelTitle, demoChannelUrl, demoThumbnailUrl, demoVideoTitle, demoVideoUrl } from '../utils/constants'
import { grey } from '@mui/material/colors'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VideoCard = ({video : {id : {videoId}, snippet} }) => {
  return (
    <Card sx={{width:{ xs:'100%',sm:'358px',md:'320px'}, boxShadow:'none',borderRadius:0}}>
        <Link to={videoId? `/video/${videoId}` : demoVideoUrl }>
        <CardMedia 
        alt={snippet?.title}
        image={snippet?.thumbnails?.high?.url}
        sx={{width:{xs:'100%', sm:358, md: '320px'},height:180}}
        />
        </Link>
        <CardContent sx={{backgroundColor:'#1e1e1e', height:'106px'}}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
            <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
            </Typography>
        </Link>
        </CardContent>
        
    </Card>
  )
}

export default VideoCard