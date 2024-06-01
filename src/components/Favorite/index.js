import React, { useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./styles.css"
const Favorite = ({favorite,setFavorite}) => {
    const [loading1,setLoading1] = useState(false)
    const handlefav1 =(val,idx)=>{
        //   console.log("b",val.fav);
        let arr = [...favorite]
        val.fav = false;
            arr.splice(idx,1);
            setFavorite(arr)

        // console.log("fav",favorite);
        localStorage.setItem("fav",JSON.stringify(arr))
        setLoading1(!loading1)
        // console.log("A",val.fav);
        // console.log(names);
      }
  return (
    <div className="name-section">
      <div className="name-list">
        { favorite.length > 0 ? (
          favorite.map((val, idx) => {
            return <div key={idx} className="names">
                  {val.fav ?<div onClick={()=>handlefav1(val,idx)}><StarRateIcon /></div> : <div onClick={()=>handlefav1(val,idx)}>< StarBorderIcon/></div> }
                  <div>{val.name}</div>
              </div>;
          })
        ) : (
            <h1 style={{textAlign:"center"}}>Empty Fovorite List</h1>
        )}
      </div>
    </div>
  )
}

export default Favorite
