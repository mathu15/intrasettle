import { useState } from "react";

class Satspertoken {
  //  const [token, setToken] = useState(this.getToken());

  satisfy = (assets, symbol, balance) => {
    console.log(assets);
    var pp = assets.filter((xx) => {
      if (xx.issuetype == symbol) return true;
    });
    console.log(pp);
    console.log(symbol);
    if (pp[0] && Number.isInteger(pp[0].satspertoken)) {
      return this.wrap(pp[0].satspertoken, balance);
    } else {
      return this.wrap(1, balance);
    }
  };
  decfraction = (sat) => {
    if (sat == 100) return 2;
    if (sat == 10) return 1;
    if (sat == 1) return 0;
  };

  wrap = (sat, thenumber) => {
    if (sat == 100) return (thenumber / sat).toFixed(2);
    if (sat == 10) return (thenumber / sat).toFixed(1);
    if (sat == 1) return (thenumber / sat).toFixed(0);
  };
}

export { Satspertoken };
