import { useEffect, useState } from "react";
import "./App.css";

import dayjs from "dayjs";
import BirthList from "./components/BirthList";
import {  Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Favorite from "./components/Favorite";


function App() {
  let token1 = process.env.REACT_APP_ACCESS_TOKEN;
  let fav = JSON.parse(localStorage.getItem("fav")) || [] ;
  let [births, setBirths] = useState(dayjs("2024-02-17"));
  let [names, setNames] = useState([]);
  let [search, setSearch] = useState("");
  let [favorite, setFavorite] = useState(fav);

  let token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJkYmQwNTNhZTFlMzA3YzQ3NmRmMDljOTJhMzFhNTc0MSIsImp0aSI6IjYwZTRmMDhlMDMyNjY5Y2YzNjFkNWUyY2I5ZjEyY2UxZTI0NzM0OTBiOGVmNDdkNzIyYzcxOTkwMjJlMGFiNjgzZjVlN2NlMGIzOGNiYTllIiwiaWF0IjoxNzE3MTgwMzIyLjQyNDUxNiwibmJmIjoxNzE3MTgwMzIyLjQyNDUxOSwiZXhwIjozMzI3NDA4OTEyMi40MjI2NzYsInN1YiI6Ijc1Nzc4NzY1IiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.X4hMlaSvn39KSJyiJ9hmz1_BmlUHOk9ea61kpOqdQ0NFi7QV7Q9T8QTP04ZtKUatLs8GR4QD7DG_yYo4W402ex9MW2yKrndJNCW3usWNFA_S_kEkfrtsigMXftkLJO8ljPi0NTHc9HGa3P1ixjt9Q8L6Q7A0HTVTJXyBJSi9Y1gCkepHF2TL6wttjLrmwaxu7hBqQoRksmbLeKogdxF8_mobEL-0bqbkWgt_JOTIJXTc3sXLG0VZTQnNux8XPOsHhvt01aMx_C0sGGg1r8I63KZUnGvDTy0FhzVEIrJokjSEagLA0DKrg4cXtmlPUuhugF6zX63bCwRVbDHwRVgU0xf9VUV-_ZVwhBVoNHMnRZgms3hq6bQdm8RqhKeh23YMyWDEjOhJE9bNr2nxpw3lePfYTm-P06fY8_JYF2vB-Tx6YMQcUEMlp0tYeFeblTPDuFithDapP6rtbjMvEeG1RPl47VQItSjWRYsxOq4B1vAq4Gzr9DnrouB8CuDjnxJcNsTKXiOCDEdcEkNcqDIEQQZg089SMwSnNV5nNR9MByRcKNk4y-NcmtDhu2NCcgptt59l-97clHF1eUTn0l942nqEOFeM8JDJ4ZdRFjbZ-L34fmGRQAlDtca4M1bSVvrF8NBTMiSBIONT-jNPUG3GKlQYFh4IeeZetnZ1KVmgzlI";

  let month = String(births.$M + 1).padStart(2, "0");
  let day = String(births.$D).padStart(2, "0");
  let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;
  useEffect(() => {
    fetchData();
  }, [births]);
  const fetchData = async () => {
    // Get information about this day in history from English Wikipedia
    // console.log("token", token1);
    // console.log("day",day);

    try {
      setNames([]);
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Api-User-Agent": "birthday_calender (afzalm117@gmail.com)",
        },
      });
      const data = await response.json();
      console.log(data.births);
      let arr = []
      if(data.births){
      for(let val of data.births){
        let obj = {
          name: val.text.split(",")[0],
          occupation:val.text.split(",")[1],
          fav: false
        }
        arr.push(obj)
      }
      }else{
        return fetchData();
      }
      // console.log("arr",arr);
      setNames(arr);
    } catch (error) {
      console.log("error", error);
    }
  };

  var filteredNames = names.filter((item)=>{
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) 
    )
  })

  return (
    <div>
      <Header births={births} setBirths={setBirths} />
      {/* <Loader/> */}
        <Routes>
          <Route path="/" element={<BirthList search={search} setSearch={setSearch} names={search?filteredNames:names} setFavorite={setFavorite} favorite={favorite}/>} />
          <Route path="/fav" element={<Favorite favorite={favorite} setFavorite={setFavorite}/>} />
        </Routes>
      
    </div>
  );
}

export default App;
