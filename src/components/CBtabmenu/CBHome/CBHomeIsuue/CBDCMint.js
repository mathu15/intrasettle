import React, { useState, useEffect } from "react";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { IssuanceService } from "../IssuanceService";

import { Satspertoken } from "../../../App/Satspertoken";

import { Calendar } from "primereact/calendar";
import { NavLink } from "react-router-dom";
import * as _ from "lodash";

/*
function satisfy( assets, symbol, balance) {
        console.log(assets);
        var pp = assets.filter(xx=>{
          if(xx.issuetype == symbol) return true;
        });
       console.log(pp);
       console.log(symbol);
        if(pp[0] && Number.isInteger(pp[0].satspertoken)) {
          return (balance/pp[0].satspertoken).toFixed(2);
        } else {
          return (balance/1).toFixed(2);
        }
}
*/
const CBDCMint = ({
  accountowners,
  transactionhappened,
  setTransactionhappened,
}) => {
  const [data, setData] = useState(null);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  //    const [accountowners, setAccountowners] = useState([]);

  const statuses = ["coinbase", "issue"];
  const issuanceservice = new IssuanceService();

  useEffect(() => {
    //fetch the asset data from api
    // const url = "https://thebsv.tech/centralbank/getassets";
    issuanceservice.getentitytransactions().then((json) => {
      console.log("json", json);
      const forsorting = _.uniqBy(json.transactions, "transactionid"); //json.transactions;
      var last = _.sortBy(forsorting, "updatedat").reverse();
      setData(last);
      setLoading(false);
    });

    initFilters();
  }, [transactionhappened, accountowners]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // const formatDate = (value) => {
  //   return value.toLocaleDateString("en-US", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });
  // };

  const formatCurrency = (value) => {
    return value.toFixed(2);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      symbol: {
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
      fromaccountnumber: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      issuer: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      representative: { value: null, matchMode: FilterMatchMode.IN },
      createdat: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      updatedat: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      amount: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      operation: {
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
    return (
      <>
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(rowData.updatedat)}
      </>
    );
  };
  const dateBodyTemplate1 = (rowData) => {
    return (
      <>
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(rowData.createdat)}
      </>
    );
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
    return formatCurrency(rowData.amount);
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

  const operationBodyTemplate = (rowData) => {
    return rowData.operation;
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

  const txidBodyTemplate = (rowData) => {
    var linktostas =
      "https://taalnet.whatsonchain.com/tx/" + rowData.transactionid;
    return (
      <span className={`customer-badge status-${rowData.type}`}>
        <a href={linktostas} target="_blank">
          {rowData.transactionid}
        </a>
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
  const fromBodytemplate = (rowData) => {
    var accountname = issuanceservice.findaccountowner(
      accountowners,
      rowData.fromaccountnumber
    );
    return (
      <span
        className={`customer-badge fromaccountnumber-${rowData.fromaccountnumber}`}
      >
        <p> {accountname} </p>
      </span>
    );
  };

  const toBodytemplate = (rowData) => {
    var accountname = issuanceservice.findaccountowner(
      accountowners,
      rowData.toaccountnumber
    );

    return (
      <span
        className={`customer-badge toaccountnumber-${rowData.toaccountnumber}`}
      >
        <p> {accountname} </p>
      </span>
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
              field="symbol"
              header="Token Name"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field={fromBodytemplate}
              header="From"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field={toBodytemplate}
              header="To"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              field={txidBodyTemplate}
              header="Transaction id"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />

            <Column
              header="Issue Date"
              filterField="createdat"
              dataType="date"
              style={{ minWidth: "10rem" }}
              body={dateBodyTemplate1}
              filter
              filterElement={dateFilterTemplate}
            />
            <Column
              header="Transaction Date"
              filterField="updatedat"
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
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default CBDCMint;
