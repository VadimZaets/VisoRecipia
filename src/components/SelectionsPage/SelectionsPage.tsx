import React from "react";
import { useSelections } from "../../api/useSelections";
import styles from "./SelectionsPage.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";
import {combineIngredients} from "../../utils/combineIngredients";

export const SelectionsPage = () => {
    const { selections, removeFromSelections } = useSelections();
    const combinedIngredients = combineIngredients(selections);

    const handleRemove = (mealId: string) => {
        removeFromSelections(mealId);
        window.location.reload();
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
            <h1>Selected Meals</h1>
            {selections.length === 0 ? (
                <p>No meals selected.</p>
            ) : (
                <ul className={styles.list}>
                    {selections.map((meal) => (
                        <li key={meal.idMeal} className={styles.listItem}>
                            <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.image}/>
                            <div className={styles.descriptions}>
                                <div className={styles.wrapper}>
                                    <h3>{meal.strMeal}</h3>
                                    <button className={styles.button} onClick={() => handleRemove(meal.idMeal)}>
                                        <FaRegTrashAlt/>
                                    </button>
                                </div>
                                <h3>Ingredients: </h3>
                                <p>{meal?.ingredients.join(", ")}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            </div>
            {combinedIngredients.length > 0 && (
                <div className={styles.combinedIngContainer}>
                    <h2>Combined Ingredients:</h2>
                    <ul>
                        {combinedIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
