import React, { useState, useEffect } from "react";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

import { Calendar } from "primereact/calendar";

const MintedCBDC = () => {
  const [data, setData] = useState(null);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);

  const statuses = ["coinbase", "issue"];

  useEffect(() => {
    //fetch the asset data from api
    // const url = "https://thebsv.tech/centralbank/getassets";
    const urll =
      "https://thebsv.tech/centralbank/gettransactions/CAC-ENT901-0001";
    fetch(urll)
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        setData(getCustomers(json.issuertrans.centralissuetrans));
        // .issuertrans.centralissuetrans
        setLoading(false);
      })
      .catch((e) => {
        console.log("e", e);
      });
    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   useEffect(() => {
  //     //fetch the asset data from api
  //     const url = "https://thebsv.tech/centralbank/getassets";
  //     const urll =
  //       "https://thebsv.tech/centralbank/gettransactions/CAC-ENT901-0001";
  //     fetch(urll)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         console.log("json", json);
  //         setData(getCustomers(json.issuertrans.centralissuetrans));
  // setLoading(false);
  //       })
  //       .catch((e) => {
  //         console.log("e", e);
  //       });
  // initFilters();
  //   }, []);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      issuetype: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      assetid: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      toaccountnumber: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      issuer: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      representative: { value: null, matchMode: FilterMatchMode.IN },
      createdAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      updatedAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      amount: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      count: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activitytype: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
  };

  const dateBodyTemplate = (rowData) => {
    return <>{rowData.updatedAt}</>;
  };
  const dateBodyTemplate1 = (rowData) => {
    return <>{rowData.createdAt}</>;
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const balanceBodyTemplate = (rowData) => {
    return  rowData.amount ; //formatCurrency(rowData.amount);
  };

  const balanceFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        // mode="currency"
        // currency="USD"
        // locale="en-US"
      />
    );
  };

  const countBodyTemplate = (rowData) => {
    return rowData.count;
  };

  const countFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        // mode="currency"
        // currency="USD"
        // locale="en-US"
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.type}`}>
        {rowData.activitytype}
      </span>
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter "
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <DataTable
            value={data}
            paginator
            className="p-datatable-gridlines text-2xl"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters}
            filterDisplay="menu"
            loading={loading}
            responsiveLayout="scroll"
            emptyMessage="No customers found."
            // style={{ fontSize: "1.4rem" }}
          >
            <Column
              field="issuetype"
              header="Token Name"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="assetid"
              header="Assetid"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="issuer"
              header="Initiator"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field="toaccountnumber"
              header="Account"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />

            <Column
              header="Issue Date"
              filterField="createdAt"
              dataType="date"
              style={{ minWidth: "10rem" }}
              body={dateBodyTemplate1}
              filter
              filterElement={dateFilterTemplate}
            />
            <Column
              header="Transaction Date"
              filterField="updatedAt"
              dataType="date"
              style={{ minWidth: "10rem" }}
              body={dateBodyTemplate}
              filter
              filterElement={dateFilterTemplate}
            />
            <Column
              header="Amount"
              filterField="amount"
              dataType="numeric"
              style={{ minWidth: "10rem" }}
              body={balanceBodyTemplate}
              filter
              filterElement={balanceFilterTemplate}
            />
            <Column
              field="activitytype"
              header="Tx Type"
              filterMenuStyle={{ width: "14rem" }}
              style={{ minWidth: "12rem" }}
              body={statusBodyTemplate}
              filter
              filterElement={statusFilterTemplate}
            />
            <Column
              header="Usage Count"
              filterField="count"
              dataType="numeric"
              style={{ minWidth: "10rem" }}
              body={countBodyTemplate}
              filter
              filterElement={countFilterTemplate}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default MintedCBDC;
