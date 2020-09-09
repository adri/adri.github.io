An optimizer trace can show why a query executes slowly in MySQL. The trace contains costs of different indexes that are evaluated and reasons why one is chosen over the other.

### Get a trace
Traces are per session.	Enabling `optimizer_trace` doesn't affect other sessions.

```sql
# Turn tracing on (it's off by default):
SET optimizer_trace="enabled=on";

# Run query
SELECT ...; 

# See the trace of the query
SELECT * FROM INFORMATION_SCHEMA.OPTIMIZER_TRACE;

# When done with tracing, disable it:
SET optimizer_trace="enabled=off";
```

### Read a trace
Optimizer traces are JSON encoded. Best to copy the structure in a JSON viewer. The trace contains these steps:

- `join_preparation` shows early query rewrites
- `join_optimization` shows how execution plan is built
	- `condition_processing` basic rewrites in WHERE/ON conditions
	- `ref_optimizer_key_uses`: Construction of possible ways to do ref and eq_ref accesses
	- `rows_estimation`:  Estimations of index costs, `usable` and `cause` can give hints why an index is not used
	- `considered_execution_plans`: Choice of the join order 
	- `attaching_conditions_to_tables` Once the join order is fixed, parts of the WHERE clause are "attached" to tables to filter out rows as early as possible
- `join_execution` shows any optimizations during execution. The optimizer can overwrite an execution plan with heuristics e.g. `reconsidering_access_paths_for_index_ordering`.

### Sources
- [MySQL docs](https://dev.mysql.com/doc/internals/en/optimizer-tracing-typical-usage.html)
- [MariaDB docs]()

#published #performance #tool 
