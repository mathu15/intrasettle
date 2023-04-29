import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const lineData = {
  labels: ["1.00", "2.00", "3.00", "4.00", "5.00", "6.00", "7.00"],
  datasets: [
    {
      label: "Balance over time for:INR_CASH",
      data: [10000000, 9800000, 8500000, 7000000, 10000000],
      fill: false,
      backgroundColor: "#48C9B0",
      borderColor: "#48C9B0",
      tension: 0,
    },
  ],
};

const WTreauryBOT = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //fetch the asset data from api
    const url = "https://sailsg1.thebsv.tech/centralbank/getassets";
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

  const lineOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#eee",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#eee",
        },
        grid: {
          color: "rgba(160, 164, 181, .9)",
        },
      },
      y: {
        ticks: {
          color: "#eee",
        },
        grid: {
          color: "rgba(160, 167, 181, .9)",
        },
      },
    },
  };

  return (
    <div className="flex align-items-center justify-content-around">
      <div className="card">
        <h5>CBDC types on the network</h5>
        {data.map((cdata) => (
          <div className="flex-column justify-content-center  card-container yellow-container">
            <div className="border-round bg-blue-100 w-12rem h-6rem p-3 m-3">
              <div
                className="flex-column transition-colors transition-duration-500 bg-blue-500 hover:bg-yellow-500 text-white hover:text-gray-900
 cursor-pointer text-center h-full w-auto border-round bg-blue-500 text-white font-bold p-3 flex align-items-center justify-content-center"
              >
                <p> {cdata.issuetype}</p>
                <p> {cdata.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card col-12 lg:col-9 ">
        <Chart
          type="line"
          data={lineData}
          options={lineOptions}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default WTreauryBOT;
