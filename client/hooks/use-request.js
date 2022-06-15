import axios from "axios"
import { useState } from "react";

// this hook returns an object with a function 'doRequest' (which does an axios call), and formatted errors. 
export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null); 

    const doRequest = async (props = {}) => {
        try {
            setErrors(null); 
            const response = await axios[method](url, { ...body, ...props }); 

            if(onSuccess){
                onSuccess(response.data); 
            }

            return response.data; 
        } catch (err) {
            setErrors(
            <div className='alert alert-danger'>
                <h4>Oops... something went wrong:</h4>
                <ul className='my-0'>
                    {err.response.data.errors.map(error => <li key={error.message}>{error.message}</li>)}
                </ul>
            </div>); 


        }
    }

    return { doRequest, errors }; 
}