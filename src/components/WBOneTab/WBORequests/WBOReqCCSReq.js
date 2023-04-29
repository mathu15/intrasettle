import React, { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";

import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";

const WBOReqCCSReq = () => {
  const [displayBasic, setDisplayBasic] = useState();
  // assets requested from wholesale bank with details
  const [data, setData] = useState({
    approved: true,
    requested: true,
    denied: true,
    failed: true,
    party: "O-WHOLESALETWO, L=LONDON, C=GB ",
    cbdc_name: "Digital_pound",
    request_id: 1000,
    amount: 25000000,
    bonds: 25000000,
  });
  const header = (
    <div className="flex-column">
      <p>Requesting Party:{data.party}</p>
    </div>
  );

  console.log("data", data);
  return (
    <>
      <h5 className="text-2xl text-center">CBDC Issuance Requests</h5>
      <div className="flex text-center justify-content-center pt-3">
        <div className="flex align-items-center justify-content-center">
          <label
            className="text-2xl pr-3"
            htmlFor="Approved"
            style={{ display: "inline-block" }}
          >
            Approved
          </label>
          <InputSwitch
            id="Approved"
            checked={data.approved}
            onChange={(e) => setData({ ...data, approved: e.value })}
          />
        </div>
        <div className="flex align-items-center justify-content-center">
          <label
            className="text-2xl pr-3 pl-5"
            htmlFor="Requested"
            style={{ display: "inline-block" }}
          >
            Requested
          </label>
          <InputSwitch
            id="Requested"
            checked={data.requested}
            onChange={(e) => setData({ ...data, requested: e.value })}
          />
        </div>
        <div className="flex align-items-center justify-content-center">
          <label
            className="text-2xl pr-3 pl-5"
            htmlFor="Denied"
            style={{ display: "inline-block" }}
          >
            Denied
          </label>
          <InputSwitch
            id="Denied"
            checked={data.denied}
            onChange={(e) => setData({ ...data, denied: e.value })}
          />
        </div>
        <div className="flex align-items-center justify-content-center">
          <label
            className="text-2xl pr-3 pl-5"
            htmlFor="Failed"
            style={{ display: "inline-block" }}
          >
            Failed
          </label>
          <InputSwitch
            id="Failed"
            checked={data.failed}
            onChange={(e) => setData({ ...data, failed: e.value })}
          />
        </div>
      </div>
      <div className="flex text-center justify-content-center pt-3">
        <div className="text-center pt-3">
          <div>
            <Dialog
              visible={displayBasic}
              modal
              onHide={() => setDisplayBasic(false)}
            >
              <Card style={{ cursor: "pointer" }}>
                <div className="flex-column align-items-center justify-content-center">
                  <div className=" align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
                    <p className="text-center text-2xl ">
                      Resolve Issuance :Requested
                    </p>
                  </div>
                  <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
                    <p className=" text-center text-2xl font-bold text-blue-300 mr-3">
                      Request ID:{data.request_id}
                    </p>
                    <p className=" text-center text-2xl font-bold text-blue-300 mr-3">
                      Requesting Party:{data.party}
                    </p>
                    <p className=" text-center text-2xl font-bold text-blue-300 mr-3">
                      CBDC Name:{data.cbdc_name}
                    </p>
                    <p className=" text-center text-2xl font-bold text-blue-300 mr-3">
                      Amount:{data.amount}
                    </p>

                    <p className="text-center text-2xl">
                      value in bonds:{data.bonds}
                    </p>
                  </div>
                </div>
                <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
                  <Button
                    type="button"
                    label="Approve"
                    onClick={() => setDisplayBasic(false)}
                    icon="pi pi-thumbs-up-fill"
                    style={{
                      marginTop: "2rem",
                      marginLeft: "2rem",
                      width: "20rem",
                    }}
                  />
                  <Button
                    type="button"
                    label="Deny"
                    onClick={() => setDisplayBasic(false)}
                    icon="pi pi-stop-circle"
                    style={{
                      marginTop: "2rem",
                      marginLeft: "2rem",
                      width: "20rem",
                    }}
                  />
                  <Button
                    type="button"
                    label="Hide"
                    onClick={() => setDisplayBasic(false)}
                    icon="pi pi-minus"
                    style={{
                      marginTop: "2rem",
                      marginLeft: "2rem",
                      width: "20rem",
                    }}
                  />
                </div>
              </Card>
            </Dialog>

            {/* <div className="flex ">
            <div className="w-15  ml-6"> */}

            {/* </div>
          </div> */}
            {/* <Button
            type="button"
            label={data.party}
            className="p-button-outlined p-button-secondary"
            icon="pi pi-angle-down"
            onClick={() => setDisplayBasic(true)}
          /> */}
          </div>
          <Accordion>
            <AccordionTab header={header}>
              <div className="card flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
                <p className="  text-2xl font-bold text-blue-300 mr-3">
                  CBDC Name:{data.cbdc_name}
                </p>
                <p className=" text-2xl">Amount:{data.amount}</p>
                <p className=" text-2xl">Status:Approved</p>
              </div>
              <i
                className="pi text-2xl pi-thumbs-up-fill text-blue-500 cursor-pointer"
                onClick={() => setDisplayBasic(true)}
              ></i>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default WBOReqCCSReq;
