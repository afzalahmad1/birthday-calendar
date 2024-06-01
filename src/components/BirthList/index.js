import React, { useState } from "react";
import "./styles.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import Search from "../Search";
const BirthList = ({ names, search, setSearch ,setFavorite,favorite}) => {
    const [loading,setLoading] = useState(false);
  console.log("bbb", typeof names);
  const handlefav =(val,idx)=>{
    //   console.log("b",val.fav);
    let arr = [...favorite]
    val.fav = !val.fav
    if(val.fav){
        if(!favorite.includes(val)){
            arr.push(val)
            setFavorite(arr);
        }
    }else{
        console.log("idx",idx);
        for(let i=0;i<arr.length;i++){
            if(arr[i].name === val.name){
                arr.splice(i,1)
            }
        }
        setFavorite(arr)
    }
    setLoading(!loading)
    console.log("fav",arr);
    localStorage.setItem("fav",JSON.stringify(arr))
    // console.log("A",val.fav);
    // console.log(names);
  }
  return (
    <div className="name-section">
      <div>
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="name-list">
        {names && names.length > 0 ? (
          names.map((val, idx) => {
            return <div key={idx} className="names">
                  {val.fav || favorite.includes(val.name)?<div onClick={()=>handlefav(val,idx)}><StarRateIcon /></div> : <div onClick={()=>handlefav(val,idx)}>< StarBorderIcon/></div> }
                  <div>{val.name}</div>
              </div>;
          })
        ) : (
            <div className="loader">
            <hr />
            <hr />
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthList;
