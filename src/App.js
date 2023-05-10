import "./App.css";

// import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "prismjs/themes/prism-coy.css";
import "primeflex/primeflex.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import classNames from "classnames";
import Home from "./containers/Home/Home";
import Frontpage from "./containers/Frontpage/Frontpage";

import { BrowserRouter as Router, Route } from "react-router-dom";
import CentralBank from "./containers/CentralBank/CentralBank";
import { Toast } from "primereact/toast";
import WBankOne from "./containers/WholesaleBankone/WBankOne";
import Devhome from "./containers/devhome/Devhome";
import Login from "./components/login/Login";
import Wblogin from "./components/wblogin/Wblogin";
import Admin from "./containers/Admin/Admin";
import Admincentral from "./containers/Admin/Admincentral";
import Adminwholesale from "./containers/Admin/Adminwholesale";

//import { useToken }  from '../App/useToken';

function App() {
  //const usetoken = new useToken();

  return (
    <Router>
      <Toast />
      <>
        <Route path="/" exact component={Frontpage} />
        <Route path="/devhome" exact component={Devhome} />
        <Route path="/cb-login" exact component={Login} />

        <Route path="/wb-login" exact component={Wblogin} />
        <Route path="/central-bank" component={CentralBank} />
        <Route path="/wholesale-bank-one" component={WBankOne} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/admincb" exact component={Admincentral} />
        <Route path="/adminwb" exact component={Adminwholesale} />
      </>
    </Router>
  );
}

export default App;
