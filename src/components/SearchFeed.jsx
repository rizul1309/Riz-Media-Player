import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {SideBar,Videos} from './'
import { FetchFromAPI } from '../utils/FetchFromAPI'
import { useParams } from 'react-router-dom'
const SearchFeed = () => {
  const [videos,setvideos]=useState([])
  const {searchterm} = useParams()
  useEffect(()=>{
    FetchFromAPI(`search?part=snippet&q=${searchterm}`).then((data)=>setvideos(data.items))
  },[searchterm]);
  
  return (
    <Box p={2} sx={{overflowY:'auto' ,height:'90vh', flex:2}}>
      <Typography varient='h4' fontWeight='bold' mb={2} sx={{color:'white'}}>
          Search results for : <span style={{color:'#F31503'}}>
            {searchterm}
        </span> videos
      </Typography>
      <Videos videos={videos}/>
    </Box>
  )
}

export default SearchFeed