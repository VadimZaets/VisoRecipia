import React, { useState, useEffect } from "react";
import { Banner } from "../Banner/Banner";
import { Meal, useAllMeals } from "../../api/useMealsApi";
import { Pagination } from "../Pagintion/Pagintaion";
import { CategoryFilter } from "../CategoryFilter/CategoryFilter";
import styles from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const { data, isLoading } = useAllMeals();

    useEffect(() => {
        if (!data) return;

        if (selectedCategory === "All") {
            setFilteredMeals(data);
        } else {
            setFilteredMeals(data.filter((meal) => meal.strCategory === selectedCategory));
        }

        setCurrentPage(1);
    }, [selectedCategory, data]);

    const indexOfLastMeal = currentPage * itemsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
    const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
    const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <Banner />
            <div className={styles.container}>
                <CategoryFilter
                    categories={["All", ...Array.from(new Set(data?.map((meal) => meal.strCategory)))]}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                <ul className={styles.list}>
                    {currentMeals.map((meal: Meal) => (
                        <li key={meal.idMeal} className={styles.listItem} onClick={() => navigate(`/meal/${meal.idMeal}`)} >
                            <div>
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className={styles.listImage}
                                />
                                <h3 className={styles.name}>{meal.strMeal}</h3>
                            </div>
                        </li>
                    ))}
                </ul>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};
