import React, { useEffect, useState } from 'react'
import Recipe from './Recipe';
import './App.css';


const App = () => {
  const APP_ID = "5fd89b41";
  const APP_KEY= "753046f30faa5ce00c1e1d3cdd1c030e";
  const[ recipes, setRecipes]  = useState([]);
  const [ search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')
  useEffect (() =>{
    getRecipes();
  }, [query])

  const getRecipes = async () =>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      console.log(data.hits);
      setRecipes(data.hits);
    
  }
  
  
  const updateValue = e =>{
    setSearch(e.target.value);

  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  
  
  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form' >
        <input className='search-bar' type='text' onChange= {updateValue} value={search}/>
        <button className='search-button' type='submit'>
          search
        </button>
      </form>
     {recipes.map(recipe =>(
        <Recipe 
               key={recipe.recipe.label}
              title = {recipe.recipe.label}

                calories={recipe.recipe.calories}

                ingredients = {recipe.recipe.ingredients}

                image={recipe.recipe.image}
        
        />
     )
     )}
    </div>
  );
};

export default App