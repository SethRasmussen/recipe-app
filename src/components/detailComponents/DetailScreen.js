import React from "react";
import axios from "axios";

import { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import classes from "./DetailScreen.module.css";

// const dummy_recipe = {
//   recipe_id: 1,
//   recipe_name: "Cacio E Pepe",
//   cook_time: "30 minutes",
//   prep_time: "15 minutes",
//   serves: "4 people",
//   instructions: "Here are some empty instructions, try not to hurt yourself",
//   ingredients: "Hatred, Malious, Evil, and Anger",
//   image_url:
//     "https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg",
// };

const DetailScreen = () => {
  const params = useParams();
  const [recipe, setRecipe] = useState([]);

  const { id } = params;

  useEffect(() => {
    axios.get(`https://recipes.devmountain.com/recipes/${id}`).then((res) => {
      setRecipe(res.data);
    });
  }, []);

  // useEffect(() => {
  //   if (recipe.ingredients) {
  //     console.log(recipe);
  //     recipe.ingredients.map((ingred, i) => {
  //       console.log(recipe.ingredients[i].ingredient);
  //       setIngredients((prevIngred) => {
  //         return prevIngred <h4> recipe.ingredients[i].ingredient </h4>
  //       })
  //     });
  //   }
  // }, [recipe]);

  let {
    recipe_id,
    recipe_name,
    serves,
    prep_time,
    cook_time,
    image_url,
    instructions,
    ingredients,
  } = recipe;

  return (
    <Fragment>
      <header
        className={classes["detail-header"]}
        style={{
          background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.8),
          rgba(0, 0, 0, 0.8)),
          url(${image_url})`,
        }}
      >
        <h1>{recipe_name}</h1>
      </header>
      <main className={classes["detail-main"]}>
        <aside>
          <h2>Recipe</h2>
          <h4>Prep Time: {prep_time}</h4>
          <h4>Cook Time: {cook_time}</h4>
          <h4>Serves: {serves}</h4>
          <h2>Ingredients</h2>
          {ingredients &&
            ingredients.map((ing, index) => {
              return (
                <h4>
                  {ing.quantity} {ing.ingredient}
                </h4>
              );
            })}
        </aside>
        <article>
          <h2>Instructions</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {recipe.instructions && JSON.parse(recipe.instructions)}
          </p>
        </article>
      </main>

      {/* Welcome to the details page! This page will be reusable. Follow instructions to know what to do here. */}
    </Fragment>
  );
};

export default DetailScreen;
