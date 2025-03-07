export const combineIngredients = (selections: { ingredients: string[] }[]) => {
    const ingredientMap: { [key: string]: string } = {};

    selections.forEach((meal) => {
        meal.ingredients.forEach((ingredient) => {
            const regex = /^(\d*\.?\d+)([a-zA-Z]+(?: [a-zA-Z]+)*)(.*)$/;
            const match = ingredient.match(regex);

            if (match) {
                let [_, quantity, name, extra] = match;


                // @ts-ignore
                quantity = parseFloat(quantity) || 1;

                if (ingredientMap[name]) {
                    const [existingQuantity, existingName] = ingredientMap[name].split(" ", 2);
                    const newQuantity = parseFloat(existingQuantity) + quantity;
                    ingredientMap[name] = `${newQuantity.toString()} ${existingName}${extra}`;
                } else {
                    ingredientMap[name] = `${quantity.toString()} ${name}${extra}`;
                }
            } else {
                ingredientMap[ingredient] = ingredient;
            }
        });
    });
    return Object.entries(ingredientMap).map(([name, quantity]) => `${quantity}`);
};
