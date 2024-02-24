import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Paper,IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = () => {
  const [searchterm, setsearchterm] = useState('')
  const navigate = useNavigate();
  const onhandleSubmit = (e)=>{
    e.preventDefault();
    if(searchterm)
    {
      console.log(`/search/${searchterm}`)
      navigate(`/search/${searchterm}`);
      setsearchterm('')
    }
  }
  return (
    <Paper 
    component='form'
    onSubmit={onhandleSubmit}
    sx={{
      borderRadius:20,
      border:'1px solid #e3e3e3',
      pl:2,
      boxShadow:'none',
      mr: {sm:5}
    }}
    >
      <input
        className='search-bar'
        placeholder='Search...'
        value={searchterm}
        onChange={(e) => {setsearchterm(e.target.value)}}
       
      />
      <IconButton type='submit' sx={{ p: '10px', color: 'red' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar