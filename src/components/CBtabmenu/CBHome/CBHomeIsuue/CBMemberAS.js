import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const CBMemberAS = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //fetch the asset data from api
    const url = "https://thebsv.tech/centralbank/getassets";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        setData(json);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  return (
    <div>
      <div className="card ">
        <DataTable value={data} responsiveLayout="scroll">
          <Column field="startdate" header="Transaction Date"></Column>
          <Column field="category" header="Tx Type"></Column>
          <Column field="issuetype" header="Token name"></Column>
          <Column field="amount" header="Amount"></Column>
          <Column field="count" header="Usage count"></Column>
          <Column field="issuer" header="Initiator"></Column>
          <Column field="counterparty" header="counter Party"></Column>
          <Column field="createdAt" header="Tx Time"></Column>
          <Column field="enddate" header="Issue Date"></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default CBMemberAS;
