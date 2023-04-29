import { useToken } from "../App/useToken";

const url = "https://sailsg1.thebsv.tech";

const usetoken = new useToken();

const theuser = usetoken.getUser();

class LoginService {
  async registerUser(credentials) {
    console.log(credentials);

    return fetch(url + "/cb/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async updateUser(credentials, token) {
    console.log(token);
    console.log(credentials);

    return fetch(url + "/cb/update", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async updateUserwb(credentials, token) {
    console.log(token);
    console.log(credentials);

    return fetch(url + "/cb/updatewb", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async getlatestuser() {
    return fetch(url + "/cb/getlatestuser", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async getwholesalebanks() {
    return fetch(url + "/cb/getwholesalebanks", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async getcentralbanks() {
    return fetch(url + "/cb/getcentralbanks", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async cbconfigcentralaccounts() {
    return fetch(url + "/cb/cbconfigcentralaccounts", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }
  async wbconfigcentralaccounts() {
    return fetch(url + "/cb/wbconfigcentralaccounts", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async wbconfigtraderaccounts() {
    return fetch(url + "/cb/wbconfigtraderaccounts", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async configurecbentity(data) {
    return fetch(url + "/cb/configurecbentity", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async configurewbentity(data, centralbank) {
    return fetch(url + "/cb/configurewbentity", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ subscriberbank: data, centralbank: centralbank }),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async sendfromsource(data) {
    return fetch(url + "/cb/sendfromsource", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async createasset(data) {
    return fetch(url + "/cb/createasset", {
      method: "POST",

      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  async loginUser(credentials) {
    return fetch("https://sailsg1.thebsv.tech/cb/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(credentials),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw err;
      });
  }

  /*
  sendcentraltosubscriber(assetname, participant, numberissued) {
    const payload = {
      method: "POST",
      headers: {Authentication: useToken.getToken()}, 
      body: JSON.stringify({
        asset: assetname,
        participant: participant,
        numberissued: numberissued,
      }),
    };
    return fetch(
      url + "/centralbank/sendcentraltosubscriber",
      payload
    ).then((res) => res.json());
  }
  getentitybalance() {
    const payload = { headers: {Authentication: usetoken.getToken()} };
    return fetch(
	    url+ "/getbalance/CAC-ENT901-0001", payload).then(
      (res) => res.json()
    );
  }
  getcentralaccount() {
    return fetch(
	   url +  "/centralbank/getaccount/CAC-CEN901-0001").then(
      (res) => res.json()
    );
  }
  mintasset(assetid, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        asset: {
          assetid: assetid,
          issuetype: centralaccount,
        },
        amount: mintamount,
      }),
    };
    return fetch(
	    url + "/centralbank/mintasset", payload)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        alert("success");
      });
  }
  centralasset(assetid, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        centralentity: {
          entityid: "ENT-CEN-0901",
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
    return fetch(
	   url +  "/centralbank/createcentralasset", payload)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        alert("success");
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
  entitymintasset(asset, centralaccount, mintamount) {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        asset: {
          assetid: asset,
          issuetype: centralaccount,
        },
        amount: mintamount,
      }),
    };
    return fetch(
	   url+ "/centralbank/entitymintasset", payload)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        alert("success");
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
 */

  getassets() {
    return fetch(url + "/centralbank/getentityassets/" + theuser.entityid).then(
      (res) => res.json()
    );
  }

  getcentralaccount() {
    return fetch(
      url + "/centralbank/getaccount/" + theuser.centralaccountnumber
    ).then((res) => res.json());
  }

  getentitybalance() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.entityaccountnumber
    ).then((res) => res.json());
  }

  getcentralbalance() {
    return fetch(
      url + "/centralbank/getbalance/" + theuser.centralaccountnumber
    ).then((res) => res.json());
  }

  getsubscriberaccounts() {
    return fetch(
      url + "/centralbank/getsubscriberaccounts/" + theuser.entityid
    ).then((res) => res.json());
  }

  getsubscribers() {
    return fetch(url + "/centralbank/getsubscribers/" + theuser.entityid).then(
      (res) => res.json()
    );
  }

  getCentralToSubscriber() {
    const payload = {
      method: "POST",
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
}

export { LoginService };
