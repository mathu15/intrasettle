import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Route, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useToken } from "../App/useToken";
import { LoginService } from "../devlogin/LoginService";

export default function Centralbanksetup({ setToken }) {
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

 const [centralbanks, setCentralbanks] = useState([]);
  const [centralbank, setCentralbank] = useState({});



  const [entryinfo, setEntryinfo] = useState(Entityinfo);
  const [entityinfo, setEntityinfo] = useState(Entityinfo);

  const [error, setError] = useState("");

  const [role, setRole] = useState("");

  const [organization, setOrganization] = useState("");

  const history = useHistory();

  const roles = ["Central bank", "Wholesale bank", "Exchange"];

  const loginservice = new LoginService();
  const usetoken = new useToken();

  useEffect(() => {
    setEmail(centralbank.email);
  }, [centralbank]);

  useEffect(() => {
    getcentralbanks();
  }, []);

   const getcentralbanks = async () => {
    try {
      const tokendata = await loginservice.getallcentralbanks();
      console.log(tokendata);
      setCentralbanks(tokendata);
    } catch (err) {
      setError("Update failed " + err);
    }
  };


  const login = async () => {
    try {
      const tokendata = await loginservice.loginUser({
        email,

        password,
      });

      if (tokendata.token) {
        usetoken.saveToken(tokendata);
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

  const update = async () => {
    try {
      console.log(entityinfo);

      const tokendata = await loginservice.updateUser(
        entityinfo,
        usetoken.getToken()
      );
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  const configaccount = async () => {
    try {
      const accounts = await loginservice.cbconfigcentralaccounts();
    } catch (err) {
      setError("config account failed " + err);
    }
  };


const enablecb = async () => {
    const tokendata = await loginservice.enablecb();
}

const disablecb = async () => {
    const tokendata = await loginservice.disablecb();
}



  return (
    <div className="col-12 ">
      <div className="card p-fluid">
        <h5 className="text-3xl text-center">Central Bank Configure</h5>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="entityemail">
              Entity email: {entityinfo.entityemail}
            </label>
            <InputText
              id="entityemail"
              type="email"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entityemail: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="urlname">URL name: {entityinfo.urlname}</label>
            <InputText
              id="urlname"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, urlname: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="entityid">Entity id {entityinfo.entityid}</label>
            <InputText
              id="entityid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entityid: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="enaccnumber">
              Entity account number {entityinfo.entityaccountnumber}
            </label>
            <InputText
              id="enaccnumber"
              type="text"
              onChange={(e) =>
                setEntityinfo({
                  ...entityinfo,
                  entityaccountnumber: e.target.value,
                })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="cenaccnumber">
              Central account number {entityinfo.centralaccountnumber}
            </label>
            <InputText
              id="cenaccnumber"
              type="text"
              onChange={(e) =>
                setEntityinfo({
                  ...entityinfo,
                  centralaccountnumber: e.target.value,
                })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="issuerid">Issuerid : {entityinfo.issuerid}</label>
            <InputText
              id="issuerid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, issuerid: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="funderid">Funderid : {entityinfo.funderid}</label>
            <InputText
              id="funderid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, funderid: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="systemid">Systemid : {entityinfo.systemid}</label>
            <InputText
              id="systemid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, systemid: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="entityname">
              Entity name : {entityinfo.entityname}
            </label>
            <InputText
              id="entityname"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entityname: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="centraladdress">
              Central address : {entityinfo.centraladdress}
            </label>
            <InputText
              id="centraladdress"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, centraladdress: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="entitycode">
              Entity code : {entityinfo.entitycode}
            </label>
            <InputText
              id="entitycode"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entitycode: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="entityaddress">
              Entity address : {entityinfo.entityaddress}
            </label>
            <InputText
              id="entityaddress"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, entityaddress: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="centraladdress">
              Central address : {entityinfo.centraladdress}
            </label>
            <InputText
              id="centraladdress"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, centraladdress: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="marker">Marker : {entityinfo.marker}</label>
            <InputText
              id="marker"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, marker: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="organization">
              Organization : {entityinfo.organization}
            </label>
            <InputText
              id="organization"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, organization: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="role">Role : {entityinfo.role}</label>
            <Dropdown
              id="role"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, role: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="cbank">Choose central bank</label>

            <Dropdown
              id="cbank"
              optionLabel="organization"
              value={centralbank}
              options={centralbanks}
              onChange={(e) => {
                setCentralbank(e.target.value);
              }}
              placeholder="Select a bank to enable/disable"
              className="text-2xl"
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>

          <div className="field col text-2xl">
            <label htmlFor="email">Email for bank : {centralbank.email}</label>
          </div>
        </div>

        <div className="field text-2xl">
          {/* Status:  */}
          <span className="text-pink-500">{error}</span>
          <div className="flex  align-items-center  justify-content-between">
            {/* <label> */}
            <Button
              label="Update"
              onClick={() => update()}
              className=" m-3 text-2xl"
            />
            <Button
              label="GetData"
              onClick={() => getdata()}
              className=" m-3 text-2xl"
            />
            <Button
              label="ConfigAccount"
              onClick={() => configaccount()}
              className=" m-3 text-2xl"
            />

            <Button
              label="Enable"
              onClick={() => enablecb()}
              className=" m-3 text-2xl"
            />

            <Button
              label="Disable"
              onClick={() => disablecb()}
              className=" m-3 text-2xl"
            />

            {/* </label> */}
          </div>
        </div>
      </div>
    </div>
  );
}
