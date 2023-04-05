import { useState } from "react"

export const Register =(props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
    }
    return (
        <div className="auth-form-container">
       <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type ="name" placehoder="Full Name" id="name" name="name"/>
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type ="email" placehoder="youremail@gmail.com" id="email" name="email"/>
            <label htmlFor="password">password</label>
            <input  value={password} onChange={(e) => setPassword(e.target.value)} type ="password" placehoder="********" id="email" name="password"/>
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch("login")}>Already have account? Create new Account</button>
        </div>
    )
}