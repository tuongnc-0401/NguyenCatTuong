import React from "react";

const FancyForm = () => {
  return (
    <div>
      <form>
        <h5>Swap</h5>
        <label htmlFor="input-amount">Amount to send</label>
        <input id="input-amount" />

        <label htmlFor="output-amount">Amount to receive</label>
        <input
          id="output-amount"
          className="border-solid border-2 border-indigo-600"
        />

        <button>CONFIRM SWAP</button>
      </form>
    </div>
  );
};

export default FancyForm;
