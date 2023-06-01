import Category from "./Category";
// TODO: Add the Category interface here
export default interface Expense {
    id?: string;
    date: number;
    category: string;
    description: string;
    amount: number;
    userEntity: string | null;
}