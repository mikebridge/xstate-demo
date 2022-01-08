import React, { FormEventHandler, useContext } from 'react';
import { useActor, useMachine } from '@xstate/react';
import { ContributionSelectorComponent } from './contributionSelector';
import {
  createDonationWorkflowMachine,
  DonationWorkflowSetDonationAmountEvent,
  IDonationWorkflowContext
} from './donationWorkflowMachine';
import { createDonationWithBonusWorkflow } from './donationWithBonusWorkflowMachine';

export const DonationWithTShirtForm: React.FC = (props) => {
  const donationThreshold = 5;

  const bonusWorkflowMachine = createDonationWithBonusWorkflow(donationThreshold)

  const [currentBonus, bonusSend] = useMachine(bonusWorkflowMachine);

  // send the result of the donation machine to the donation bonus machine
  const onDonationAmountChangedCallback = (ctx: IDonationWorkflowContext, e: DonationWorkflowSetDonationAmountEvent) => {
    console.log(`telling bonus machine about the donation machine change: ${e.donationAmount}`)
    bonusSend("DONATION_AMOUNT_CHANGED", { donationAmount: e.donationAmount })
  }
  const [current, send] = useMachine(createDonationWorkflowMachine(onDonationAmountChangedCallback, ));

  const { donationAmount } = current.context;

  const editing = current.matches("editing");
  const invalid = current.matches({ editing: "invalid" });

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

  const onDonationChanged = (val: string) => {
    console.log(`setting contribution to ${val}`)
    send("SET_DONATION_AMOUNT", { donationAmount: val })
    //send("SET_DONATION_AMOUNT", { donationAmount: val })
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Donation Form with Bonus TShirt</h3>
      <div>
        {current.done ? 'Thanks for your donation!': 'Please select a donation amount'}
      </div>
      {invalid ? <div className="error">Sorry, that's invalid.</div> : null}
      <div>
        <ContributionSelectorComponent
          values={["1", "2", "4", "8", "16", "32"]}
          onChanged={onDonationChanged} />
      </div>
      {
        donationAmount &&
        <div>Your donation: $ {donationAmount}</div>
      }
      {currentBonus.matches('available') &&
        <div>You will receive a free T-Shirt for contributing more than ${donationThreshold}</div>
      }
      <button disabled={!editing || invalid} data-testid="save-button">
        Donate
      </button>
    </form>
  );
}

