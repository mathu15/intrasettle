import React, { useState, useEffect } from "react";

import { DataTable } from 'primereact/datatable';
import { Button } from "primereact/button";
import { IssuanceServiceWBOB } from "./issuanceServiceWBOB";

import { Column } from 'primereact/column';
import * as _ from 'lodash';
function Pvpbuyproposals({ user, buy, sell, chosenpair, setOrderplacedbuy, setOrderplacedsell }) {
 const [modifiedbuy, setModifiedbuy] = useState([]);
 const [consideredsell, setConsideredsell] = useState([]);

 useEffect(() => {
  var tmpdata = buy.filter(xx => {
         if(user.subcentralaccountnumber == xx.specificaccountnumber ) return true;
    if(user.subcentralaccountnumber == xx.buyaccountnumber ) return true;

  });
  setModifiedbuy( tmpdata);

  }, [buy, sell, consideredsell]);


 useEffect(() => {
  var tmpdata = sell.filter(xx => {
    if(user.subcentralaccountnumber == xx.sellaccountnumber ) return true;
  });
         // consider buys only from this user
  setConsideredsell( tmpdata);
  }, [ sell]);


    const issuanceServiceWBOB = new IssuanceServiceWBOB();

  const acceptatombuyorder = async (rowData) => {

    var chosenpair = rowData.pairname;
    var  first =  chosenpair.split('-')[0];
    var  second= chosenpair.split('-')[1];

    var price = rowData.buyprice;
    var amount = rowData.buyamount
    var prepared = rowData.prepared;

    var ret = await issuanceServiceWBOB.acceptatombuyorder(chosenpair, rowData, first, second, price, amount);
   
          console.log(ret);
    if(ret && (ret.code == -1) ) {

     ret = await issuanceServiceWBOB.acceptatombuyorder(chosenpair, rowData, first, second, price, amount);
    }
           setOrderplacedbuy(true);

      if(_.has(ret, 'code')) {
          if(ret.code == 0) {
                alert('Accept success');
          }else {
                alert('Accept failed');
                  return;
          }
      }


  };

  const rejectatombuyorder = async (rowData) => {

    var chosenpair = rowData.pairname;
    var  first =  chosenpair.split('-')[0];
    var  second= chosenpair.split('-')[1];

    var price = rowData.buyprice;
    var amount = rowData.buyamount
    var prepared = rowData.prepared;

    var ret = await issuanceServiceWBOB.rejectatombuyorder(chosenpair, rowData, first, second, price, amount);
   
          console.log(ret);
    if(ret && ret.code == -1) {

     ret = await issuanceServiceWBOB.rejectatombuyorder(chosenpair, rowData, first, second, price, amount);
    }
           setOrderplacedbuy(true);


      if(_.has(ret, 'code')) {
          if(ret.code == 0) {
                alert('Reject success');
          }else {
                alert('Reject failed');
                  return;
          }
      }

        if(_.has(ret, 'error')) {
                /*
                 *
                "side": "atomicbuyside",
                "needed": 190,
                "neededsymbol": "Digital_INR",
                "error": "failed to prepare"
                 * */

                alert('Reject failed');
                 return;
        }

      if(_.has(ret, 'transactionid')) {
                alert('Reject success');
       }


  };

  const spriceBodyTemplate = (rowData) => {
    return <span className="text-red-400"> {rowData.buyprice} </span>;
  };

  const pairnameBodyTemplate = (rowData) => {
    return <span className="text-red-400"> {rowData.pairname} </span>;
  };


   const preparematchforatombuyorder = async (rowData) => {

    var  first =  chosenpair.split('-')[0];
    var  second= chosenpair.split('-')[1];
       var price = rowData.buyprice;
    var volume = rowData.buyamount;

	    var ret = await issuanceServiceWBOB.placeatomsellorder('',                                       
                chosenpair, first, second , price, volume);
          console.log(ret);

    if(ret && ret.code == -1) {
     ret = await issuanceServiceWBOB.placeatomsellorder('', 
                chosenpair, first, second , price, volume);
    }

    setOrderplacedsell(true);

      if(_.has(ret, 'code')) {
          if(ret.code == 0) {
                alert('Prepare success');
          }else {
                alert('Prepare failed');
                  return;
          }
      }

        if(_.has(ret, 'error')) {
                /*
                 *
                "side": "atomicbuyside",
                "needed": 190,
                "neededsymbol": "Digital_INR",
                "error": "failed to prepare"
                 * */

	 alert('Prepare failed : needed ' +ret.needed + ' ' + ret.neededsymbol + ' check balance in trading account');
                 return;
        }
      if(_.has(ret, 'transactionid')) {
                alert('Prepare success');
       }

   };

   const cancelthis = async (rowData) => {

    var chosenpair = rowData.pairname;
    var  first =  chosenpair.split('-')[0];
    var  second= chosenpair.split('-')[1];

    var price = rowData.buyprice;
    var amount = rowData.buyamount
    var prepared = rowData.prepared;

    var ret = await issuanceServiceWBOB.canceloneprepare(chosenpair, rowData, first, second, price, amount);

          console.log(ret);
    if(ret && ret.code == -1) {

     ret = await issuanceServiceWBOB.canceloneprepare(chosenpair, rowData, first, second, price, amount);
    }
           setOrderplacedbuy(true);


      if(_.has(ret, 'code')) {
          if(ret.code == 0) {
                alert('Cancel success');
          }else {
                alert('Cancel failed');
                  return;
          }
      }

        if(_.has(ret, 'error')) {
                /*
                 *
                "side": "atomicbuyside",
                "needed": 190,
                "neededsymbol": "Digital_INR",
                "error": "failed to prepare"
                 * */

                alert('Cancel failed');
                 return;
        }

     if(_.has(ret, 'txid')) {
                alert('Cancel success');
      }


  };



  const buyselltemplate = (rowData) => {
    return (rowData.side=='atomicbuyside')?'BUY' : 'SELL';

  };

  const anyprepared = (rowdata) => {
	  console.log(consideredsell);
        var anyfound = consideredsell.filter(xx=> {
           if(xx.sellprice == rowdata.buyprice &&
           xx.sellamount == rowdata.buyamount ) return true;
	});

	  console.log(anyfound);
	  console.log(rowdata);
	  if(anyfound.length > 0) return( true);
	  else return false;
  };

  const executetemplate = (rowData) => {

    if(user.subcentralaccountnumber == rowData.buyaccountnumber ) {
    return (
          <div className="flex align-items-center gap-2">
                <Button label="Cancel" icon="pi " onClick={() => cancelthis(rowData)                             } />
            </div>
     )
    }else if(user.subcentralaccountnumber == rowData.specificaccountnumber ) {
	    
         if(anyprepared(rowData) == true) {
           return (
          <div className="flex align-items-center gap-2">
                <Button label="Accept" icon="pi " onClick={() => acceptatombuyorder(rowData)                             } />
                <Button label="Reject" icon="pi " onClick={() => rejectatombuyorder(rowData)                             } />
            </div>
            )

	 } else {
           return (
          <div className="flex align-items-center gap-2">
                <Button label="Prepare" icon="pi " onClick={() => preparematchforatombuyorder(rowData)                             } />
                <Button label="Reject" icon="pi " onClick={() => rejectatombuyorder(rowData)                             } />
            </div>
            )
	 }

    }

  };


  const samountBodyTemplate = (rowData) => {
    return rowData.buyamount;
  };
  const dateBodyTemplate1 = (rowData) => {
    return (
      <>
        {new Intl.DateTimeFormat('en-US', {
          // year: 'numeric',
          // month: '2-digit',
          // day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(rowData.createdAt)}
      </>
    );
  };

    const idBodyTemplate = (rowData) => {
    return rowData.buyaccountnumber?rowData.buyaccountnumber: rowData.sellaccountnumber;
  };


  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card border-1 border-100  ">
          <div className="flex ml-1">
            <DataTable
              value={modifiedbuy}
              scrollable
              scrollHeight="350px"
              responsiveLayout="scroll"
              className="text-xl border-none"
            >

	    <Column
                field="price"
                header="Pair"
                sortable
                style={{ width: '55%' }}
                body={pairnameBodyTemplate}
                rows={5}
                className="text-xl border-none "
              />

              <Column
                field="price"
                header="Price"
                sortable
                style={{ width: '35%' }}
                body={spriceBodyTemplate}
                rows={5}
                className="text-xl border-none "
              />
              <Column
                field="price"
                header="Volume"
                sortable
                style={{ width: '35%' }}
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
                style={{ width: '200px' }}
                body={buyselltemplate}
                className="text-xl border-none"
              />

	    <Column
                header="Execute"
                style={{ width: '200px' }}
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

export default Pvpbuyproposals;