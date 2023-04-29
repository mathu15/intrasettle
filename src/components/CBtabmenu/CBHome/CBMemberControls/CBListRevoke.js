import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const CBListRevoke = () => {
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
  const header = (
    <div className="flex-column">
      <p className="text-3xl text-center">
        Holder name:0=WHOLESALEONE, L=LONDON, C=GB
      </p>
      <p className="text-3xl ">Holder Id:dly67887</p>
    </div>
  );

  return (
    <div className="card col-12 flex flex-column align-items-center justify-content-center ">
      <h3 className="mt-3 text-3xl">Issued Member Access States</h3>

      <Card className="mt-4 border-1 border-100 bg-gray-900 col-6 ">
        <div className="flex ">
          <div className="w-10 ml-6">
            <Accordion>
              <AccordionTab header={header}>
                {/* mapping the fetched data */}
                {data.map((cdata) => (
                  <div
                    key={cdata.id}
                    className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5 pb-3"
                  >
                    <p className="  text-3xl font-bold text-blue-300 mr-3">
                      CBDC Name: {cdata.issuetype}
                    </p>
                    <p className=" text-2xl">Asset Id: {cdata.assetid}</p>
                    <p className=" text-2xl"> Id: {cdata.id}</p>
                  </div>
                ))}
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CBListRevoke;
