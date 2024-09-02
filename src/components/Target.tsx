import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TotalSavingType} from '../Types/types';

function Target(props:TotalSavingType){
  const [target, setTarget] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [totalSaving, setTotalSaving] = useState<number>(props.totalSaving);

  useEffect(() => {
    setTotalSaving((prevTotalSaving)=>{return prevTotalSaving + props.totalSaving});
  }, [props.totalSaving]);
  
  useEffect(() => {
    if (target > 0) {
      const percentage = Math.round((props.totalSaving / target) * 100);
      setProgress(percentage);
    } else {
      setProgress(0);
    }
  }, [props.totalSaving, target]);

  const handleTargetChange= (e: ChangeEvent<HTMLInputElement>)=>{
    setTarget(target);
    const {value} = e.target;
    if(/^[0-9]*$/.test(value)){
      setTarget(Number(value));
      localStorage.setItem('target', JSON.stringify(Number(value)));
    }else{
      alert("Please enter a number");
    }
  }
  const handleReset = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setTarget(0);
    setProgress(0);
  }

  return(
    <>
    <div className='target'>
      <form onSubmit={handleReset}>
        <div>
          <label htmlFor='target'>Set Target</label>
          <input type='text' id='target' name='target' value={target} placeholder='Set your target'  onChange={handleTargetChange} required></input>
        </div>
        <button type='submit'>Reset</button>
      </form>
      <div className='result'>
        <p>Current Saving: {props.totalSaving}</p>
        <p>Target: {target}</p>
        <label htmlFor='target'>Progress: {progress}%</label>
        <br />
        <progress max={target} value={props.totalSaving}></progress>
      </div>
    </div>
    </>
  )

}

export default Target;