
// this file isn't used yet

import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { createDonationWorkflowMachine } from './donationWorkflowMachine';
import { InterpreterFrom } from 'xstate';

const donationWorkflowMachine = createDonationWorkflowMachine();

// interface IDonationWorkflowContext {
//   donationWorkflowService: () => void;
// }
//export const DonationWorkflowContext = createContext({});

// SEE: https://xstate.js.org/docs/recipes/react.html#global-state-react-context
export const DonationWorkflowContext = createContext({} as InterpreterFrom<typeof donationWorkflowMachine>)


// todo: fix this
// export type SomeService =
//   Interpreter<unknown, any, AnyEventObject, { value: any; context: unknown }>

// export const DonationWorkflowProvider: React.FC = ({ children }) => {
//   //
//   const donationWorkflowService = useInterpret(donationWorkflowMachine);
//
//   return (
//     <DonationWorkflowContext.Provider value={{ donationWorkflowService }}>
//       {children}
//     </DonationWorkflowContext.Provider>
//   );
// };
