import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const WBOACList = () => {
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
  const header = (
    <div className="flex-column">
      <p className="text-2xl">Issuing Party:O=CB,L=Dublin, C=IE</p>
    </div>
  );

  return (
    <div className=" col-12 flex flex-column align-items-center justify-content-center  ">
      <h3 className="mt-3 text-2xl">Issued Member Access States</h3>

      <Card className="mt-4  col-6  bg-gray-900">
        <Accordion>
          <AccordionTab header={header}>
            {/* mapping the fetched data */}
            {data.map((cdata) => (
              <div
                key={cdata.id}
                className=" card flex-column  align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5"
              >
                <p className="  text-2xl font-bold text-blue-200 mr-3">
                  CBDC Name:{cdata.issuetype}
                </p>
                <p className=" text-2xl">Asset Id:{cdata.assetid}</p>
                <p className=" text-2xl"> Id:{cdata.id}</p>
              </div>
            ))}
          </AccordionTab>
        </Accordion>
      </Card>
    </div>
  );
};

export default WBOACList;
