import React from "react";

const FancyForm = () => {
  return (
    <div>
      <form onsubmit="return !1">
        <h5>Swap</h5>
        <label for="input-amount">Amount to send</label>
        <input id="input-amount" />

        <label for="output-amount">Amount to receive</label>
        <input id="output-amount" />

        <button>CONFIRM SWAP</button>
      </form>
    </div>
  );
};

export default FancyForm;
