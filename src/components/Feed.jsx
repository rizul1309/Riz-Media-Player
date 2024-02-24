import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {SideBar,Videos} from './'
import { FetchFromAPI } from '../utils/FetchFromAPI'
const Feed = () => {
  const [selectedcategory,setselectedcategory]=useState('New')
  const [videos,setvideos]=useState([])

  useEffect(()=>{
    FetchFromAPI(`search?part=snippet&q=${selectedcategory}`).then((data)=>setvideos(data.items))
  },[selectedcategory]);
  
  return (
    <Stack sx={{
      flexDirection:{sx:'column',md:'row'}
    }}>
    <Box sx={{height:{sx:'auto',md:'92vh'},borderRight:'1px solid #3d3d3d',px:{sx:0,md:2}
    }}>
      <SideBar
        selectedcategory={selectedcategory} setselectedcategory={setselectedcategory}
      />
      <Typography className='copyright' varient='body2'sx={{mt:1.5,color:'#fff'}}>
        Copyright © 2024 Rizul Walia Media Studios
      </Typography>
    </Box>
    <Box p={2} sx={{overflowY:'auto' ,height:'90vh', flex:2}}>
      <Typography varient='h4' fontWeight='bold' mb={2} sx={{color:'white'}}>
          {selectedcategory} <span style={{color:'#F31503'}}>
            videos
        </span>
      </Typography>
      <Videos videos={videos}/>
    </Box>
    </Stack>
  )
}

export default Feed