import React, { useState } from "react";
import { Chart } from "primereact/chart";

const WBOTreaCBDCAssets = () => {
  // initial chart data
  const [chartData] = useState({
    labels: ["Digital_Pound", "Digital_Dollar", "Digital_Euro"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#21618C", "#48C9B0", "#36A2EB"],
        hoverBackgroundColor: ["#21618C", "#48C9B0", "#36A2EB"],
      },
    ],
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        position: "right",

        labels: {
          color: "#eee",
        },
      },
    },
  });

  return (
    <div className="grid-column ">
      <div className="grid justify-content-around">
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0 text-center">
            <div className="text-900 text-center font-medium text-2xl mb-3">
              CBDC Types in Vault
            </div>

            <span className="text-green-500 text-center font-medium text-2xl">
              3{" "}
            </span>
          </div>
        </div>
        <div className="col-12 lg:col-6 xl:col-3">
          <div className="card mb-0  text-center">
            <div className="text-900 font-medium  text-center text-xl mb-3">
              Total Assets in Vault
            </div>

            <span className="text-green-500 font-medium  text-center text-xl">
              50,000,000.000{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="col-12 ">
        <div className="card flex flex-column align-items-center">
          <Chart
            type="doughnut"
            data={chartData}
            options={lightOptions}
            style={{
              position: "relative",
              width: "30%",
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WBOTreaCBDCAssets;
