import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Route, useHistory } from "react-router-dom";

import { useToken } from "../App/useToken";
import { LoginService } from "../devlogin/LoginService";

export default function Wbconfigure({ setToken }) {
  const Entityinfo = {
    email: "",
    username: "",
    urlname: "",
    role: "",
    organization: "",
    accountid: "",
    entityaccountnumber: "",
    centralaccountnumber: "",
    subcentralaccountnumber: "",
    subentityemail: "",
    subentityname: "",
    subentityid: "",
    subscriberid: "",
    subtraderid: "",
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
  const [centralbank, setCentralbank] = useState({});

  const [centralbanks, setCentralbanks] = useState([]);
  const [wholesalebanks, setWholesalebanks] = useState([]);
  const [wholesalebank, setWholesalebank] = useState({});


  const history = useHistory();

  const roles = ["Wholesale bank"];

  const loginservice = new LoginService();
  const usetoken = new useToken();


   useEffect(() => {
    setEmail(wholesalebank.email);
  }, [wholesalebank]);

  useEffect(() => {
    getwholesalebanks();
  }, []);

   const getwholesalebanks = async () => {
    try {
      const tokendata = await loginservice.getallwholesalebanks();
      console.log(tokendata);
      setWholesalebanks(tokendata);
    } catch (err) {
      setError("Update failed " + err);
    }
  };


  useEffect(() => {
    loginservice.getcentralbanks().then((data) => {
      if (data) {
        setCentralbanks(data);
      }
    });
  }, []);

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

      const tokendata = await loginservice.updateUserwb(
        entityinfo,
        usetoken.getToken()
      );
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  const configaccount = async () => {
    try {
      const accounts = await loginservice.wbconfigcentralaccounts();
    } catch (err) {
      setError("config account failed " + err);
    }
  };

  const configtrader = async () => {
    try {
      const accounts = await loginservice.wbconfigtraderaccounts();
    } catch (err) {
      setError("config account failed " + err);
    }
  };

  const enablewb = async () => {
    const tokendata = await loginservice.enablewb();
}

const disablewb = async () => {
    const tokendata = await loginservice.disablewb();
}






  return (
    <div className="col-12 ">
      <div className="card p-fluid">
        <h5 className="text-3xl text-center">Wholesale Bank Configure</h5>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="subentityemail">
              Sub Entity Email: {entityinfo.subentityemail}
            </label>
            <InputText
              id="subentityemail"
              type="email"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, subentityemail: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
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
            <label htmlFor="subscriberid">
              Subscriber id: {entityinfo.subscriberid}
            </label>
            <InputText
              id="subscriberid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, subscriberid: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field col text-2xl">
            <label htmlFor="subtraderid">
              Subtrader id: {entityinfo.subtraderid}
            </label>
            <InputText
              id="subtraderid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, subtraderid: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="subentityid">
              Sub Entity id: {entityinfo.subentityid}
            </label>
            <InputText
              id="subentityid"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, subentityid: e.target.value })
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
        </div>
        <div className="formgrid grid">
          <div className="field col text-2xl">
            <label htmlFor="subcenaccnumber">
              Sub Central account number {entityinfo.subcentralaccountnumber}
            </label>
            <InputText
              id="subcenaccnumber"
              type="text"
              onChange={(e) =>
                setEntityinfo({
                  ...entityinfo,
                  subcentralaccountnumber: e.target.value,
                })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="formgrid grid">
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
        </div>
        <div className="formgrid grid">
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
            <label htmlFor="subentityname">
              Entity name : {entityinfo.subentityname}
            </label>
            <InputText
              id="subentityname"
              type="text"
              onChange={(e) =>
                setEntityinfo({ ...entityinfo, subentityname: e.target.value })
              }
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>

        <div className="formgrid grid">
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
        </div>
        <div className="formgrid grid">
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
          <div className="field col text-2xl">
            <label>Central Bank</label>
            <Dropdown
              optionLabel="entityname"
              value={centralbank}
              options={centralbanks}
              onChange={(e) => setCentralbank(e.target.value)}
              placeholder="Select centralbank for configure"
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>


        <div className="formgrid grid">
	  <div className="field text-2xl">
            <label htmlFor="cbank">Choose wholesale bank</label>

            <Dropdown
              id="wbank"
              optionLabel="organization"
              value={wholesalebank}
              options={wholesalebanks}
              onChange={(e) =>
                setWholesalebank(e.target.value)
              }
              placeholder="Select a bank to enable/disable"
              className="text-2xl"
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
	  <div className="field text-2xl">
            <label htmlFor="email">Email for bank : {wholesalebank.email}</label>

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
              label="ConfigTrader"
              onClick={() => configtrader()}
              className=" m-3 text-2xl"
            />

          <Button
              label="Enable"
              onClick={() => enablewb()}
              className=" m-3 text-2xl"
            />
           <Button
              label="Disable"
              onClick={() => disablewb()}
              className=" m-3 text-2xl"
            />

            {/* </label> */}
          </div>
        </div>
      </div>
    </div>
  );
}
