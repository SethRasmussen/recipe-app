import axios from "axios";
import React from "react";
import { useState, useEffect, Fragment } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import AdBanner from "./AdBanner";
import RecipeCard from "../recipeComponents/RecipeCard";

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const fetchRecipesHandler = () => {
    axios.get("https://recipes.devmountain.com/recipes").then((res) => {
      setRecipes(res.data);
      // console.log(res.data);
    });
  };

  useEffect(() => {
    fetchRecipesHandler();
  }, []);

  const [search, setSearch] = useState("");

  const recipeDisplay = recipes
    .filter((recipe, index) => {
      let title = recipe.recipe_name.toLowerCase();
      let searchParams = search.toLowerCase();
      return title.includes(searchParams);
    })
    .map((recipe, index) => {
      return <RecipeCard recipe={recipe} />;
    });
  // console.log(recipeDisplay);

  return (
    <Fragment>
      <AdBanner />
      <div className="recipe-wrap">
        <span className="search-ctn">
          <BiSearchAlt2 size="2em" color="#DA7635" />
          <input
            className="search-bar"
            type="text"
            value={search}
            placeholder="Search for a recipe"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </span>
        <div className="recipe-display">{recipeDisplay}</div>
      </div>
      {/* Much code from Part 2 will be placed around here. Do your best! */}
    </Fragment>
  );
};

export default HomeScreen;
