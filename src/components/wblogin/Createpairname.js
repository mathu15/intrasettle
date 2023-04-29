import React, {useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Route, useHistory } from "react-router-dom";


import { useToken }  from '../App/useToken';
import { LoginService }  from '../devlogin/LoginService';

import { IssuanceService } from '../CBtabmenu/CBHome/IssuanceService';




export default function Createpairname({ setToken }) {

const Entityinfo = {
        email: '', 
        username: '',
        urlname: '',
        role:  '', 
        organization: '', 
        accountid: '', 
	entityaccountnumber: '',
	centralaccountnumber: '',
	entityemail: '',
	entityname: '',
	systemid: '',
	issuerid: '',
	funderid: '',
	entityid: '',
	marker: '',
};


const Sendinfo = {
	systemid: '',
	toaccountnumber: '',
	symbol : '',
	amount : ''
};

const [email, setEmail] = useState();
const [password, setPassword] = useState();

const [sendinfo, setSendinfo] = useState(Sendinfo);
const [entityinfo, setEntityinfo] = useState(Entityinfo);

const [error, setError] = useState('');
const [symbol, setSymbol] = useState('');
const [pairname, setPairname] = useState('');
const [amount, setAmount] = useState('');

const [role, setRole] = useState('');
const [assets, setAssets] = useState();

const loginservice = new LoginService();


const history = useHistory();

const roles = [
    'Central bank','Wholesale bank','Exchange'
];

const issuanceservice = new IssuanceService();
const usetoken = new useToken();

   useEffect(() => {

      var user = usetoken.getUser();
      setEntityinfo(user);
     var xx = async () => {
   var assets = await issuanceservice.getassets();
   setAssets(assets);
	   }

	   xx();

  }, []); //

const getdata1 = async () => {
	 const tokendata = await loginservice.getlatestuser();
      if(tokendata.token) {
      usetoken.saveToken(tokendata);
      setEntityinfo(tokendata.user);
      }

}

const getassets1 = async () => {
   var assets = await issuanceservice.getassets();
   setAssets(assets);
}


const createpair = async () => {

    try {

	   var data = {
		   pairname: pairname
	   };
    const tokendata = await loginservice.createpairname(data);
           setError("Success "+ tokendata)

    } catch(err) {

           setError("Update failed "+ err)
    }

  }



  return(

   <div className="login-wrapper">

      <h1>Create pair for atomic swap</h1>

    <label>
          <p>Assets </p>
          <Dropdown optionLabel="issuetype" value={symbol} options={assets} onChange={(e) => setSymbol(e.target.value)}   placeholder="Select a asset"/>

        </label>




	 <label>

          <p>New pairname {pairname}</p>

          <input type="text" placeholder="new pairname" onChange={e =>  setPairname( e.target.value) }/>

        </label>




        <div>
        <label>
          <p>Status</p>
          {error}
        </label>

        </div>
        <div>

        <label>
          <button onClick={()=> createpair () } >Create pair </button>
          <button onClick={()=> getdata1()} >Getdata</button>
        </label>

        </div>


   </div>

  )

};
