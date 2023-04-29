import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Route, useHistory } from "react-router-dom";

import { useToken } from "../App/useToken";
import { LoginService } from "./LoginService";

export default function Login({ setToken }) {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [error, setError] = useState("");

  const [role, setRole] = useState("");
  const [centralbanks, setCentralbanks] = useState([]);
  const [centralbank, setCentralbank] = useState({});

  const [organization, setOrganization] = useState("");

  const usetoken = new useToken();
  const history = useHistory();

  const roles = ["Central bank"];

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
      });

      if (tokendata.token) {
        usetoken.saveToken(tokendata);
        await refresh();
        //tokendata = await loginservice.getlatestuser();
        //usetoken.saveToken(tokendata);

        //usetoken.getToken();
        setError("Login success");
        //history.push('/central-bank/'+usetoken.getUser().marker)
        history.push("/central-bank/");
      }
    } catch (err) {
      //setError("Login failed " + err)
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
      });

      if (tokendata.token) {
        usetoken.setToken(tokendata);
        setError("Login success");
        history.push("/central-bank");
      } else {
        setError("Login failed");
      }
    } catch (err) {
      setError("Login failed");
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
      setCentralbanks(tokendata);
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Central bank login </h1>

      <div>
        <label>
          <p>Choose central bank</p>
          <Dropdown
            optionLabel="organization"
            value={centralbank}
            options={centralbanks}
            onChange={(e) => {
              setCentralbank(e.target.value);
            }}
            placeholder="Select a central bank"
          />
        </label>
      </div>

      <label>
        <p>Email : {email}</p>
        <input
          value={centralbank.email}
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        <p>Password</p>

        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <div>
        <label>
          <p>Organization</p>
          <input
            type="text"
            placeholder="Organization"
            onChange={(e) => setOrganization(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <p>Role</p>
          <Dropdown
            value={role}
            options={roles}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Select a Role"
          />
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
          <button onClick={() => login()}>Login</button>
          <button onClick={() => register()}>Register</button>
        </label>
      </div>
    </div>
  );
}
