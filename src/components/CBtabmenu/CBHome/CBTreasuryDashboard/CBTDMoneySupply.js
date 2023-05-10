import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { IssuanceService } from "../IssuanceService";
import { Satspertoken } from "../../../App/Satspertoken";

// page for displaying chaertdata
// const ConfirmTransferCBTrans = ({ data, setData }) => {

const urlname = "https://sailsg1.thebsv.tech";
function getorganization(related, address) {
  var mm = related.filter((yy) => {
    if (!(yy.centralenable == "disabled" || yy.subenable == "disabled")) {
      if (yy.subentityaddress && yy.subentityaddress.toString() != "") {
        if (yy.subentityaddress == address) return true;
      }
      if (yy.centraladdress && yy.centraladdress.toString() != "") {
        if (yy.centraladdress == address) return true;
      }
    }
  });

  if (mm[0]) {
    return mm[0].organization;
  } else {
    return "NA";
  }
}

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
          return balance.toFixed(2);
        }
}
*/

const CBTDMoneySupply = () => {
  // initail value for chart data

  const [data, setData] = useState();
  // {
  //   labels: ["Digital_$_Frank", "Digital_Euro"],
  //   datasets: [
  //     {
  //       data: [10000.0, 16000.0],
  //       backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
  //       hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
  //     },
  //   ],
  // }
  const [amount, setAmount] = useState([]);
  const [holding, setHolding] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [holdingsymbol, setHoldingsymbol] = useState("");
  const [accountowners, setAccountowners] = useState([]);
  const [assets, setAssets] = useState([]);
  const [allassets, setAllassets] = useState([]);
  const [balances, setBalances] = useState([]);

  const issuanceservice = new IssuanceService();
  const satspertoken = new Satspertoken();

  useEffect(() => {
    issuanceservice.getassets().then((data) => {
      if (data[0]) {
        setHoldingsymbol(data[0].issuetype);
      }
      setAssets(data);
    });

    issuanceservice.getallentityassets().then((data) => {
      setAllassets(data);
    });

    issuanceservice.getaccountowners().then((data) => {
      setAccountowners(data.list);
    });
    balanceupdate("true");
  }, []);

  const balanceupdate = (latest) => {
    issuanceservice.getassetbalances(latest).then((data) => {
      setBalances(data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      var dataset1 = [];
      var dataset2 = [];

      try {
        if (balances.balances) {
          balances.balances.forEach((xx) => {
            if (xx.tokens) {
              xx.tokens.forEach((kk) => {
                if (kk && kk.symbol == holdingsymbol) {
                  console.log(kk.balance);
                  var org = getorganization(accountowners, xx.address);
                  console.log(org);
                  dataset1.push(
                    satspertoken.satisfy(assets, kk.symbol, kk.balance)
                  );
                  dataset2.push(org);
                }
              });
            }
          });
        }

        console.log(dataset1);
        console.log(dataset2);

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
        setHolding(dataset2);
        console.log("arrData", dataset1, dataset2);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [assets, balances, accountowners, holdingsymbol]);

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

  // const dataset3 = [];

  // for (const val of data) {
  //   dataset3.push(val.amount);
  // }

  // console.log(dataset3);
  // const value = amount.reduce((a, b) => a + b, 0);
  // console.log(value);
  return (
    <>
      <div className="col-12 ">
        <div className="grid p-fluid">
          <div className="col-12 md:col-6 ">
            <div className="card border-1 border-300 bg-gray-800  mt-3 card-w-title">
              <p className="border-bottom-1 pb-2 text-3xl">Holder</p>
              {holding.map((cdata, index) => (
                <div className="list-disc">
                  <li className="text-2xl pb-2" key={index}>
                    {cdata}{" "}
                  </li>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 md:col-6 ">
            <div className="card bg-gray-800  mt-3  card-w-title">
              <p className="border-bottom-1 pb-2 text-3xl">{holdingsymbol}</p>
              {amount.map((cdata, index) => (
                <div className="list-disc">
                  <li className="text-2xl pb-2" key={index}>
                    {cdata}{" "}
                  </li>
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
            width: "30%",
            justifyContent: "center",
          }}
        />
      </div>
    </>
  );
};

export default CBTDMoneySupply;
