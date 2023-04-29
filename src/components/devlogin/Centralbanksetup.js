import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Route, useHistory } from "react-router-dom";


import { useToken }  from '../App/useToken';
import { LoginService }  from './LoginService';







export default function Centralbanksetup({ setToken }) {

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
	entitycode: '',
	entityaddress: '',
	centraladdress: '',
	entityid: '',
	marker: '',
};

const [email, setEmail] = useState();
const [password, setPassword] = useState();

const [entryinfo, setEntryinfo] = useState(Entityinfo);
const [entityinfo, setEntityinfo] = useState(Entityinfo);

const [error, setError] = useState('');

const [role, setRole] = useState('');

const [organization, setOrganization] = useState('');


const history = useHistory();

const roles = [
    'Central bank','Wholesale bank','Exchange'
];

const loginservice = new LoginService();
const usetoken = new useToken();

const login = async () => {

    try {
    const tokendata = await loginservice.loginUser({

      email,

      password

    });

      if(tokendata.token) {
      usetoken.saveToken(tokendata);
      setEntityinfo(tokendata.user);

	   setError("Login success")
//        history.push('/central-bank')
      }
      else {
	   setError("Login failed")

      }
    } catch(err) {

	   setError("Login failed")
    }

  }

const enablecb = async () => {
    const tokendata = await loginservice.enablecb();
}

const disablecb = async () => {
    const tokendata = await loginservice.disablecb();
}


const getdata = async () => {

    const tokendata = await loginservice.getlatestuser();
      if(tokendata.token) {
      usetoken.saveToken(tokendata);
      setEntityinfo(tokendata.user);
      }
}

const update = async () => {

    try {

	   console.log(entityinfo);

    const tokendata = await loginservice.updateUser(entityinfo,  usetoken.getToken());

    } catch(err) {

           setError("Update failed "+ err)
    }

  }

const configaccount = async () => {

    try {


        const accounts = await loginservice.cbconfigcentralaccounts();

    } catch(err) {

           setError("config account failed "+ err)
    }

  }



  return(

   <div className="login-wrapper">

      <h1>Central bank configure </h1>


        <label>

          <p>Entity email {entityinfo.entityemail}</p>

          <input type="text" placeholder="entityemail" onChange={e =>  setEntityinfo({...entityinfo, entityemail: e.target.value})}/> 

        </label>

	 <label>

          <p>URL name {entityinfo.urlname}</p>

          <input type="text" placeholder="urlname" onChange={e =>  setEntityinfo({...entityinfo, urlname: e.target.value})}/>

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

      <label>

          <p> Issuerid : {entityinfo.issuerid} </p>

          <input  type="text" placeholder="issuerid" onChange={e => setEntityinfo({...entityinfo, issuerid: e.target.value})}/>

        </label>

   <label>

          <p> Funderid : {entityinfo.funderid} </p>

          <input  type="text" placeholder="funderid" onChange={e => setEntityinfo({...entityinfo, funderid: e.target.value})}/>

        </label>



	   <label>

          <p> Systemid : {entityinfo.systemid} </p>

          <input  type="text" placeholder="systemid" onChange={e => setEntityinfo({...entityinfo, systemid: e.target.value})}/>

        </label>

	  <label>

          <p>Entity name  : {entityinfo.entityname}</p>

          <input  type="text" placeholder="entityname" onChange={e => setEntityinfo({...entityinfo, entityname: e.target.value})}/>


        </label>

  <label>

          <p>Entity code  : {entityinfo.entitycode}</p>

          <input  type="text" placeholder="entitycode" onChange={e => setEntityinfo({...entityinfo, entitycode: e.target.value})}/>


        </label>

  <label>

          <p>Entity address  : {entityinfo.entityaddress}</p>

          <input  type="text" placeholder="entityaddress" onChange={e => setEntityinfo({...entityinfo, entityaddress: e.target.value})}/>


        </label>

	    <label>

          <p>Central address  : {entityinfo.centraladdress}</p>

          <input  type="text" placeholder="centraladdress" onChange={e => setEntityinfo({...entityinfo, centraladdress: e.target.value})}/>


        </label>




        <label>

          <p>Marker  : {entityinfo.marker}</p>

          <input  type="text" placeholder="marker" onChange={e => setEntityinfo({...entityinfo, marker: e.target.value})}/>


        </label>

         <div>

        <label>
          <p>Organization : {entityinfo.organization}</p>
          <input type="text" placeholder="Organization" onChange={e => setEntityinfo({...entityinfo, organization: e.target.value})}/> 

        </label>
        </div>
        <div>
        <label>
          <p>Role : {entityinfo.role}</p>
          <Dropdown value={role} options={roles} onChange={(e) => setEntityinfo({...entityinfo, role: e.target.value}) } placeholder="Select a Role"/>

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
          <button onClick={()=> update()} >Update</button>
          <button onClick={()=> getdata()} >Getdata</button>
          <button onClick={()=> enablecb()} >Enable</button>
          <button onClick={()=> disablecb()} >Disable</button>
          <button onClick={()=> configaccount()} > Configaccount</button>
        </label>

        </div>


   </div>

  )

};
