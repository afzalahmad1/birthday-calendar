import React from 'react'
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import './styles.css'
const Search = ({setSearch,search}) => {
  return (
    <div className='search-flex'>
      <div className='search'>
        <SearchRoundedIcon color="disabled"/>
        <input type="text" name="" id="" value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder='Search'/>
      </div>
    </div>
  )
}

export default Search