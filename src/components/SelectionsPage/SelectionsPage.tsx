import React from "react";
import { useSelections } from "../../api/useSelections";
import styles from "./SelectionsPage.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";

export const SelectionsPage = () => {
    const { selections, removeFromSelections } = useSelections();

    const handleRemove = (mealId: string) => {
        removeFromSelections(mealId);
        window.location.reload();
    };

    return (
        <div className={styles.container}>
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
    );
};
