import { useQuery } from '@tanstack/react-query';

export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
};

const fetchAllMeals = async (): Promise<Meal[]> => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals || [];
};

const fetchMealsByQuery = async (query: string): Promise<Meal[]> => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    return data.meals || [];
};

export const useAllMeals = () => {
    return useQuery({
        queryKey: ['allMeals'],
        queryFn: fetchAllMeals,
    });
};

export const useMealsByQuery = (query: string) => {
    return useQuery({
        queryKey: ['meals', query],
        queryFn: () => fetchMealsByQuery(query),
        enabled: !!query, // Only fetch when there is a query
    });
};
