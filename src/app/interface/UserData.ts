import {ExpenseResponse} from "./ExpenseResponse";

export default interface UserData {
    id: string | null
    token: string | null
    expenses? : ExpenseResponse[] | null
}