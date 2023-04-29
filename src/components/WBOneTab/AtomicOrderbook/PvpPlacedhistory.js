import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function PvpPlacedhistory({ transactionsplaced , buy, sell }) {
  const spriceBodyTemplate = (rowData) => {
    return <span className="text-red-400"> {rowData.price} </span>;
  };

  const sellamountBodyTemplate = (rowData) => {
    if(rowData.side == 'atomicsellside') return rowData.amount;
    if(rowData.side == 'atomicbuyside') return 0;
  };
  const buyamountBodyTemplate = (rowData) => {
    if(rowData.side == 'atomicsellside') return 0;
    if(rowData.side == 'atomicbuyside') return rowData.amount;
  };

  const buysymbolBodyTemplate = (rowData) => {
    return rowData.buyissuetype;
  };
  const sellsymbolBodyTemplate = (rowData) => {
    return rowData.sellissuetype;
  };
  const txidBodyTemplate = (rowData) => {
    return <span className="text-red-400"> {rowData.transactionid} </span>;
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
              value={transactionsplaced}
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

export default PvpPlacedhistory;
