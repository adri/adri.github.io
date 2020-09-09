[[Talk]] by [[Chris Keathley]]

### Little's law
```
elements in the queue = arrival rate * avg processing time
```

For example:
```
requests = rps * ms
```

### Overload mitigation
Arrival rate and processing time need be be under control. The only way to do this is to drop requests.

- **Load shedding**: Upstream or downstream service drops requests
- **Autoscaling**: It's not a solution. Adding more capacity helps. However the limit is just moved. Only using CPU for scaling is not enough. 
- Cirquit breakers: Only a partial solution as they stop all traffic to the downsteam service, even though some traffic could still be handled.

### Adaptive concurrency
Dynamically find out the limits of sending and receiving systems and use load shedding.

Signals used to set limits:
- Latency
- Successful vs failed requests
- Additive Increase Multiplicative Decrease: Success: limit + 1, Backoff: limit * 0,95 

### Source 
- [Youtube](https://www.youtube.com/watch?v=-oQl1xv0hDk)
- [Regulartor elixir library](https://github.com/keathley/regulator)

#published 