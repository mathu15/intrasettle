import React, { useState, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { IssuanceServiceWBOB } from "./issuanceServiceWBOB";

import { Column } from "primereact/column";
import * as _ from 'lodash';
function Pvpsellproposals({
  user,
  buy,
  sell,
  chosenpair,
  setOrderplacedbuy,
  setOrderplacedsell,
}) {
  const [modifiedsell, setModifiedsell] = useState([]);
  const [consideredbuy, setConsideredbuy] = useState([]);

  useEffect(() => {
    var tmpdata = sell.filter((xx) => {
      if (user.subcentralaccountnumber == xx.specificaccountnumber) return true;
      if (user.subcentralaccountnumber == xx.sellaccountnumber) return true;
    });
    setModifiedsell(tmpdata);
  }, [sell, buy]);

  useEffect(() => {
    var tmpdata = buy.filter((xx) => {
      if (user.subcentralaccountnumber == xx.buyaccountnumber) return true;
    });
    // consider buys only from this user
    setConsideredbuy(tmpdata);
  }, [buy]);

  const issuanceServiceWBOB = new IssuanceServiceWBOB();

  const anyprepared = (rowdata) => {
    var anyfound = consideredbuy.filter((xx) => {
      if (
        xx.buyprice == rowdata.sellprice &&
        xx.buyamount == rowdata.sellamount
      )
        return true;
    });
    console.log(rowdata);
    console.log(anyfound);
    if (anyfound.length > 0) return true;
    else return false;
  };

  const acceptatomsellorder = async (rowData) => {
    var chosenpair = rowData.pairname;
    var first = chosenpair.split("-")[0];
    var second = chosenpair.split("-")[1];

    var price = rowData.sellprice;
    var amount = rowData.sellamount;
    var prepared = rowData.prepared;

    var ret = await issuanceServiceWBOB.acceptatomsellorder(
      chosenpair,
      rowData,
      first,
      second,
      price,
      amount
    );

    console.log(ret);
    if (ret && ret.code == -1) {
      ret = await issuanceServiceWBOB.acceptatomsellorder(
        chosenpair,
        rowData,
        first,
        second,
        price,
        amount
      );
    }

    setOrderplacedsell(true);
    /*
        if(ret && ret.txid) {
           setOrderplacedsell(true);
        }
          else {
          alert ("Order failed");
          }
*/

    if (_.has(ret, "code")) {
      if (ret.code == 0) {
        alert("Accept success");
      } else {
        alert("Accept failed");
        return;
      }
    }

    /*       if(_.has(ret, 'error')) {
                alert('Accept failed');
                 return;
        }
*/
  };

  const rejectatomsellorder = async (rowData) => {
    var chosenpair = rowData.pairname;
    var first = chosenpair.split("-")[0];
    var second = chosenpair.split("-")[1];

    var price = rowData.sellprice;
    var amount = rowData.sellamount;
    var prepared = rowData.prepared;

    var ret = await issuanceServiceWBOB.rejectatomsellorder(
      chosenpair,
      rowData,
      first,
      second,
      price,
      amount
    );

    console.log(ret);
    if (ret && ret.code == -1) {
      ret = await issuanceServiceWBOB.rejectatomsellorder(
        chosenpair,
        rowData,
        first,
        second,
        price,
        amount
      );
    }

    setOrderplacedsell(true);
    /*
        if(ret && ret.txid) {
           setOrderplacedsell(true);
        }
          else {
          alert ("Order failed");
          }
*/

    if (_.has(ret, "code")) {
      if (ret.code == 0) {
        alert("Reject success");
      } else {
        alert("Reject failed");
        return;
      }
    }

    if (_.has(ret, "error")) {
      /*
                 *
                "side": "atomicbuyside",
                "needed": 190,
                "neededsymbol": "Digital_INR",
                "error": "failed to prepare"
                 * */

      alert("Reject failed");
      return;
    }

    if (_.has(ret, "transactionid")) {
      alert("Reject success");
    }
  };
  const cancelthis = async (rowData) => {
    var chosenpair = rowData.pairname;
    var first = chosenpair.split("-")[0];
    var second = chosenpair.split("-")[1];

    var price = rowData.sellprice;
    var amount = rowData.sellamount;
    var prepared = rowData.prepared;

    var ret = await issuanceServiceWBOB.canceloneprepare(
      chosenpair,
      rowData,
      first,
      second,
      price,
      amount
    );

    console.log(ret);
    if (ret && ret.code == -1) {
      ret = await issuanceServiceWBOB.canceloneprepare(
        chosenpair,
        rowData,
        first,
        second,
        price,
        amount
      );
    }
    setOrderplacedsell(true);

    if (_.has(ret, "code")) {
      if (ret.code == 0) {
        alert("Cancel success");
      } else {
        alert("Cancel failed");
        return;
      }
    }

    if (_.has(ret, "error")) {
      /*
                 *
                "side": "atomicbuyside",
                "needed": 190,
                "neededsymbol": "Digital_INR",
                "error": "failed to prepare"
                 * */

      alert("Cancel failed");
      return;
    }

    if (_.has(ret, "txid")) {
      alert("Cancel success");
    }
  };

  const spriceBodyTemplate = (rowData) => {
    return <span className="text-red-400"> {rowData.sellprice} </span>;
  };

  const pairnameBodyTemplate = (rowData) => {
    return <span className="text-red-400"> {rowData.pairname} </span>;
  };

  const buyselltemplate = (rowData) => {
    return rowData.side == "atomicbuyside" ? "BUY" : "SELL";
  };

  const executetemplate = (rowData) => {
    if (user.subcentralaccountnumber == rowData.sellaccountnumber) {
      return (
        <div className="flex align-items-center gap-2">
          <Button
            label="Cancel"
            icon="pi "
            onClick={() => cancelthis(rowData)}
          />
        </div>
      );
    } else if (user.subcentralaccountnumber == rowData.specificaccountnumber) {
      if (anyprepared(rowData) == true) {
        return (
          <div className="flex align-items-center gap-2">
            <Button
              label="Accept"
              icon="pi "
              onClick={() => acceptatomsellorder(rowData)}
            />
            <Button
              label="Reject"
              icon="pi "
              onClick={() => rejectatomsellorder(rowData)}
            />
          </div>
        );
      } else {
        return (
          <div className="flex align-items-center gap-2">
            <Button
              label="Prepare"
              icon="pi "
              onClick={() => preparematchforatomsellorder(rowData)}
            />
            <Button
              label="Reject"
              icon="pi "
              onClick={() => rejectatomsellorder(rowData)}
            />
          </div>
        );
      }
    }
  };
  const preparematchforatomsellorder = async (rowData) => {
    var first = chosenpair.split("-")[0];
    var second = chosenpair.split("-")[1];

    //    /atomicexchange/createmakeorder
    var price = rowData.sellprice;
    var volume = rowData.sellamount;

    var ret = await issuanceServiceWBOB.placeatombuyorder(
      "",
      chosenpair,
      first,
      second,
      price,
      volume
    );
    console.log(ret);
    if (ret && ret.code == -1) {
      ret = await issuanceServiceWBOB.placeatombuyorder(
        "",
        chosenpair,
        first,
        second,
        price,
        volume
      );
    }
    setOrderplacedbuy(true);

    if (_.has(ret, "error")) {
      /*
                 *
                "side": "atomicbuyside",
                "needed": 190,
                "neededsymbol": "Digital_INR",
                "error": "failed to prepare"
                 * */

      alert(
        "Prepare failed : needed " +
          ret.needed +
          " " +
          ret.neededsymbol +
          " check balance in trading account"
      );

      return;
    }

    if (_.has(ret, "transactionid")) {
      alert("Prepare success");
    }
  };

  const samountBodyTemplate = (rowData) => {
    return rowData.sellamount;
  };
  const dateBodyTemplate1 = (rowData) => {
    return (
      <>
        {new Intl.DateTimeFormat("en-US", {
          // year: 'numeric',
          // month: '2-digit',
          // day: '2-digit',
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(rowData.createdAt)}
      </>
    );
  };

  const idBodyTemplate = (rowData) => {
    return rowData.buyaccountnumber
      ? rowData.buyaccountnumber
      : rowData.sellaccountnumber;
  };

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card border-1 border-100  ">
          <div className="flex ml-1">
            <DataTable
              value={modifiedsell}
              scrollable
              scrollHeight="350px"
              responsiveLayout="scroll"
              className="text-xl border-none"
            >
              <Column
                field="price"
                header="Pair"
                sortable
                style={{ width: "55%" }}
                body={pairnameBodyTemplate}
                rows={5}
                className="text-xl border-none "
              />

              <Column
                field="price"
                header="Price"
                sortable
                style={{ width: "35%" }}
                body={spriceBodyTemplate}
                rows={5}
                className="text-xl border-none "
              />
              <Column
                field="price"
                header="Volume"
                sortable
                style={{ width: "35%" }}
                body={samountBodyTemplate}
                rows={5}
                className="text-xl border-none"
              />
              <Column
                // field="price"
                header="ID"
                sortable
                style={{ width: "35%" }}
                body={idBodyTemplate}
                className="text-xl border-none"
              />

              <Column
                header="Side"
                style={{ width: "200px" }}
                body={buyselltemplate}
                className="text-xl border-none"
              />

              <Column
                header="Execute"
                style={{ width: "200px" }}
                body={executetemplate}
                className="text-xl border-none"
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pvpsellproposals;
