import Category from "./Category";
// TODO: Add the Category interface here
export  interface ExpenseResponse {
    id?: string;
    date: number;
    category: Category;
    description: string;
    amount: number;
    userEntity?:string
}

export  interface ExpenseRequest {
    id?: string;
    date: number;
    category: string;
    description: string;
    amount: number;
    userEntity?: string;
}