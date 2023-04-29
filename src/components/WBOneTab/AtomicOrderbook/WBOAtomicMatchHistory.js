import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function WBOAtomicMatchHistory({ buy, sell }) {
  const spriceBodyTemplate = (rowData) => {
    return <span className="text-red-400"> {rowData.sellprice} </span>;
  };

  const samountBodyTemplate = (rowData) => {
    return rowData.sellamount;
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
              value={sell}
              scrollable
              scrollHeight="350px"
              responsiveLayout="scroll"
              className="text-xl border-none"
            >
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
                header="Time"
                field="createdAt"
                dataType="date"
                style={{ width: '200px' }}
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

export default WBOAtomicMatchHistory;
