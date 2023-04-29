import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const AvailableCBDCWBO = () => {
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
  const header = <p className="text-xl">Compliance Control:</p>;
  return (
    <div className=" col-12 flex flex-column align-items-center justify-content-center  ">
      {/* mapping the fetched data */}
      <h3 className="mt-3">Available Assets on the Network</h3>

      {data.map((cdata) => (
        <Card
          className="mt-4  col-6  border-1 border-100 bg-gray-900"
          key={cdata.id}
        >
          <div className="flex">
            <p className="w-2 text-xl text-center font-bold text-blue-200 mr-3">
              CBDC Name:
            </p>
            <p className="text-xl w-10"> {cdata.issuetype}</p>
          </div>
          <div className="flex ">
            <p className="w-2 text-xl text-center font-bold text-blue-200 mr-3">
              CBDC asset decimal:
            </p>
            <p className="text-xl w-10">{cdata.count}</p>
          </div>
          <div className="flex ">
            <p className="w-2 text-xl text-center font-bold text-blue-200 mr-3">
              Issuing Party:
            </p>
            <p className="text-xl w-10">{cdata.issuer}</p>
          </div>
          <div className="flex ">
            <p className="w-2 text-xl text-center font-bold text-blue-200 mr-3">
              id:
            </p>
            <p className="text-xl w-10">{cdata.id}</p>
          </div>

          <div className="flex ">
            <div className="w-5 ml-6">
              <Accordion>
                <AccordionTab header={header}>
                  <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
                    <p className="  text-xl font-bold text-blue-200 mr-3">
                      Required Member Access:ENABLED
                    </p>
                    <p className=" text-xl">
                      Permitted Notaries:O=NotaryONE Service, L=London, C=GB
                    </p>
                  </div>
                </AccordionTab>
              </Accordion>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AvailableCBDCWBO;
