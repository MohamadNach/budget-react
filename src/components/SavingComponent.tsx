import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SavingAmountType} from '../Types/types';
import '../App.css';

function SavingComponent(props: SavingAmountType){
  const [saving, setSaving] = useState<number>(0)
  const [totalSaving, setTotalSaving] = useState<number>(0)
  

  useEffect(() => {
    props.onGetTotalSaving(totalSaving);
  }, [totalSaving]);

  function handleSavingChange(e: ChangeEvent<HTMLInputElement>): void {
    setSaving(Number(e.target.value));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(saving > 0){
      if((saving) > 0){
        setTotalSaving((prevSaving)=> {return prevSaving + saving});
        localStorage.setItem('saving', JSON.stringify(saving));
        setSaving(0);
      }else{
        alert('You do not have enough balance.');
      }
    }else{
      alert('Saving amount must be a positive number.');
    }
  }
 
  return(
    <>
    <div className='Saving'>
      <p>Current Balance: {props.totalIncome - props.totalExpense - totalSaving}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='Saving'>Transfer to saving account</label>
          <input type='text' id='Saving' name='Saving' value={saving} placeholder='0'  onChange={handleSavingChange} required></input>
        </div>
      <button type='submit'>Transfer</button>
      </form>
    </div>

    </>
  )


}

export default SavingComponent;