import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import './index.css';

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "api_key=04c35731a5ee918f014970082a0088b1"
const FEATURED_API = BASE_URL + "/discover/movie?sort_by=popularity.desc&page=1&" + API_KEY;
const SEARCH_API = BASE_URL + "/search/movie?" + API_KEY

const App =()=> {
  const [papa,setPapa] = useState([]);
  const[searchTerm,setSearchTerm]= useState([]);

  useEffect (()=>{
    fetch (FEATURED_API)
    .then((res)=>res.json())
    .then((data)=> {
      console.log(data);
      setPapa(data.results);
  });
  }, []);

  const handleOnSubmit = (e) => {
      e.preventDefault();

     fetch(SEARCH_API + searchTerm)
    .then((res) => res.json())
    .then((data) => {
      setPapa(data.results);
    });
};

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <>
        <header>
          <form onSubmit={handleOnSubmit}>
          <input 
              className="search"
              type="search"
              placeholder="Search away..."
              value={searchTerm}
              onChange={handleOnChange}
          />
        </form>
        </header>
          <div className="movie-container">
            {papa.length > 0 && papa.map((Movie)
            , <Movie key={Movie.id} {...Movie} />
            )}
          </div>
    </>
  );
}

export default App;
