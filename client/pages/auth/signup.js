import Router from "next/router"; 
import React, { useState } from 'react'; 
import useRequest from '../../hooks/use-request';

const signup = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const { doRequest, errors } = useRequest({ 
        url: '/api/users/signup', 
        method: 'post', 
        body: { email, password }, 
        onSuccess: () => Router.push('/')
    }); 

    const onSubmit = async (e) => {
        e.preventDefault(); 
        await doRequest(); 
    }

  return (
    <form onSubmit={onSubmit}>
    <h1>Sign Up</h1>
    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
    </div>
    {errors}
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default signup