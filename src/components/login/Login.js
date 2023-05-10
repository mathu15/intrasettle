import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Link, Route, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useToken } from "../App/useToken";
import { LoginService } from "../devlogin/LoginService";
import { Button } from "primereact/button";

export default function Login({ setToken }) {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [centralbanks, setCentralbanks] = useState([]);
  const [centralbank, setCentralbank] = useState({});

  const [error, setError] = useState("");

  const [role, setRole] = useState("");
  const [network, setNetwork] = useState("testnet");

  const [organization, setOrganization] = useState("");

  const usetoken = new useToken();
  const history = useHistory();

  const roles = ["Central bank"];
  const networks = ["testnet", "livenet"];

  const loginservice = new LoginService();

  useEffect(() => {
    setEmail(centralbank.email);
  }, [centralbank]);

  useEffect(() => {
    getcentralbanks();
  }, []);

  const login = async () => {
    try {
      const tokendata = await loginservice.loginUser({
        email,

        password,
        network,
      });
      console.log(tokendata);

      if (tokendata.token) {
        usetoken.saveToken(tokendata);
        await refresh();
        //tokendata = await loginservice.getlatestuser();
        //usetoken.saveToken(tokendata);

        //usetoken.getToken();
        setError("Login success");
        //history.push('/central-bank/'+usetoken.getUser().marker)
        if (tokendata.user.centralaccountnumber == "") {
          history.push("/admincb/");
        } else {
          history.push("/central-bank/");
        }
      } else {
        setError("Login failed");
      }
    } catch (err) {
      console.log(err);
      setError("Login failed " + err);
    }
  };

  const refresh = async () => {
    const tokendata = await loginservice.getlatestuser();
    if (tokendata.token) {
      usetoken.saveToken(tokendata);
    }
  };

  const register = async () => {
    try {
      const tokendata = await loginservice.registerUser({
        email,

        password,
        role,
        organization,
        network,
      });

      console.log(tokendata);
      if (tokendata.token) {
        usetoken.saveToken(tokendata);
        setError("Register success");
        history.push("/admincb");
      } else {
        setError("Register failed");
      }
    } catch (err) {
      console.log(err);
      setError("Register failed");
    }
  };

  const update = async () => {
    try {
      const tokendata = await loginservice.updateUser(
        {
          email,

          password,
          role,
          organization,
          network,
        },
        usetoken.getToken()
      );
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  const configure = async () => {
    try {
      const tokendata = await loginservice.configureEntity(usetoken.getToken());
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  const getcentralbanks = async () => {
    try {
      const tokendata = await loginservice.getcentralbanks();
      console.log(tokendata);
      if (Array.isArray(tokendata)) setCentralbanks(tokendata);
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  return (
    <div className="grid justify-content-center">
      <div className="col-12 md:col-6">
        <Link to="/">
          <img
            className="h-8rem w-full p-3"
            src={"images/intrasettle_White.svg"}
            alt="logo"
          />
        </Link>
        <div className="card p-fluid">
          <h5 className="text-3xl text-center">CENTRAL BANK LOGIN</h5>
          <div className="field text-2xl">
            <label htmlFor="cbank">Choose central bank</label>

            <Dropdown
              id="cbank"
              optionLabel="organization"
              value={centralbank}
              options={centralbanks}
              onChange={(e) => {
                setCentralbank(e.target.value);
              }}
              placeholder="Select a central bank"
              className="text-2xl"
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="email1">Email</label>

            <InputText
              id="email1"
              type="email"
              value={centralbank.email}
              // placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="password">Password</label>

            <InputText
              id="password"
              type="password"
              // placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="organization">Organiztion</label>

            <InputText
              type="text"
              id="organization"
              // placeholder="email"
              onChange={(e) => setOrganization(e.target.value)}
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="role">Role</label>

            <Dropdown
              value={role}
              options={roles}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Select a Role"
              id="role"
              className="text-2xl"
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div className="field text-2xl">
            <label htmlFor="network">Network : {network} </label>

            <Dropdown
              value={network}
              options={networks}
              onChange={(e) => setNetwork(e.target.value)}
              placeholder="Select a Network"
              id="role"
              className="text-2xl"
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
        </div>
        <div className="field text-2xl">
          {/* Status: */}
          <span className="text-pink-500">{error}</span>
          <div className="flex  align-items-center  justify-content-center">
            {/* <label> */}
            <Button
              label="Login"
              onClick={() => login()}
              className=" m-3 text-2xl"
            />
            <Button
              label="Register"
              onClick={() => register()}
              className=" m-3 text-2xl"
            />
            {/* </label> */}
          </div>
        </div>
      </div>
    </div>
  );
}
