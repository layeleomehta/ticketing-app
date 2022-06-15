import React from 'react'
import axios from "axios"; 

const LandingPage = () => {
  return (
    <div><h1>Landing page</h1></div>
  )
}

LandingPage.getInitialProps = async () => { 
  if(typeof window === 'undefined'){
    // we are on server
    const { data } = await axios.get("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", {
      headers: {
        Host: 'ticketing.dev'
      }
    }); 
    console.log(data); 
    return data; 

  } else {
    // we are on browser
    const { data } = await axios.get("/api/users/currentuser"); 
    console.log("browser")
    return data; 
  }
}

export default LandingPage; 