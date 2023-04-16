import { useState } from 'react';
import Login from '../login/Login';
import Register from '../login/Register';


export default function Home() {
  const [currentForm, setCurrentForm] = useState('login');
  
  const toggleForm = (formName) => 
  {
    setCurrentForm(formName);
  }
  
  return (
    <>
    
    
    <div className='d-flex gap-3 mb-4'>
    {
    currentForm ==="login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>
    }
    </div>
    <hr/>
    </>
  )
}
