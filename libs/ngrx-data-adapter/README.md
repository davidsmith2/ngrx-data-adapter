# ngrx-data-adapter

This library was generated with [Nx](https://nx.dev).

```mermaid
sequenceDiagram
    AdapterDataService-->>AdapterRequest: configures
    AdapterRequest-->>AdapterRequestHandler: instantiates
    AdapterRequest-->>AdapterRequestHandlerRegistry: writes to
    AdapterDataService-->>AdapterRequestHandlerRegistry: reads from
    AdapterEntityCollectionReducerMethods-->>AdapterRequestHandlerRegistry: reads from
```
