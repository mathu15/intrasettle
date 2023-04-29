import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Route, useHistory } from "react-router-dom";


import { useToken } from '../App/useToken';
import { LoginService }  from '../devlogin/LoginService';







export default function Wblogin({ setToken }) {

const [email, setEmail] = useState();

const [password, setPassword] = useState();

const [wholesalebanks, setWholesalebanks] = useState([]);
const [wholesalebank, setWholesalebank] = useState({});


const [error, setError] = useState('');

const [role, setRole] = useState('');

const [organization, setOrganization] = useState('');

const usetoken = new useToken();
const history = useHistory();

const roles = [
    'Wholesale bank'
];

const loginservice = new LoginService();

useEffect(() => {
  setEmail(wholesalebank.email);
}, [wholesalebank]);

useEffect(() => {
  getwholesalebanks();
}, []);

const login = async () => {

    try {
    const tokendata = await loginservice.loginUser({

      email,

      password

    });

      if(tokendata.token) {
      usetoken.saveToken(tokendata);
	   await refresh();
      //usetoken.getToken();
	   setError("Login success")
        history.push('/wholesale-bank-one');
      }
    } catch(err) {

//	   setError("Login failed " + err)
    }

  }
const refresh = async () => {

    const tokendata = await loginservice.getlatestuser();
      if(tokendata.token) {
      usetoken.saveToken(tokendata);
      }
}

const register = async () => {

    try {
    const tokendata = await loginservice.registerUser({

      email,

      password,
      role,
      organization

    });

      if(tokendata.token) {
      usetoken.setToken(tokendata);
           setError("Login success")
        history.push('/wholesale-bank-one');
      }
    } catch(err) {

           setError("Login failed")
    }

  }

const updatewb = async () => {

    try {
    const tokendata = await loginservice.updateUserwb({

      email,

      password,
      role,
      organization

    }, usetoken.getToken());

    } catch(err) {

           setError("Update failed "+ err)
    }

  }

const configurewb = async () => {

    try {
    const tokendata = await loginservice.configureEntitywb( 
     usetoken.getToken());

    } catch(err) {

           setError("Update failed "+ err)
    }

  }
const getwholesalebanks = async () => {

    try {
    const tokendata = await loginservice.getwholesalebanks()
    console.log(tokendata);
      setWholesalebanks(tokendata);
    } catch(err) {

           setError("Update failed "+ err)
    }

  }


  return(

    <div className="login-wrapper">

      <h1>Wholesale bank login </h1>

      <div>
        <label>
          <p>Choose wholesale bank</p>
          <Dropdown optionLabel="organization" value={wholesalebank} options={wholesalebanks} onChange={(e) => { setWholesalebank( e.target.value) }} placeholder="Select a wholesale bank"/>

        </label>
        </div>


        <label>

	    <p>Email : {email}</p>
          <input  value={wholesalebank.email} type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/>



        </label>

        <label>

          <p>Password</p>

          <input type="password" placeholder= "password" onChange={e => setPassword(e.target.value)}/>

        </label>

        <div>

        <label>
          <p>Organization</p>
          <input type="text" placeholder="Organization" onChange={e => setOrganization(e.target.value)}/>

        </label>
        </div>
        <div>
        <label>
          <p>Role</p>
	  <Dropdown value={role} options={roles} onChange={(e) => setRole( e.target.value)} placeholder="Select a Role"/>

        </label>
        </div>
        <div>
        <label>
          <p>Status</p>
          {error}
        </label>

        </div>
        <div>

        <label>
          <button onClick={()=> login()} >Login</button>
          <button onClick={()=> register()} >Register</button>
        </label>

        </div>


   </div>

  )

};
