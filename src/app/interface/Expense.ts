import Category from "./Category";
// TODO: Add the Category interface here
export default interface Expense {
    id?: string;
    date: number;
    category: Category;
    description: string;
    amount: number;
    userEntity: string | null;
}