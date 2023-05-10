import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Route, useHistory } from "react-router-dom";

import { useToken } from "../App/useToken";
import { LoginService } from "../devlogin/LoginService";

import { IssuanceService } from "../CBtabmenu/CBHome/IssuanceService";

export default function Createassets({ setToken }) {
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
  const [newsymbol, setNewsymbol] = useState("");
  const [amount, setAmount] = useState("");

  const [role, setRole] = useState("");
  const [decimal, setDecimal] = useState(1);
  const [retaillimit, setRetaillimit] = useState(100000);
  const [assets, setAssets] = useState();

  const loginservice = new LoginService();

  const history = useHistory();

  const roles = ["Central bank", "Wholesale bank", "Exchange"];
  const decimals = [0, 1, 2];

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

  const createasset = async () => {
    try {
      var data = {
        symbol: newsymbol,
        decimal: decimal,
        retaillimit: retaillimit,
        supply: amount,
      };
      const tokendata = await loginservice.createasset(data);
      setError("Success ");
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  return (
    <div className="col-12 ">
      <div className="card p-fluid">
        <h5 className="text-3xl text-center">Central bank create assets</h5>
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
          <label htmlFor="amount">Number of assets</label>

          <InputText
            id="amount"
            type="number"
            placeholder="amount"
            onChange={(e) => setAmount(e.target.value)}
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>

        <div className="field text-2xl">
          <label htmlFor="retaillimit">Retail limit: {retaillimit} </label>

          <InputText
            id="retaillimit"
            type="number"
            placeholder="Retail limit"
            onChange={(e) => setRetaillimit(e.target.value)}
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>

        <div className="field text-2xl">
          <label htmlFor="decimals">Decimal: {decimal}</label>

          <Dropdown
            value={decimal}
            options={decimals}
            onChange={(e) => setDecimal(e.target.value)}
            placeholder="Select the decimal "
            id="decimals"
            className="text-2xl"
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>

        <div className="field text-2xl">
          <label htmlFor="newasset">New asset: {newsymbol}</label>

          <InputText
            id="newasset"
            type="text"
            // placeholder="New Symbol"
            onChange={(e) => setNewsymbol(e.target.value)}
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
      </div>
      <div className="field text-2xl">
        <span className="text-pink-500">{error}</span>
        <div className="flex  align-items-center  justify-content-between">
          {/* <label> */}
          <Button
            label="Create Asset"
            onClick={() => createasset()}
            className=" m-3 text-2xl"
          />
        </div>
      </div>
      <div className="field text-2xl">
        {/* Status: */}
        <span className="text-pink-500">{error}</span>
        <div className="flex  align-items-center  justify-content-between">
          {/* <label> */}
          <Button
            label="Getdata"
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
