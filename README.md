# State Management + Data Model

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

This project was generated using [Nx](https://nx.dev)

TODO

- [Services](https://xstate.js.org/docs/guides/communication.html#the-invoke-property) are like an actor model
- [Interpreter](https://xstate.js.org/docs/guides/interpretation.html) handles:
  - State transitions
  - Executing actions (side-effects)
  - Delayed events with cancellation
  - Activities (ongoing actions)
  - Invoking/spawning child statechart services
  - Support for multiple listeners for state transitions, context changes, events, etc.
  - ...
