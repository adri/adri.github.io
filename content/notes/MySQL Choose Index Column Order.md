Based on [blog post](https://www.percona.com/blog/2009/06/05/a-rule-of-thumb-for-choosing-column-order-in-indexes/).

The most selective column should be first in the index, so that the number of possible matching rows is the smallest. 

1. Get the row amounts of each WHERE condition.
Use a read replica on production when possible.
```
select sum(columnA='testA'), sum(columnB='testB'), ... from table
```

2. Move the condition with the lowest row count into the WHERE.
```
select sum(columnB='testB') from table where columnA='testA'
```


## Other Index related tools:
* Find keys that are duplicated: [pt-duplicate-key-checker](https://www.percona.com/doc/percona-toolkit/2.1/pt-duplicate-key-checker.html)
* Find index uses of slow queries [pt-index-usage](https://www.percona.com/doc/percona-toolkit/LATEST/pt-index-usage.html)

#published 