// Income props types
export type IncomeType = {
  id: string,
  incomeName:string,
  incomeAmount: number,
  incomeDate: string
}

export type TotalIncomeType = {
  onGetTotalIncome: (totalIncome: number)=> void
}

// Expense props types
export type ExpenseType ={
  id: string,
  expenseName:string,
  expenseAmount: number,
  expenseDate: string
}

export type TotalExpenseType = {
  onGetTotalExpense: (totalExpense: number)=> void
}

// Saving props types
export type SavingAmountType = {
  totalIncome:number;
  totalExpense:number;
  onGetTotalSaving: (totalSaving:number)=> void;
}

// Target props types
export type TotalSavingType = {
  totalSaving:number
}
