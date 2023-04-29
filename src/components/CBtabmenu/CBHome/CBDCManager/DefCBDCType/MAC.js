import React from "react";
import { InputSwitch } from "primereact/inputswitch";

const MAC = ({ data, setData }) => {
  return (
    <div className=" flex-column align-items-center">
      <h5 className="text-center text-3xl">Configure Member Access Control</h5>
      <p className=" text-2xl text-center  border-bottom-1 surface-border surface-overlay p-5">
        This rule ensures that a party must have been granted member access in
        order to transact in this asset type. By default, this rule is enabled,
        but may be turned off.
      </p>
      <p className="text-3xl text-center p-3">
        Toggle the switch below to enable/disable this control.
      </p>

      {/* asking user input if the member access is required for the asset */}
      <h5 className="text-center text-3xl">Member Access Required</h5>
      <div className="text-center p-4">
        <InputSwitch
          checked={data.access}
          onChange={(e) =>
            setData((data) => {
              return { ...data, access: e.value };
            })
          }
        />
      </div>
    </div>
  );
};

export default MAC;
