export default interface ProductInterface {
    fdcId: number;
    description: string;
    foodCategory: string;
    cal: number;
    foodNutrients: {
        nutrientName: string,
        nutrientNumber: number,
        nutrientUnitName: string
    }[];
}