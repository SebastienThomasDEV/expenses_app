export default interface Expense {
    id?: string;
    date: number;
    category: string;
    description: string;
    amount: number;
    userEntity: string | null;
}