import Expense from "./Expense";

export default interface UserData {
    id: string | null
    token: string | null
    expenses? : Expense[] | null
}