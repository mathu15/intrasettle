import React, { useState, useEffect } from "react";

import "../../../../components/dropdown.css";
import { Button } from "primereact/button";
// select the wholesale bank to transfer asset
const WBOFxReqSelectExRate = ({ data, setData }) => {
  const text = data.assetid.label;
  const myArray = text.split(",");
  const text1 = data.assetid1.label;
  const myArray1 = text1.split(",");

  // useEffect(() => {
  //   //fetch data from api
  //   const fetchData = async () => {
  //     const url = "https://api.exchangerate.host/latest?base=USD&symbols=AUD";

  //     await fetch(url)
  //       .then((data) => {
  //         console.log("api data", data);
  //         const res = data.json();
  //         return res;
  //       })
  //       .then((res) => {
  //         console.log("ress", res.rates);
  //         setExrate(res.rates.AUD);
  //       })
  //       .catch((e) => {
  //         console.log("error", e);
  //       });
  //   };
  //   fetchData();
  // }, []);

  const getRate = async (first, second) => {
    const url = `https://api.exchangerate.host/latest?base=${first}&symbols=${second}`;

    await fetch(url)
      .then((data) => {
        console.log("api data", data);
        const res = data.json();
        return res;
      })
      .then((res) => {
        console.log("ress", res.rates);
        setData({ ...data, rate: res.rates });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  // getRate(myArray[2], myArray1[2]);
  // const rateee=((({data.rate[`${myArray1[2]}`]})))
  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">
        <div className="text-center text-xl">
          <Button
            onClick={() => {
              getRate(myArray[2], myArray1[2]);
            }}
            label="GET RATE"
            className="w-6rem"
          />
          <p className="text-center text-2xl">
            Exchange Rate between {myArray[2]} and {myArray1[2]} =
            {data.rate[`${myArray1[2]}`]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WBOFxReqSelectExRate;
