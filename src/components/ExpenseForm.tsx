import { nanoid } from 'nanoid';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ExpenseType, TotalExpenseType} from '../Types/types';
import '../App.css';
import { formatDate } from '../utils/DateUtils';

function ExpenseForm(props: TotalExpenseType){
  const [expense, setExpense] = useState<ExpenseType>({
    id: '',
    expenseName:"",
    expenseAmount: 0,
    expenseDate: ""
  });
  const [expenses, setExpenses] = useState<ExpenseType[]>([])
  const totalExpense = expenses.reduce((total, currExpense)=>total + currExpense.expenseAmount, 0)
  
  // useEffect to avoid setting state during render
  useEffect(() => {
    props.onGetTotalExpense(totalExpense)
  }, [totalExpense]);
  const handleExpenseChange = (e: ChangeEvent<HTMLInputElement> )=>{
    const {name, value} = e.target;
    setExpense((prevExpense)=>{return {...prevExpense, [name]:value}});
  }

  const handleSubmit= (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const newExpense = {
      id: nanoid(),
      expenseName: expense.expenseName,
      expenseAmount: Number(expense.expenseAmount),
      expenseDate: expense.expenseDate
    }
    if(newExpense.expenseAmount > 0){
      setExpense({
        id:'',
        expenseName: '',
        expenseAmount:0,
        expenseDate: ''
      });
      setExpenses((prevExpense)=>{return[...prevExpense, newExpense]})
      localStorage.setItem('newExpense', JSON.stringify(newExpense));

    }else{
      alert('Expense amount must be a positive number.');
    }
  }
  const handleDelete = (id: string)=>{
    setExpenses(prevIncomes => prevIncomes.filter(item => item.id !== id));
  }
  
  return(
    <>
    <div className='expense'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='expenseName'>Expense source</label>
          <input type='text' id='expenseName' name='expenseName' value={expense.expenseName} placeholder='Name of expense'  onChange={handleExpenseChange} required></input>
        </div>
        <div>
          <label htmlFor='expenseAmount'>Amount of expense</label>
          <input type='text' id='expenseAmount' name='expenseAmount' value={expense.expenseAmount} placeholder='Amount of expense' onChange={handleExpenseChange} required></input>
        </div>
        <div>
          <label htmlFor="expenseDate">Date of expense</label>
          <input type='date' id='expenseDate' name='expenseDate' value={expense.expenseDate} onChange={handleExpenseChange} required></input>
        </div>
        <button type='submit'>Submit</button>
      </form>
      <div className='expenseList'>
        {expense && expenses.length > 0?
          <ul>
            <li key={expense.id}>
              {expense.expenseName}: {expense.expenseAmount} EUR on {formatDate(expense.expenseDate)}
              <button onClick={() => handleDelete(expense.id)} type='submit' className='deletBtn'>Delete</button>
            </li>
          </ul>: 'No expense records.'}

      </div>
    </div>

    </>
  )
}

export default ExpenseForm;