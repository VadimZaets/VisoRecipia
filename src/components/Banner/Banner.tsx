import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./Banner.module.scss";
import { useMealsByQuery } from "../../api/useMealsApi";

export const Banner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: searchResults, isLoading: isSearchLoading } = useMealsByQuery(searchQuery);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery) {
            setSearchQuery(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery]);

    return (
        <div className={styles.bannerContainer}>
            <div>
                <h2 className={styles.contentTitle}>Craving something tasty?</h2>
                <p className={styles.contentText}>
                    Find the perfect recipe in minutes and satisfy your hunger with food just around the corner.
                </p>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Search for recipes..."
                        className={styles.input}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className={styles.searchButton}>
                        <FaSearch className={styles.searchIcon}/>
                        Find Food
                    </button>
                    {debouncedSearchQuery && searchResults && searchResults.length > 0 && (
                        <div className={styles.suggestionsList}>
                            <ul>
                                {searchResults.map((meal: any) => (
                                    <li key={meal.idMeal} className={styles.suggestionItem}>
                                        <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.suggestionImage}/>
                                        <span>{meal.strMeal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <img
                src="/bannerImage.png"
                alt="Banner"
                className={styles.img}
            />
        </div>
    );
};
