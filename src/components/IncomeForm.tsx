import { nanoid } from 'nanoid';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IncomeType, TotalIncomeType } from '../Types/types';
import '../App.css';
import { formatDate } from '../utils/DateUtils';

function IncomeForm(props: TotalIncomeType) {
  const [income, setIncome] = useState<IncomeType>({
    id: '',
    incomeName: '',
    incomeAmount: 0,
    incomeDate: '',
  });

  const [incomes, setIncomes] = useState<IncomeType[]>(() => {
    const savedIncomes = localStorage.getItem('incomes');
    return savedIncomes ? JSON.parse(savedIncomes) : [];
  });

  const totalIncome = incomes.reduce(
    (total, currIncome) => total + currIncome.incomeAmount,
    0
  );

  // useEffect to avoid setting state during render
  useEffect(() => {
    props.onGetTotalIncome(totalIncome);
  }, [totalIncome, props]);

  const handleIncomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIncome((prevIncome) => ({
      ...prevIncome,
      [name]: name === 'incomeAmount' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newIncome = {
      id: nanoid(),
      incomeName: income.incomeName,
      incomeAmount: Number(income.incomeAmount),
      incomeDate: income.incomeDate,
    };

    if (newIncome.incomeAmount > 0) {
      setIncome({
        id: '',
        incomeName: '',
        incomeAmount: 0,
        incomeDate: '',
      });

      setIncomes((prevIncomes) => {
        const updatedIncomes = [...prevIncomes, newIncome];
        localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
        return updatedIncomes;
      });
    } else {
      alert('Income amount must be a positive number.');
    }
  };

  const handleDelete = (id: string) => {
    setIncomes((prevIncomes) => {
      const updatedIncomes = prevIncomes.filter((item) => item.id !== id);
      localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
      return updatedIncomes;
    });
  };

  return (
    <div className='income'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='incomeName'>Income source</label>
          <input
            type='text'
            id='incomeName'
            name='incomeName'
            value={income.incomeName}
            placeholder='Name of income'
            onChange={handleIncomeChange}
            required
          />
        </div>
        <div>
          <label htmlFor='incomeAmount'>Amount of income</label>
          <input
            type='number'
            id='incomeAmount'
            name='incomeAmount'
            value={income.incomeAmount}
            placeholder='Amount of income'
            onChange={handleIncomeChange}
            required
          />
        </div>
        <div>
          <label htmlFor='incomeDate'>Date of income</label>
          <input
            type='date'
            id='incomeDate'
            name='incomeDate'
            value={income.incomeDate}
            onChange={handleIncomeChange}
            required
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <div className='incomeList'>
        {incomes.length > 0 ? (
          <ul>
            {incomes.map((incomeItem) => (
              <li key={incomeItem.id}>
                {incomeItem.incomeName}: {incomeItem.incomeAmount} EUR on{' '}
                {formatDate(incomeItem.incomeDate)}
                <button
                  onClick={() => handleDelete(incomeItem.id)}
                  type='button'
                  className='deleteBtn'
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          'No income records.'
        )}
      </div>
    </div>
  );
}

export default IncomeForm;
