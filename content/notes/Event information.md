## Event information
Events are a way to decouple systems for better maintainability and reuse. But what information should be included in an event?

There is no general answer as it depends on the use-case of the subscriber. However there are three classifications: 

### Fat event
This means that all data a subscriber could need, is included in the event. Subscribers don’t need to call any APIs and are at runtime less coupled to the publishers domain. 

### Thin event 
Only IDs are included in the event. Subscribers have to use an API of other domains to get the relevant updated information to update the local state.

### Delta event
Like a thin event but includes Information about the changes, so a subscriber can use that in most cases to update their local state.

### Comparison
- Age of information: Is the information at the time of the event relevant or only the latest?
- Latency: Are there many subscribers which need to fetch additional information which could bring down the APIs?
- Subscriber complexity: Maintaining internal state based information in events is more work compared to calling an API.
- Coupling: Including more information in the events couples 

It depends on the use-case which way is the best. Always fetching all information via other domains APIs has the advantage of being always up to date. Relying on the events content can be needed when the sequence of changes is important. 

### Ideas 
- Use a process for an aggregate root to 
- See how subscriptions are implemented in Absinthe 

### Source
- [Events: Fat or Thin](https://codesimple.blog/2019/02/16/events-fat-or-thin/)


#published #ddd #eventstorming 