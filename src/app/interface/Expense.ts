export default interface Expense {
    id?: string;
    date: Date;
    category: string;
    description: string;
    amount: number;
    userEntity: string | null;
}