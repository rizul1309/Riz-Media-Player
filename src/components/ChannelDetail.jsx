import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FetchFromAPI } from '../utils/FetchFromAPI'
import { Videos, ChannelCard } from "./";
const ChannelDetail = () => {
  const {id}= useParams()
  const [channelDetail,setchannelDetail] = useState(null)
  const [videos,setvideos] = useState([])
  console.log(channelDetail,videos)
  useEffect(()=>{
    FetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=>(setchannelDetail(data?.items[0])))
    FetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=>(setvideos(data?.items)))
  },[id])
  return (
    <Stack direction={'column'}>
    <Box minHeight={'95vh'}>
      <div
      style={{height:'300px',
      background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
      zIndex: 10,}}
      />
      <ChannelCard channelDetail={channelDetail} marginTop='-110px'/>
    </Box>
    <Box display='flex' p={2}>
      <Box sx={{mr:{sm:'100px'}}} />
        <Videos videos={videos}/> 
    </Box>
    </Stack>
  )
}

export default ChannelDetail