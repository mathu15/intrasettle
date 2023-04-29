import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { IssuanceServiceWBOB } from "./issuanceServiceWBOB";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputNumber } from "primereact/inputnumber";

const WBOAtomicSellOrder = ({ price, chosenpair }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [data, setData] = useState({
    price: price,

    volume: 0,
    total: 0,
  });
  const [data1, setData1] = useState({
    price: price,

    volume: 0,
    total: 0,
  });
  const [brokenpair, setBrokenpair] = useState({
	  first: chosenpair.split('-')[0],
	  second: chosenpair.split('-')[1],
  });
	 

 useEffect(() => {

setBrokenpair({
          first: chosenpair.split('-')[0],
          second: chosenpair.split('-')[1],
  });

  },[chosenpair]);


  const totalvalue = data.price * data.volume;

  console.log("data", data);

	  console.log('pair');
	  console.log(chosenpair);

  const issuanceServiceWBOB = new IssuanceServiceWBOB();
  const placeatomsellorder = async () => {
    var broken = chosenpair.split('-');
    if(broken.length != 2) { alert ('invalid pairname'); }
    issuanceServiceWBOB.placeatomsellorder(chosenpair, broken[0], broken[1], data.price, data.volume);
  };
  const showSuccess = () => {
    toast.success("created successfully", {
      // position: "top-right",
      // autoClose: 5000,
      // hideProgressBar: false,
      // closeOnClick: true,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
      // theme: "colored",
      // theme: "dark",
    });
  };

  const updatetotal = (ourtotal) => {
    console.log(ourtotal);
  };

  const clickAtomSell = () => {
    placeatomsellorder();

    setDisplayBasic(false);
    showSuccess();
    //setData(data1);
  };

  return (
    <div className="card border-2 border-100  grid p-fluid border-red-400">
      <div className="col-12 text-center">
        <div className="flex justify-space-between gap-4 text-center card border-1 border-100 bg-gray-800 text-xl w-full">
          <label style={{ fontSize: "1.2rem" }} htmlFor="amount">
            Price-{brokenpair.second}
          </label>
          <InputNumber
            id="amount"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.value })}
            showButtons
            mode="decimal"
            min={0}
            max={10000000}
            style={{ height: "3rem", fontSize: "1.5rem" }}
            className="p-inputnumber"
          ></InputNumber>
        </div>
        <div className="flex justify-space-between gap-4 text-center card border-1 border-100 bg-gray-800 text-xl w-full">
          <label style={{ fontSize: "1.2rem" }} htmlFor="amount">
            Volume-{brokenpair.first}
          </label>
          <InputNumber
            id="amount"
            value={data.volume}
            onChange={(e) => setData({ ...data, volume: e.value })}
            showButtons
            mode="decimal"
            min={0}
            max={10000000}
            style={{ height: "3rem", fontSize: "1.5rem" }}
            className="p-inputnumber"
          ></InputNumber>
        </div>
        <div className="flex justify-space-between gap-4 text-center card border-1 border-100 bg-gray-800 text-xl w-full">
          <label style={{ fontSize: "1.2rem" }} htmlFor="amount">
            Total-{brokenpair.second}
          </label>
          <InputNumber
            id="amount"
            value={data.total}
            onChange={(e) =>  setData({ ...data, total: e.value })}
            showButtons
            mode="decimal"
            min={0}
            max={10000000}
            style={{ height: "3rem", fontSize: "1.5rem" }}
            className="p-inputnumber"
          ></InputNumber>
        </div>
        <div className="p-5">
          <div className="flex align-items-center justify-content-between">
            <div className="w-6rem text-white font-bold flex align-items-center justify-content-center mr-3">
              <Dialog
                header="Buy {brokenpair.first} for brokenpair.second} "
                visible={displayBasic}
                modal
                onHide={() => setDisplayBasic(false)}
              >
                <Card
                  style={{ marginBottom: "2rem" }}
                  className="transition-colors transition-duration-500 hover:bg-gray-900 "
                >
                  <div className="flex align-items-center ">
                    <div>
                      <p className="text-3xl border-bottom-1 surface-border p-2">
                        At Price {data.price}
                      </p>
                      <p className="text-2xl">Volume {data.volume}</p>
                      <p className="text-2xl">Total {data.total} </p>
                    </div>
                  </div>
                </Card>

                <div className="flex align-items-center ">
                  <Button
                    type="button"
                    // icon="pi pi-minus"

                    label=" CONFIRM SELL"
                    onClick={() => clickAtomSell()}
                  />
                </div>
              </Dialog>
              <ToastContainer
                // position="top-right"
                // autoClose={5000}
                // hideProgressBar={false}
                // newestOnTop={false}
                // closeOnClick
                // rtl={false}
                // pauseOnFocusLoss
                // draggable
                // pauseOnHover
                // theme="colored"
                className="text-2xl"
                style={{ width: "70rem" }}
              />
              <Button onClick={() => setDisplayBasic(true)} label="SELL" className="p-button-danger font-bold" />
              <Button onClick={() => placeatomsellorder() } label="BELL" className="p-button-danger font-bold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WBOAtomicSellOrder;
