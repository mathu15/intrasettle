import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function WBOAtomicCompleted({ price, data }) {
  const bpriceBodyTemplate = (rowData) => {
    // return <span className='${classname}'> {rowData.price} </span>;
/*
    if (rowData.side === "buyside") {
      return <span className="text-green-500">{rowData.price}</span>;
    } else if (rowData.side === "sellside") {
      return <span className="text-pink-500">{rowData.price}</span>;
    } else return;
*/
    return rowData.price;
  };

  const bamountBodyTemplate = (rowData) => {
    // if (rowData.side === "buyside") {
    //   return rowData.buyamount;
    // } else if (rowData.side === "sellside") {
    //   return rowData.sellamount;
    // } else return;
    return rowData.amount;
  };
  const idBodyTemplate = (rowData) => {
    return rowData.tradeplacedaccountref;
  };


  const dateBodyTemplate = (rowData) => {
    // return formatDate(rowData.updatedAt);
    return (
      <>
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(rowData.updatedAt)}
      </>
    );
  };
  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card border-1 border-100">
          <DataTable
            value={data}
            scrollable
            scrollHeight="350px"
            responsiveLayout="scroll"
            className="text-xl border-none"
          >
            <Column
              field="price"
              header="Sell Price"
              sortable
              style={{ width: "35%" }}
              body={bpriceBodyTemplate}
              className="text-xl border-none"
            />
            <Column
              field="price"
              header="Volume"
              sortable
              style={{ width: "35%" }}
              body={bamountBodyTemplate}
              className="text-xl border-none"
            />
            <Column
              // field="price"
              header="TIME"
              sortable
              style={{ width: "35%" }}
              body={dateBodyTemplate}
              className="text-xl border-none"
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default WBOAtomicCompleted;
