export default interface Expense {
    date: Date;
    category: string;
    description: string;
    amount: number;
    userEntity: string | null;
}