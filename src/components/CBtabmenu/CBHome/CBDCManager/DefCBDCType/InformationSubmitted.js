import { Button } from "primereact/button";
import React from "react";

// user information submitted message
const InformationSubmitted = ({ setActiveIndex }) => {
  return (
    <div className="text-center">
      <h5 className="text-2xl">your information has been submitted</h5>
      <p className="text-xl">what happened on Intrasettle?</p>
      <Button
        label="proceed"
        // activeIndex={activeIndex}
        onClick={() => {
          setActiveIndex(0);
        }}
      />
    </div>
  );
};

export default InformationSubmitted;
