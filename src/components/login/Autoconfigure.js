import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Route, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useToken } from "../App/useToken";
import { LoginService } from "../devlogin/LoginService";

export default function Autoconfigure({ setToken }) {
  const Entityinfo = {
    email: "",
    username: "",
    urlname: "",
    role: "",
    organization: "",
    accountid: "",
    entityaccountnumber: "",
    centralaccountnumber: "",
    entityemail: "",
    entityname: "",
    systemid: "",
    issuerid: "",
    funderid: "",
    entityid: "",
    marker: "",
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [entryinfo, setEntryinfo] = useState(Entityinfo);
  const [entityinfo, setEntityinfo] = useState(Entityinfo);

  const [error, setError] = useState("");

  const [role, setRole] = useState("");

  const [organization, setOrganization] = useState("");

  const history = useHistory();

  const roles = ["Central bank", "Wholesale bank", "Exchange"];

  const loginservice = new LoginService();
  const usetoken = new useToken();

  const login = async () => {
    try {
      const tokendata = await loginservice.loginUser({
        email,

        password,
      });

      if (tokendata.token) {
        usetoken.saveToken(tokendata);

        console.log("testing");
        console.log(tokendata.user);

        setEntityinfo(tokendata.user);

        setError("Login success");
        //        history.push('/central-bank')
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Login failed");
    }
  };
  const getdata = async () => {
    const tokendata = await loginservice.getlatestuser();
    if (tokendata.token) {
      usetoken.saveToken(tokendata);
      setEntityinfo(tokendata.user);
    }
  };

  const autoconfigure = async () => {
    try {
      console.log(entityinfo);

      const tokendata = await loginservice.configurecbentity(entityinfo);

      const accounts = await loginservice.cbconfigcentralaccounts();
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  return (
    <div className="col-12 ">
      <div className="card p-fluid">
        <h5 className="text-3xl text-center">Central Bank Auto Configure </h5>

        <div className="field text-2xl">
          <label htmlFor="entityemail1">
            Entity email: {entityinfo.entityemail}
          </label>

          <InputText
            id="entityemail1"
            type="email"
            // placeholder="entityemail"

            onChange={(e) =>
              setEntityinfo({ ...entityinfo, entityemail: e.target.value })
            }
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
        {/*
        <div className="field text-2xl">
          <label htmlFor="urlname">URL name: {entityinfo.urlname}</label>
          <InputText
            type="text"
            id="urlname"
            // placeholder="URL Name"
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, urlname: e.target.value })
            }
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="entityname">
            Entity name: {entityinfo.entityname}
          </label>
          <InputText
            type="text"
            id="entityname"
            // placeholder="entityname"
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, entityname: e.target.value })
            }
          />
        </div>
	  */}
        <div className="field text-2xl">
          <label htmlFor="organization">
            Organization: {entityinfo.organization}
          </label>

          <InputText
            type="text"
            id="organization"
            // placeholder="email"
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, organization: e.target.value })
            }
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
        {/*
        <div className="field text-2xl">
          <label htmlFor="role">Role: {entityinfo.role}</label>
          <Dropdown
            value={role}
            options={roles}
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, role: e.target.value })
            }
            style={{ height: "4rem", fontSize: "2.0rem" }}
            placeholder="Select a Role"
            id="role"
            className="text-2xl"
          />
        </div>
*/}
      </div>
      <div className="field text-2xl">
        {/* Status:  */}
        <span className="text-pink-500">{error}</span>
        <div className="flex  align-items-center  justify-content-between">
          {/* <label>  */}
          <Button
            label="AutoConfigure"
            onClick={() => autoconfigure()}
            className=" m-3 text-2xl"
          />
          <Button
            label="GetData"
            onClick={() => getdata()}
            className=" m-3 text-2xl"
          />

          {/* </label> */}
        </div>
      </div>
    </div>
  );
}
