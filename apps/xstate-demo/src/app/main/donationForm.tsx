import React, { FormEventHandler, useContext } from 'react';
import { useActor, useMachine } from '@xstate/react';
import { DonationWorkflowContext } from './donationWorkflowProvider';
import { donationWorkflowMachine } from './donationWorkflowMachine';

// export interface DonationFormProps: {}
// SEE: https://xstate.js.org/docs/recipes/react.html



export const DonationForm: React.FC = (props) => {
  const [current, send] = useMachine(donationWorkflowMachine);
  const { donationAmount } = current.context;

  const editing = current.matches("editing");
  const invalid = current.matches({ editing: "invalid" });
  //const donationWorkflowContext = useContext(DonationWorkflowContext);
  //const [state] = useActor(donationWorkflowContext.donationWorkflowService);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Sending ")
    send("SUBMIT");
  }

  const onDonationAmountChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newDonationAmount = e.target.value;
    console.log(`Setting new donation amount ${newDonationAmount}`)
    send("SET_DONATION_AMOUNT", { donationAmount: newDonationAmount })
  }

  return (<>
    <form onSubmit={onSubmit}>
      <h3>Donation Form</h3>
      <div>
        {current.matches('editing') ? 'Please fill out the form' : 'Thanks!'}
      </div>
      {invalid ? <div className="error">Sorry, that's invalid.</div> : null}
      <input
        autoFocus
        placeholder="enter donation amount"
        value={donationAmount || ""}
        style={{
          borderColor: invalid ? "red" : undefined
        }}
        onChange={onDonationAmountChanged}
        disabled={!editing}
        data-testid="input"
      />
      <button disabled={!editing || invalid} data-testid="save-button">
        Save
      </button>
    </form>
  </>);
}

// import { useMachine } from '@xstate/react';
// import { createContext } from 'react';
// //import { toggleMachine } from '../path/to/toggleMachine';
//
// export const GlobalStateContext = createContext({});
//
// const formMachine = {
//
// }
//
// function Toggle() {
//   const [current, send] = useMachine(formMachine);
//
//   return (
//     <button onClick={() => send('TOGGLE')}>
//       {current.matches('inactive') ? 'Off' : 'On'}
//     </button>
//   );
// }
