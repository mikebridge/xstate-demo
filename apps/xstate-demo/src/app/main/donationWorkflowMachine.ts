import { assign, createMachine } from 'xstate';
import { validate } from './utils';

interface IDonationData {
  donationAmount: number
}

type DonationWorkflowSubmissionEvent = {
  type: 'SUBMIT',
  data: IDonationData
}

type DonationWorkflowSetDonationAmountEvent = {
  type: 'SET_DONATION_AMOUNT',
  donationAmount: string
}

// https://xstate.js.org/docs/guides/typescript.html
type DonationWorkflowEvent =
  | DonationWorkflowSubmissionEvent
  | DonationWorkflowSetDonationAmountEvent;

// The context (extended state) of the machine
interface IDonationWorkflowContext {
  donationAmount: string | null;
}

export const donationWorkflowMachine = createMachine<IDonationWorkflowContext, DonationWorkflowEvent>({
  id: 'donationWorkflow', // the state node https://xstate.js.org/docs/guides/ids.html#relative-targets
  initial: 'editing',
  context: {
    donationAmount: null
  },
  states: {
    editing: {
      on: {
        SET_DONATION_AMOUNT: {
          target: ".idle",
          actions: assign({
            donationAmount: (ctx, e) => e.donationAmount
          })
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
        src: ctx => validate(ctx.donationAmount),
        onDone: "validated",
        onError: "editing.invalid" // go to "editing" state, substate = "invalid"
      }
    },
    validated: {
      entry: "submit", // TODO: What is this?
      type: "final"
    },
    // submitting: {},
    // error: {},
    success: {
      type: "final"
    },
  },
})




