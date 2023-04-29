import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Route, useHistory } from "react-router-dom";

import { useToken } from "../App/useToken";
import { LoginService } from "../devlogin/LoginService";

import { IssuanceService } from "../CBtabmenu/CBHome/IssuanceService";

export default function Transmitassets({ setToken }) {
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

  const Sendinfo = {
    systemid: "",
    toaccountnumber: "",
    symbol: "",
    amount: "",
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [sendinfo, setSendinfo] = useState(Sendinfo);
  const [entityinfo, setEntityinfo] = useState(Entityinfo);

  const [error, setError] = useState("");
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");

  const [role, setRole] = useState("");
  const [assets, setAssets] = useState();

  const loginservice = new LoginService();

  const history = useHistory();

  const roles = ["Central bank", "Wholesale bank", "Exchange"];

  const issuanceservice = new IssuanceService();
  const usetoken = new useToken();

  useEffect(() => {
    var user = usetoken.getUser();
    setEntityinfo(user);
    var xx = async () => {
      var assets = await issuanceservice.getassets();
      setAssets(assets);
    };

    xx();
  }, []); //

  const getdata1 = async () => {
    const tokendata = await loginservice.getlatestuser();
    if (tokendata.token) {
      usetoken.saveToken(tokendata);
      setEntityinfo(tokendata.user);
    }
  };

  const getassets1 = async () => {
    var assets = await issuanceservice.getassets();
    setAssets(assets);
  };

  const sendtoentity = async () => {
    try {
      setSendinfo({
        systemid: entityinfo.systemid,
        toaccountnumber: entityinfo.entityaccountnumber,
        symbol: symbol.issuetype,
        amount: amount,
      });

      const tokendata = await loginservice.sendfromsource(sendinfo);
      setError("Success " + tokendata.txid);
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  const sendtocentral = async () => {
    try {
      setSendinfo({
        systemid: entityinfo.systemid,
        toaccountnumber: entityinfo.centralaccountnumber,
        symbol: symbol.issuetype,
        amount: amount,
      });

      const tokendata = await loginservice.sendfromsource(sendinfo);
      setError("Success " + tokendata.txid);
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  return (
    <div className="col-12 ">
      <div className="card p-fluid">
        <h5 className="text-3xl text-center">CENTRAL BANK</h5>
        <div className="field text-2xl">
          <label htmlFor="assets">Assets</label>

          <Dropdown
            value={symbol}
            options={assets}
            optionLabel="issuetype"
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Select a Asset"
            id="assets"
            className="text-2xl"
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="amount">Amount</label>

          <InputText
            id="amount"
            type="number"
            placeholder="amount"
            onChange={(e) => setAmount(e.target.value)}
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="entiityid">Entity id: {entityinfo.entityid}</label>

          <InputText
            id="entiityid"
            type="text"
            placeholder="entityid"
            onChange={(e) =>
              setEntityinfo({ ...entityinfo, entityid: e.target.value })
            }
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="entityaccno">
            Entity account number: {entityinfo.entityaccountnumber}
          </label>

          <InputText
            type="text"
            id="entityaccno"
            placeholder="entityaccountnumber"
            onChange={(e) =>
              setEntityinfo({
                ...entityinfo,
                entityaccountnumber: e.target.value,
              })
            }
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
        <div className="field text-2xl">
          <label htmlFor="centralaccno">
            Central account number: {entityinfo.centralaccountnumber}
          </label>

          <InputText
            type="text"
            id="centralaccno"
            placeholder="centralaccountnumber"
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
      <div className="field text-2xl">
        {/* Status: */}
        <span className="text-pink-500">{error}</span>
        <div className="flex  align-items-center  justify-content-between">
          {/* <label> */}
          <Button
            label="Transmit to central entity"
            onClick={() => sendtoentity()}
            className=" m-3 text-2xl"
          />
          <Button
            label="Transmit to central operation"
            onClick={() => sendtocentral()}
            className=" m-3 text-2xl"
          />
          <Button
            label="GetData"
            onClick={() => getdata1()}
            className=" m-3 text-2xl"
          />
          <Button
            label="GetAssets"
            onClick={() => getassets1()}
            className=" m-3 text-2xl"
          />
          {/* </label> */}
        </div>
      </div>
    </div>
  );
}
