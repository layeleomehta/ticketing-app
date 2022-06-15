import React from 'react'
import axios from "axios"; 
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser); 
  return (
    <div><h1>Landing page</h1></div>
  )
}

LandingPage.getInitialProps = async (context) => { 
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser'); 
  return {
    currentUser: data
  }; 
}

export default LandingPage; 