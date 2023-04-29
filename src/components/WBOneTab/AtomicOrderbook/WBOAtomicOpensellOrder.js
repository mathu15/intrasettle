import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function WBOAtomicOpensellOrder({ price, data }) {
  const bpriceBodyTemplate = (rowData) => {
    return <span className="text-green-400"> {rowData.buyprice} </span>;
  };

  const bamountBodyTemplate = (rowData) => {
    return rowData.buyamount;
  };
  const idBodyTemplate = (rowData) => {
    return rowData.buyaccountnumber;
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
              header="ID"
              sortable
              style={{ width: "35%" }}
              body={idBodyTemplate}
              className="text-xl border-none"
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default WBOAtomicOpensellOrder;
