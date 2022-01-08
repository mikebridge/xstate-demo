import { assign, createMachine } from 'xstate';
import { validate } from './utils';
import { createModel } from 'xstate/lib/model';

interface IDonationData {
  donationAmount: number
  name: string
}

export type DonationWorkflowSubmissionEvent = {
  type: 'SUBMIT',
  data: IDonationData
}

export type DonationWorkflowSetDonationAmountEvent = {
  type: 'SET_DONATION_AMOUNT',
  donationAmount: string
}

export type DonationWorkflowSetNameEvent = {
  type: 'SET_NAME',
  name: string
}

// https://xstate.js.org/docs/guides/typescript.html
export type DonationWorkflowEvent =
  | DonationWorkflowSubmissionEvent
  | DonationWorkflowSetNameEvent
  | DonationWorkflowSetDonationAmountEvent;

// The context (extended state) of the machine
export interface IDonationWorkflowContext {
  donationAmount: string | null;
  name: string | null
}

// "assign" changes the context
const setDonationAmount = assign<IDonationWorkflowContext, DonationWorkflowSetDonationAmountEvent>({
  donationAmount: (ctx, e) => e.donationAmount
});

const setNameAmount = assign<IDonationWorkflowContext, DonationWorkflowSetNameEvent>({
  name: (ctx, e) => e.name
});

const onDonationSet = (ctx: IDonationWorkflowContext, e: DonationWorkflowSetDonationAmountEvent) => {
  console.log(`ON DONATION SET CALLED! ${e.donationAmount}`);
  // todo: would we overwrite this or...?
}

// https://xstate.js.org/docs/guides/models.html#createmodel
export const donationModel = createModel({
  donationAmount: null,
  name: null
})

type OnDonationSet = (ctx: IDonationWorkflowContext, e: DonationWorkflowSetDonationAmountEvent) => void
export const onDonationSetDefault = (ctx: IDonationWorkflowContext, e: DonationWorkflowSetDonationAmountEvent) => {
  console.log(`ON DONATION SET CALLED! ${e.donationAmount}`);
}

export const createDonationWorkflowMachine = (onDonationSet?: OnDonationSet) => {
  // const onEditingInvoked = () => {
  //   console.log("EDIT CALLED")
  //   return Promise.resolve()
  // }
  // not sure this is a good way to do this
  onDonationSet = onDonationSet || onDonationSetDefault

  return createMachine<IDonationWorkflowContext, DonationWorkflowEvent>({
    id: 'donationWorkflow', // the state node https://xstate.js.org/docs/guides/ids.html#relative-targets
    initial: 'editing',
    context: donationModel.initialContext,
    states: {
      editing: {
        // do something on state entry
        // invoke: {
        //   src: onEditingInvoked,
        //   onDone: {/* ... */} // refers to `onEditingInvoked` being done
        // },
        // handle events
        on: {
          SET_DONATION_AMOUNT: {
            // Child state nodes can be targeted relative to their parent by specifying a dot followed by their key
            // https://xstate.js.org/docs/guides/ids.html#relative-targets
            target: ".idle",
            actions: [setDonationAmount, onDonationSet]
          },
          SUBMIT: "validating"
        },
        initial: "idle",
        states: {
          idle: {},
          invalid: {}
        }
      },
      validating: {
        invoke: {
          id: "validating",
          src: ctx => validate(ctx.donationAmount), // todo: validate the rest of this thing
          onDone: "validated",
          onError: "editing.invalid" // go to "editing" state, substate = "invalid"
        }
      },
      validated: {
        // this invokes an action on entry https://xstate.js.org/docs/guides/actions.html#api
        entry: "submit",
        type: "final"
      },
      // submitting: {},
      // error: {},
      success: {
        type: "final"
      },
    },
  })

}

