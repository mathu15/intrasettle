import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Link, Route, useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useToken } from "../App/useToken";
import { LoginService } from "../devlogin/LoginService";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

export default function Login({ setToken }) {
  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  const [centralbanks, setCentralbanks] = useState([]);
  const [centralbank, setCentralbank] = useState({});

  const [error, setError] = useState("");

  const [role, setRole] = useState("");

  const [organization, setOrganization] = useState("");
  const [checked, setChecked] = useState("");

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
      } else {
        setError("Login failed");
      }
    } catch (err) {
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
      if (Array.isArray(tokendata)) setCentralbanks(tokendata);
    } catch (err) {
      setError("Update failed " + err);
    }
  };

  return (
    <div className="grid justify-content-center">
      <div className="col-12 md:col-4">
        <Link to="/">
          <img
            className="h-8rem w-full p-3 text-center  mb-7"
            src={"images/intrasettle_White.svg"}
            alt="logo"
          />
        </Link>
        <div className="card p-fluid">
          {/* <h5 className="text-3xl text-center">CENTRAL BANK LOGIN</h5> */}
          <div className="text-900 text-3xl text-center font-medium mb-3">
            WELCOME BACK
          </div>
          <div className="text-center mb-5">
            <span className="text-600 text-2xl text-center font-medium line-height-3">
              Don't have an account?
            </span>
            <Link
              to="/cb-register"
              className="font-medium text-2xl no-underline ml-2 text-blue-500 cursor-pointer"
            >
              Create today!
            </Link>
          </div>
          <div>
            <label
              htmlFor="cbank"
              className="block text-2xl text-900 font-medium mb-2"
            >
              Choose central bank
            </label>

            <Dropdown
              id="cbank"
              optionLabel="organization"
              value={centralbank}
              options={centralbanks}
              onChange={(e) => {
                setCentralbank(e.target.value);
              }}
              placeholder="Select a central bank"
              // className="text-2xl"
              className="w-full text-2xl mb-3"
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div>
            <label
              htmlFor="email1"
              className="block text-2xl text-900 font-medium mb-2"
            >
              Email
            </label>

            <InputText
              id="email1"
              type="email"
              className="w-full text-2xl mb-3"
              value={centralbank.email}
              // placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-2xl text-900 font-medium mb-2"
            >
              Password
            </label>

            <InputText
              id="password"
              type="password"
              // placeholder="password"
              className="w-full text-2xl mb-3"
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div>
          {/* <div className="field text-2xl">
            <label htmlFor="organization">Organiztion</label>

            <InputText
              type="text"
              id="organization"
              // placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: "4rem", fontSize: "2.0rem" }}
            />
          </div> */}

          <div>
            <label
              htmlFor="role"
              className="block text-2xl text-900 font-medium mb-2"
            >
              Role
            </label>

            <Dropdown
              value={role}
              options={roles}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Select a Role"
              id="role"
              // className="text-2xl"
              className="w-full text-2xl  mb-3"
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
              className="  text-2xl w-full"
            />
            {/* <Button
              label="Register"
              onClick={() => register()}
              className=" m-3 text-2xl w-full"
            /> */}
            {/* </label> */}
          </div>
        </div>
      </div>
    </div>
    // <div className="grid justify-content-center">
    //   <div className="col-12 md:col-6">
    //     <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    //     <div className="text-center mb-5">
    //       <img
    //         src="demo/images/blocks/logos/hyper.svg"
    //         alt="hyper"
    //         height="50"
    //         className="mb-3"
    //       />
    //       <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
    //       <span className="text-600 font-medium line-height-3">
    //         Don't have an account?
    //       </span>
    //       <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
    //         Create today!
    //       </a>
    //     </div>

    //     <div>
    //       <label htmlFor="email1" className="block text-900 font-medium mb-2">
    //         Email
    //       </label>
    //       <InputText id="email1" type="text" className="w-full mb-3" />

    //       <label
    //         htmlFor="password1"
    //         className="block text-900 font-medium mb-2"
    //       >
    //         Password
    //       </label>
    //       <InputText id="password1" type="password" className="w-full mb-3" />

    //       <div className="flex align-items-center justify-content-between mb-6">
    //         <div className="flex align-items-center">
    //           <Checkbox
    //             inputId="rememberme1"
    //             binary="true"
    //             className="mr-2"
    //             onChange={(e) => setChecked(e.checked)}
    //             checked={checked}
    //           />
    //           <label htmlFor="rememberme1">Remember me</label>
    //         </div>
    //         <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
    //           Forgot password?
    //         </a>
    //       </div>

    //       <Button label="Sign In" icon="pi pi-user" className="w-full" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
