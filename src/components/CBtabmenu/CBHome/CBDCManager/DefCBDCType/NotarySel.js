import React from "react";
import { RadioButton } from "primereact/radiobutton";

const NotarySel = ({ data, setData }) => {
  return (
    <div className=" flex flex-column align-items-center">
      <div className=" text-3xl border-bottom-2 surface-border text-center text-left pb-3 ">
        Select the permitted notary for the CBDC.
      </div>

      <p className="text-2xl text-left pt-3">
        The CBDC ASSet will be tied to this notary.
      </p>

      <p className=" text-2xl text-left  ">
        Assets on different notaries will be swapped using the cross chain swap
        feature
      </p>

      {/* selecting the notary */}

      <div className="flex flex-column align-items-center p-5">
        <div className="col-12 ">
          <div className="field-radiobutton ">
            <RadioButton
              inputId="option1"
              name="option"
              value="O-NotaryONEService, L-London, C-GB"
              checked={data.notary === "O-NotaryONEService, L-London, C-GB"}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, notary: e.target.value };
                })
              }
            />
            <label className=" text-2xl" htmlFor="option1">
              O-NotaryONEService, L-London, C-GB
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="field-radiobutton">
            <RadioButton
              inputId="option2"
              name="option"
              value="O-NotaryTWOService, L-London, C-GB"
              checked={data.notary === "O-NotaryTWOService, L-London, C-GB"}
              onChange={(e) =>
                setData((data) => {
                  return { ...data, notary: e.target.value };
                })
              }
            />
            <label className=" text-2xl" htmlFor="option2">
              O-NotaryTWOService, L-London, C-GB
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotarySel;
