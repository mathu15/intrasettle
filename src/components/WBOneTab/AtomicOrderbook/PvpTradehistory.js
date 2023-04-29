import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function PvpTradehistory({ transactionstraded , buy, sell }) {
  const spriceBodyTemplate = (rowData) => {
    return <span className="text-red-400"> {rowData.price} </span>;
  };

  const sellamountBodyTemplate = (rowData) => {
    if(rowData.sellamount > 0) {
      return rowData.sellamount;
    } else  {
      return rowData.buyamount * rowData.price
    }
  };
  const buyamountBodyTemplate = (rowData) => {
    if(rowData.buyamount > 0) {
      return rowData.buyamount;
    } else  {
      return rowData.sellamount * rowData.price
    }
  };

  const buysymbolBodyTemplate = (rowData) => {
    return rowData.buyissuetype;
  };
  const sellsymbolBodyTemplate = (rowData) => {
    return rowData.sellissuetype;
  };
  const txidBodyTemplate = (rowData) => {

	    var linktostas = "https://taalnet.whatsonchain.com/tx/"+rowData.transactionid;
    if(rowData.placedstatus == 'completed') {
    return (
      <span className={`customer-badge status-${rowData.type}`}>
        <a href={linktostas} target="_blank" >
          Link
        </a>
      </span>
    );
    } else {
	 return rowData.transactionid;
    }


  };
  const statusBodyTemplate = (rowData) => {
    return rowData.placedstatus;
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

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card border-1 border-100  ">
          <div className="flex ml-1">
            <DataTable
              value={transactionstraded}
              scrollable
              scrollHeight="350px"
              responsiveLayout="scroll"
              className="text-xl border-none"
            >
	    <Column
                header="Sell symbol"
                sortable
                style={{ width: '35%' }}
                body={sellsymbolBodyTemplate}
                rows={5}
                className="text-xl border-none "
              />
	    <Column
                header="Sell amount"
                sortable
                style={{ width: '35%' }}
                body={sellamountBodyTemplate}
                rows={5}
                className="text-xl border-none "
              />



	    <Column
                header="Buy symbol"
                sortable
                style={{ width: '35%' }}
                body={buysymbolBodyTemplate}
                rows={5}
                className="text-xl border-none "
              />

     <Column
                header="Buy amount"
                sortable
                style={{ width: '35%' }}
                body={buyamountBodyTemplate}
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
                header="Transaction id"
                sortable
                style={{ width: '35%' }}
                body={txidBodyTemplate}
                rows={5}
                className="text-xl border-none"
              />
	      <Column
                header="Status "
                sortable
                style={{ width: '35%' }}
                body={statusBodyTemplate}
                rows={5}
                className="text-xl border-none"
              />

	   <Column
              // field="price"
              header="Time"
              sortable
              style={{ width: "35%" }}
              body={dateBodyTemplate1}
              className="text-xl border-none"
            />


            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PvpTradehistory;
