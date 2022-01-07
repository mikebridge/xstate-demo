# State Management + Data Model

Exploration of state management, data modelling + React 
using [xstate](https://xstate.js.org/

See: [https://codesandbox.io/s/crckp](https://codesandbox.io/s/crckp)

## Setup

this project requires nx

```
nvm use
npm install -g nx
```

## Usage

Launch the server

```bash
nx serve xstate-demo
```

This should start a server on [http://localhost:4200/](http://localhost:4200/)

# Notes

Currently this uses a machine directly.

*todo*: Look at [extending a machine](https://xstate.js.org/docs/guides/machines.html#extending-machines) with 
custom logic

*todo*: Look more closely at [Services](https://xstate.js.org/docs/guides/communication.html#the-invoke-property) (like actors), and 
and [Interpreter](https://xstate.js.org/docs/guides/interpretation.html)

An [Interpreter](https://xstate.js.org/docs/guides/interpretation.html) handles:

- State transitions
- Executing actions (side-effects)
- Delayed events with cancellation
- Activities (ongoing actions)
- Invoking/spawning child statechart services
- Support for multiple listeners for state transitions, context changes, events, etc.
- ...

# Nx

This project was generated using [Nx](https://nx.dev)
