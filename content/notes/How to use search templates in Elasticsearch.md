After providing a search template, use this to call the template with parameters.

```
POST /[index-name]/_search/template?search_type=dfs_query_then_fetch
{
  "id": "[template-name]",
  "params": {
    "size": 10,
    "query": "Thé"
  }
}
```

Make sure to provide **all parameters** that are required by the template. Otherwise it can happen that the parsing of the template fails. 

For example when removing the `size` param, parsing the template fails with:
```
{
  "error" : {
    "root_cause" : [
      {
        "type" : "number_format_exception",
        "reason" : "empty String"
      }
    ],
    "type" : "number_format_exception",
    "reason" : "empty String"
  },
  "status" : 400
}
```

#published 