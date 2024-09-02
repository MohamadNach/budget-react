import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import IncomeForm from './components/IncomeForm';
import SavingComponent from './components/SavingComponent';
import Target from './components/Target';
import './App.css';

function App() {
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [totalSaving, setTotalSaving] = useState<number>(0)

  const getTotalIncome = (totalIncome:number)=>{
    setTotalIncome(totalIncome)
  }

  const getTotalExpense = (totalExpense:number)=>{
    setTotalExpense(totalExpense)
  }

  const getTotalSaving = (totalSaving:number)=>{
    setTotalSaving(totalSaving)
  }
  return (
    <div className="constainer">
      <IncomeForm onGetTotalIncome = {getTotalIncome}/>
      <ExpenseForm onGetTotalExpense = {getTotalExpense}/>
      <Target totalSaving = {totalSaving}/>
      <SavingComponent totalIncome = {totalIncome} totalExpense = {totalExpense} onGetTotalSaving = {getTotalSaving}/>
    </div>
  );
}

export default App;
