import { useToken } from "../../App/useToken";

const url = "https://sailsg1.thebsv.tech";

const usetoken = new useToken();

const theuser = usetoken.getUser();

class IssuanceServiceWBOB {
  getuser() {
    return usetoken.getUser();
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
        throw e;
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
        throw e;
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
  centralasset(assetid, centralaccount, mintamount) {
    const payload = {
      method: "POST",
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
    return fetch(url + "/centralbank/entitymintasset", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
*/
  placebuyorder(pairname, first, second, price, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname,
        side: "buyside",
        price: price,
        amount: amount,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: first,
        secondissuetype: second,
      }),
    };

    return fetch(url + "/exchange/createorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  placetakeorder(pairname, first, second, price, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname,
        side: "takeside",
        price: price,
        amount: amount,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: first,
        secondissuetype: second,
      }),
    };

    return fetch(url + "/exchange/createtakeorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  placeatombuyorder(
    specificaccountnumber,
    pairname,
    first,
    second,
    price,
    amount
  ) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname,
        side: "atomicbuyside",
        price: price,
        ordertype: "limit",
        amount: amount,
        specificaccount: {
          accountnumber: specificaccountnumber,
        },

        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: first,
        secondissuetype: second,
      }),
    };

    return fetch(url + "/atomicexchange/createatomicorder", payload)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
        throw e;
      });
  }

  getwholesalebanks() {
    return fetch(url + "/cb/getwholesalebanks").then((res) => res.json());
  }

  acceptatomsellorder(pairname, prepared, first, second, price, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname,
        side: "atomicbuyside",
        price: price,
        ordertype: "limit",
        amount: amount,
        acceptedorder: prepared,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: first,
        secondissuetype: second,
      }),
    };

    return fetch(url + "/atomicexchange/acceptatomicorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
        throw e;
      });
  }

  rejectatomsellorder(pairname, prepared, first, second, price, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname,
        side: "atomicbuyside",
        price: price,
        ordertype: "limit",
        amount: amount,
        rejectedorder: prepared,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: first,
        secondissuetype: second,
      }),
    };

    return fetch(url + "/atomicexchange/rejectatomicorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
        throw e;
      });
  }

  acceptatombuyorder(pairname, prepared, broken1, broken2, price, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname, //"Digital_USD-Digital_INR",
        side: "atomicsellside",
        price: price,
        ordertype: "limit",
        amount: amount,
        acceptedorder: prepared,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: broken1,
        secondissuetype: broken2,
      }),
    };

    return fetch(url + "/atomicexchange/acceptatomicorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
        throw e;
      });
  }

  rejectatombuyorder(pairname, prepared, broken1, broken2, price, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname, //"Digital_USD-Digital_INR",
        side: "atomicsellside",
        price: price,
        ordertype: "limit",
        amount: amount,
        rejectedorder: prepared,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: broken1,
        secondissuetype: broken2,
      }),
    };

    return fetch(url + "/atomicexchange/rejectatomicorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
        throw e;
      });
  }

  canceloneprepare(pairname, prepared, broken1, broken2, price, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname, //"Digital_USD-Digital_INR",
        side: "atomicsellside",
        price: price,
        ordertype: "limit",
        amount: amount,
        cancelprepare: prepared,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: broken1,
        secondissuetype: broken2,
      }),
    };

    return fetch(url + "/atomicexchange/canceloneprepare", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
        throw e;
      });
  }
  placeatomsellorder(
    specificaccountnumber,
    pairname,
    broken1,
    broken2,
    price,
    amount
  ) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname, //"Digital_USD-Digital_INR",
        side: "atomicsellside",
        price: price,
        ordertype: "limit",
        amount: amount,
        specificaccount: {
          accountnumber: specificaccountnumber,
        },
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: broken1,
        secondissuetype: broken2,
      }),
    };

    return fetch(url + "/atomicexchange/createatomicorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
        return response;
      })
      .catch((e) => {
        console.log("e", e);
        throw e;
      });
  }

  placesellorder(pairname, first, second, price, amount) {
    const payload = {
      method: "POST",
      headers: {
        Authorization: usetoken.getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        pairname: pairname,
        side: "sellside",
        price: price,
        amount: amount,
        traderaccount: {
          accountholder: "subscriber",
          accountnumber: theuser.subcentralaccountnumber,
        },
        firstissuetype: first,
        secondissuetype: second,
      }),
    };

    return fetch(url + "/exchange/createorder", payload)
      .then((res) => res.json())
      .then((response) => {
        // alert("success");
        // toast.success("transfered");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
  /*
  makeassetavailble(assetid, centralaccount, mintamount) {
    const payload = {
      asset: {
        assetid: assetid,
        issuetype: "Cash_BINR",
      },
      amount: mintamount,
      operationaccount: {
        accountholder: "central",
        accountnumber: "CAC-CEN901-0001",
      },
    };
    return fetch(
      url + "/centralbank/makeassetavailableincentralbank",
      payload
    )
      .then((res) => res.json())
      .then((response) => {
        alert("success");
        // toast.success("success");
        console.log(response);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }
  getassets() {
    const payload = {
      method: "POST",
      body: JSON.stringify({
        entity: "test",
      }),
    };
    return fetch(url + "/centralbank/getassets", payload).then(
      (res) => res.json()
    );
  }
	*/
  getassets() {
    return fetch(url + "/centralbank/getentityassets/" + theuser.entityid).then(
      (res) => res.json()
    );
  }

  getsubscribers() {
    const payload = {
      method: "POST",
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
}

export { IssuanceServiceWBOB };
