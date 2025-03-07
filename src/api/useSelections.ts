import { useQueryClient } from "@tanstack/react-query";

export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    ingredients: string[];
};

export const useSelections = () => {
    const queryClient = useQueryClient();
    const loadSelectionsFromStorage = (): Meal[] => {
        const savedSelections = localStorage.getItem("selections");
        return savedSelections ? JSON.parse(savedSelections) : [];
    };

    const selections = loadSelectionsFromStorage();

    const addToSelections = (meal: Meal) => {
        const updatedSelections = [...selections, meal];
        localStorage.setItem("selections", JSON.stringify(updatedSelections));
        queryClient.setQueryData(["selections"], updatedSelections);
    };

    const removeFromSelections = (mealId: string) => {
        const updatedSelections = selections.filter((meal) => meal.idMeal !== mealId);
        localStorage.setItem("selections", JSON.stringify(updatedSelections));
        queryClient.setQueryData(["selections"], updatedSelections);
    };

    return { selections, addToSelections, removeFromSelections };
};
