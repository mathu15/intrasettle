import React, {useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Route, useHistory } from "react-router-dom";


import { useToken }  from '../App/useToken';
import { LoginService }  from './LoginService';

import { IssuanceService } from '../CBtabmenu/CBHome/IssuanceService';




export default function Transmitassets({ setToken }) {

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


const sendtoentity = async () => {

    try {

    setSendinfo({
	    systemid : entityinfo.systemid,
            toaccountnumber:  entityinfo.entityaccountnumber,
	    symbol: symbol.issuetype,
	    amount : amount
    });

    const tokendata = await loginservice.sendfromsource(sendinfo);
           setError("Success "+ tokendata.txid)

    } catch(err) {

           setError("Update failed "+ err)
    }

  }

const sendtocentral = async () => {

    try {

    setSendinfo({
            systemid : entityinfo.systemid,
            toaccountnumber:  entityinfo.centralaccountnumber,
            symbol: symbol.issuetype,
            amount : amount
    });

    const tokendata = await loginservice.sendfromsource(sendinfo);
           setError("Success "+ tokendata.txid)

    } catch(err) {

           setError("Update failed "+ err)
    }

  }


  return(

   <div className="login-wrapper">

      <h1>Central bank transmit assets to accounts  </h1>

    <label>
          <p>Assets </p>
          <Dropdown optionLabel="issuetype" value={symbol} options={assets} onChange={(e) => setSymbol(e.target.value)}   placeholder="Select a asset"/>

        </label>


	 <label>

          <p>Amount </p>

          <input type="text" placeholder="amount" onChange={e =>  setAmount(e.target.value)}/>

        </label>


	 <label>

          <p>Entity id {entityinfo.entityid}</p>

          <input type="text" placeholder="entityid" onChange={e =>  setEntityinfo({...entityinfo, entityid: e.target.value})}/>

        </label>


       <label>

          <p>Entity account number {entityinfo.entityaccountnumber}</p>

          <input type="text" placeholder="entityaccountnumber" onChange={e =>  setEntityinfo({...entityinfo, entityaccountnumber: e.target.value})}/>

        </label>

        <label>

          <p>Central account number {entityinfo.centralaccountnumber}</p>

          <input type="text" placeholder="centralaccountnumber" onChange={e =>  setEntityinfo({...entityinfo, centralaccountnumber: e.target.value})}/>

        </label>


        <div>
        <label>
          <p>Status</p>
          {error}
        </label>

        </div>
        <div>

        <label>
          <button onClick={()=> sendtoentity () } >Transmit to central entity</button>
          <button onClick={()=> sendtocentral () } >Transmit to central operation</button>
          <button onClick={()=> getdata1()} >Getdata</button>
          <button onClick={()=> getassets1()} >Getassets</button>
        </label>

        </div>


   </div>

  )

};
