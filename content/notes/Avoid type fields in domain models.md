When using `type` fields on a domain model, there is logic associated depending on the value of the type. The `type` field means something else in different contexts. 

To decouple contexts the logic inside of each context should not know about the type but only about the data that is needed for that context.

Another layer orchestrates the different contexts.
When adding a new case for `type`, only the orchestrating layer changes. All the contexts stay untouched. 

Pro:
- Each context operates on it's own data and can be changed independently of `types`
- Context can be replaced with other systems that don't know about business specific `types`
- Looking at one part is simple as it doesn't need to take into account different cases for `type` values

### Source
- [Why and how to avoid 'type' fields on your domain models](https://mkaszubowski.com/2020/10/15/avoid-type-fields-domain-model.html)

#published 
