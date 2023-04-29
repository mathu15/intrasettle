import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Satspertoken } from "../../App/Satspertoken";

import { WB01IssuanceService } from "./WB01IssuanceService";

const WBCBDCAssets = ({ transactionhappened }) => {
  const [data, setData] = useState();

  const [amount, setAmount] = useState([]);
  const [issuetype, setIssuetype] = useState([]);
  const [accountnumber, setAccountnumber] = useState("");

  var issuanceservice = new WB01IssuanceService();
  var satspertoken = new Satspertoken();

  useEffect(() => {
    if (accountnumber != "") {
      issuanceservice
        .getbalancefromaccountnumber(accountnumber)
        .then((res) => {});
    }
  }, [accountnumber]);

  useEffect(() => {
    //fetch data from api
    const fetchData = async () => {
      //const url = "https://sailsg1.thebsv.tech/centralbank/getbalance/CAC-SUB901-0001";
      //const url = "https://thebsv.tech/centralbank/getassets";
      const dataset1 = [];
      const dataset2 = [];
      /*
      await fetch(url)
        .then((data) => {
          console.log("api data", data);
          const res = data.json();
          return res;
        })
	    */

      issuanceservice
        .getsubscribebankbalance()
        .then((res) => {
          setAccountnumber(res.accountnumber);
          console.log("ress", res.balance);
          for (const val of res.balance) {
            dataset1.push(satspertoken.wrap(val.satspertoken, val.amount));
            dataset2.push(val.issuetype);
          }
          setData({
            labels: dataset2,
            datasets: [
              {
                data: dataset1,
                backgroundColor: ["#1569BB", "#00C6AE", "#36A2EB", "#6B7280"],
                hoverBackgroundColor: [
                  "#1a85ed",
                  "#00f7d9",
                  "#4bb3fa",
                  "#7f8694",
                ],
              },
            ],
          });
          setAmount(dataset1);
          setIssuetype(dataset2);
          console.log("arrData", dataset1, dataset2);
        })
        .catch((e) => {
          console.log("error", e);
        });
    };
    fetchData();
  }, [transactionhappened]);
  const [lightOptions] = useState({
    indexAxis: "x",
    elements: {
      doughnut: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#eee",
        },
      },
      title: {
        display: true,
        text: "",
        color: "#eee",
      },
    },
  });

  return (
    <>
      <div className="col-12 ">
        <div className="grid p-fluid">
          <div className="col-12 md:col-6 ">
            <div className="card border-1 border-300 bg-gray-800  mt-3 card-w-title">
              <p className="border-bottom-1 pb-2 text-3xl">CBDC</p>
              {issuetype.map((cdata, index) => (
                <div className="list-disc" key={index}>
                  <li className="text-2xl pb-2">{cdata} </li>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 md:col-6 ">
            <div className="card bg-gray-800  mt-3  card-w-title">
              <p className="border-bottom-1 pb-2 text-3xl">Total assets</p>
              {amount.map((cdata, index) => (
                <div className="list-disc" key={index}>
                  <li className="text-2xl pb-2">{cdata} </li>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="  flex flex-column align-items-center ">
        <Chart
          type="doughnut"
          data={data}
          options={lightOptions}
          style={{
            position: "relative",
            width: "60%",
            justifyContent: "center",
          }}
        />
      </div>
    </>
  );
};

export default WBCBDCAssets;
