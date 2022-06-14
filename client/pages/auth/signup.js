import axios from 'axios';
import React, { useState } from 'react'; 

const signup = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 

    const onSubmit = async (e) => {
        e.preventDefault(); 

        const response = await axios.post("/api/users/signup", {
            email, 
            password
        }); 

        console.log(response); 
    }

  return (
    <form onSubmit={onSubmit}>
    <h1>Signup</h1>
    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default signup