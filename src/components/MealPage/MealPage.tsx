import React from "react";
import { useParams } from "react-router-dom";
import { useAllMeals } from "../../api/useMealsApi";
import { useSelections } from "../../api/useSelections";
import styles from "./MealPage.module.scss";

export const MealPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useAllMeals();
    const { addToSelections } = useSelections();

    if (isLoading) return <div>Loading...</div>;

    const meal = data?.find((meal) => meal.idMeal === id);

    if (!meal) return <div>Meal not found</div>;

    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    const handleAddToSelections = () => {
        addToSelections({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            ingredients
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.image}/>
                <div className={styles.descriptionContainer}>
                    <h1>{meal.strMeal}</h1>
                    <div>
                    <h3>Ingredients:</h3>
                    <ul className={styles.list}>
                        {ingredients.map((item, index) => (
                            <li key={index}>
                                {item}
                                {index === ingredients.length - 1 ? "." : ","}
                            </li>
                        ))}
                    </ul>
                    </div>
                    <button className={styles.button} onClick={handleAddToSelections}>
                        Add to selections
                    </button>
                </div>
            </div>
            <div className={styles.instructionContainer}>
                <h3>Instruction:</h3>
                <p>{meal.strInstructions}</p>
            </div>
        </div>
    );
};
