import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { IssuanceService } from "../IssuanceService";
import { Satspertoken } from "../../../App/Satspertoken";
import { useToken } from "../../../App/useToken";

// page for displaying chaertdata
// const ConfirmTransferCBTrans = ({ data, setData }) => {

const urlname = "https://sailsg1.thebsv.tech";
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

const CBTDcbdcassets = () => {
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
  const [issuetype, setIssuetype] = useState([]);
  const issuanceservice = new IssuanceService();
  const satspertoken = new Satspertoken();

  const [accountnumber, setAccountnumber] = useState("");
  const [address, setAddress] = useState("");
  const [balances, setBalances] = useState([]);
  const [allassets, setAllassets] = useState([]);
  const usetoken = new useToken();
  const [user, setUser] = useState(usetoken.getUser());

  const balanceupdate = (latest) => {
    issuanceservice.getassetbalances(latest).then((data) => {
      setBalances(data);
    });
  };

  useEffect(() => {
    issuanceservice.getcentralaccount().then((res) => {
      setAccountnumber(res.accountnumber);
    });

    issuanceservice.getallentityassets().then((data) => {
      setAllassets(data);
    });

    balanceupdate(true);
  }, []);

  useEffect(() => {
    //fetch data from api
    const fetchData = async () => {
      const dataset1 = [];
      const dataset2 = [];

      if (balances.balances) {
        balances.balances.forEach((xx) => {
          if (xx.address == user.centraladdress) {
            if (xx.tokens) {
              xx.tokens.forEach((yy) => {
                dataset1.push(
                  satspertoken.satisfy(allassets, yy.symbol, yy.balance)
                );
                dataset2.push(yy.symbol);
              });
            }
          }
        });
      }
      setData({
        labels: dataset2,
        datasets: [
          {
            data: dataset1,
            backgroundColor: ["#1569BB", "#00C6AE", "#36A2EB", "#6B7280"],
            hoverBackgroundColor: ["#1a85ed", "#00f7d9", "#4bb3fa", "#7f8694"],
          },
        ],
      });
      setAmount(dataset1);
      setIssuetype(dataset2);
      console.log("arrData", dataset1, dataset2);
    };

    fetchData();
  }, [balances, allassets, user.centraladdress]);

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
              <p className="border-bottom-1 pb-2 text-3xl">CBDC</p>
              {issuetype.map((cdata, index) => (
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
              <p className="border-bottom-1 pb-2 text-3xl">Total assets</p>
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

export default CBTDcbdcassets;
