import { createDonationWorkflowMachine } from './donationWorkflowMachine';
import { assign, createMachine } from 'xstate';
import { isStringifiedNumber, validate } from './utils';

// const donationWithBonusWorkflowMachine = donationWorkflowMachine.withConfig({
//   actions: {
//     alertDonation: (context, event) => {
//       console.log('green');
//     }
//   }
// });

interface ITShirt {
  size: "S" | "M" | "L" | "XL"
}

// interface IBonusData<IItem> {
//   bonus: IItem
// }

interface IBonusData {
  bonus: ITShirt
}

// type DonationWorkflowSubmissionEvent = {
//   type: 'SUBMIT',
//   data: IDonationData
// }


// The context (extended state) of the machine
interface IBonusWorkflowContext {
  donationAmount: string | null
  bonusItem: IBonusData | null;
}

// const setDonationAmount = assign<IBonusWorkflowContext, BonusWorkflowSetDonationAmountEvent>({
//   donationAmount: (ctx, e) => e.donationAmount
// });

const setBonusItem = assign<IBonusWorkflowContext, BonusWorkflowSetBonusAmountEvent>({
  bonusItem: (ctx, e) => e.bonusItem
});

const clearBonusItem = assign<IBonusWorkflowContext, BonusWorkflowClearBonusAmountEvent>({
  bonusItem: (ctx, e) => null
});

const setDonationAmount = assign<IBonusWorkflowContext, BonusWorkflowDonationAmountChangedEvent>({
  donationAmount: (ctx, e) => e.donationAmount
});

type BonusWorkflowDonationAmountChangedEvent = {
  type: 'DONATION_AMOUNT_CHANGED',
  donationAmount: string | null
}

type BonusWorkflowSetBonusAmountEvent = {
  type: 'SET_BONUS_ITEM',
  bonusItem: IBonusData
}

type BonusWorkflowClearBonusAmountEvent = {
  type: 'CLEAR_BONUS_ITEM'
}

// type SET_DONATION_AMOUNT = {
//   type: 'SET_DONATION_AMOUNT'
// }

// type DonationAmountChanged = {
//   type: 'DONATION_AMOUNT_CHANGED'
// }

type BonusWorkflowEvent =
  | BonusWorkflowSetBonusAmountEvent
  | BonusWorkflowClearBonusAmountEvent
  | BonusWorkflowDonationAmountChangedEvent


export const createDonationWithBonusWorkflow = (donationThreshold: number) => {
  return createMachine<IBonusWorkflowContext, BonusWorkflowEvent>({
    id: 'bonusManagementWorkflow', // the state node https://xstate.js.org/docs/guides/ids.html#relative-targets
    initial: 'deciding',
    context: {
      bonusItem: null,
      donationAmount: null
    },
    states: {
      // transient state: https://xstate.js.org/docs/guides/statenodes.html#transient-state-nodes
      deciding: {
        always: [
          {target: 'available', cond: 'isAboveThreshold'},
          {target: 'unavailable', cond: 'isBelowThreshold'}
        ]
      },

      unavailable: {
        on: {
          DONATION_AMOUNT_CHANGED: {
            actions: setDonationAmount,
            target: "deciding"
          }
          // SET_BONUS_ITEM: {
          //   target: ".available",
          //   actions: [setBonusItem]
          // },
        },
      },
      available: {
        on: {
          DONATION_AMOUNT_CHANGED: {
            actions: setDonationAmount,
            target: "deciding"
          }
          // CLEAR_BONUS_ITEM: {
          //   target: ".unavailable",
          //   actions: [clearBonusItem]
          // },
        },
      }
    },
  }, {
    guards: {
      isAboveThreshold: (ctx) => {
        console.log(`isAboveThreshold ${JSON.stringify(ctx)}`)
        return Number(ctx.donationAmount) >= donationThreshold;
      },
      isBelowThreshold: (ctx) => {
        console.log(`isBelowThreshold ${JSON.stringify(ctx)}`)
        return Number(ctx.donationAmount) < donationThreshold;
      },
  }
})
}
