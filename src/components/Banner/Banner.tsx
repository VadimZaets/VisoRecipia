import React, {useEffect, useRef, useState} from "react";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./Banner.module.scss";
import { useMealsByQuery } from "../../api/useMealsApi";
import {useNavigate} from "react-router-dom";

export const Banner = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { data: searchResults, isLoading: isSearchLoading } = useMealsByQuery(searchQuery);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const suggestionsRef = useRef<HTMLDivElement | null>(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery) {
            setSearchQuery(debouncedSearchQuery);
            setShowSuggestions(true);
        }
    }, [debouncedSearchQuery]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
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
                        ref={inputRef}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {showSuggestions && searchResults && searchResults.length > 0 && (
                        <div className={styles.suggestionsList} ref={suggestionsRef}>
                            <ul>
                                {searchResults.map((meal: any) => (
                                    <li key={meal.idMeal} className={styles.suggestionItem} onClick={() => navigate(`/meal/${meal.idMeal}`)}>
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
