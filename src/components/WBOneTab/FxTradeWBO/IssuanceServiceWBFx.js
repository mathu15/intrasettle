import { useToken } from "../../App/useToken";

const url = "https://sailsg1.thebsv.tech";

const usetoken = new useToken();

const theuser = usetoken.getUser();

class IssuanceServiceWBFx {
  sendoperationtotrader(assetid, assetname, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        asset: {
          assetid: assetid,
          issuetype: assetname,
        },
        amount: amount,
        operationaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
      }),
    };
    return fetch(url + "/tradesettler/sendoperationtotrader", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  getallentityassets() {
    return fetch(url + "/centralbank/getallentityassets").then((res) =>
      res.json()
    );
  }

  sendcentraltosubscriber(assetid, assetname, participant, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        asset: {
          assetid: assetid,
          issuetype: assetname,
        },
        amount: amount,
        central: {
          accountholder: "central",
          accountnumber: theuser.centralaccountnumber,
        },
        subscriber: {
          accountholder: "subscriber",
          accountnumber: participant,
        },
      }),
    };
    return fetch(url + "/centralbank/sendcentraltosubscriber", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
  sendsubscribertosubscriber(assetid, assetname, participant, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        asset: {
          assetid: assetid,
          issuetype: assetname,
        },
        amount: amount,
        subscriber1: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        subscriber2: {
          accountholder: "subscriber",
          accountnumber: participant,
        },
      }),
    };
    return fetch(url + "/centralsettler/sendsubscribertosubscriber", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  /*
  getcentralaccount() {
    return fetch(url + "/centralbank/getcentralaccount").then(
      (res) => res.json()
    );
  }
  mintasset(assetid, centralaccount, mintamount) {
    const payload = {
      method: "POST",
	     headers: {
		          'Authorization':  usetoken.getToken(),
		          'Content-Type': 'application/json'
		                 },
      body: JSON.stringify({
        asset: {
          assetid: assetid,
          issuetype: centralaccount,
        },
        amount: mintamount,
      }),
    };
    return fetch(url + "/centralbank/mintasset", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
*/

  getentityaccounts() {
    return fetch(
      url + "/centralbank/getaccountsofentity/" + theuser.entityid
    ).then((res) => res.json());
  }

  getcentralaccount() {
    return fetch(
      url + "/centralbank/getaccount/" + theuser.centralaccountnumber
    ).then((res) => res.json());
  }

  getsubscriberaccount() {
    return fetch(
      url + "/centralbank/getaccount/" + theuser.subcentralaccountnumber
    ).then((res) => res.json());
  }

  getsubscribertransactions() {
    return fetch(
      url + "/centralbank/gettransactions/" + theuser.subcentralaccountnumber
    ).then((res) => res.json());
  }

  getentitybalance() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.entityaccountnumber
    ).then((res) => res.json());
  }

  getsubscribebankbalance() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.subcentralaccountnumber
    ).then((res) => res.json());
  }

  centralasset(assetid, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        centralentity: {
          entityid: "CAC-ENT901-0001",
        },
        issue: {
          enityname: "Asset authority",
          assetid: assetid,
          issuetype: "Cash_BINR",
          issuer: "BBI",
          contract: "I promise to pay the bearer 1 Rs ",
          amount: mintamount,
        },
      }),
    };
    return fetch(url + "/centralbank/createcentralasset", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("success");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  entitymintasset(asset, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        asset: {
          assetid: asset,
          issuetype: centralaccount,
        },
        amount: mintamount,
      }),
    };

    return fetch(url + "/centralbank/entitymintasset", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  getassets() {
    return fetch(url + "/centralbank/getentityassets/" + theuser.entityid).then(
      (res) => res.json()
    );
  }

  getsubscribers() {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        entity: "test",
      }),
    };
    return fetch(url + "/centralbank/getsubscribers", payload).then((res) =>
      res.json()
    );
  }

  getCentralToSubscriber() {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        entity: "test",
        asset: "test",
        amount: "test",
        fromaccount: "test",
        toaccount: "test",
      }),
    };
    return fetch(url + "/centralbank/sendcentraltosubscriber", payload).then(
      (res) => res.json()
    );
  }

  // get api for fx rates

  fetchexchangerates() {
    return fetch("https://api.exchangerate.host/latest?base=USD").then((res) =>
      res.json()
    );
  }

  getsubscriberaccount() {
    return fetch(
      url + "/centralbank/getaccount/" + theuser.subcentralaccountnumber
    ).then((res) => res.json());
  }

  getsubscribertransactions() {
    return fetch(
      url + "/centralbank/gettransactions/" + theuser.subcentralaccountnumber
    ).then((res) => res.json());
  }

  gettradertransactions() {
    return fetch(
      url +
        "/tradesettler/gettradertransactions/" +
        theuser.subcentralaccountnumber
    ).then((res) => res.json());
  }

  getentitybalance() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.entityaccountnumber
    ).then((res) => res.json());
  }

  getsubscribebankbalance() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.subcentralaccountnumber
    ).then((res) => res.json());
  }

  getcentralbanktransactions() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.centralaccountnumber
    ).then((res) => res.json());
  }

  gettraderaccountbalance() {
    return fetch(
      url +
        "/exchange/gettraderaccountbalance/" +
        theuser.subcentralaccountnumber
    ).then((res) => res.json());
  }
}

export { IssuanceServiceWBFx };
