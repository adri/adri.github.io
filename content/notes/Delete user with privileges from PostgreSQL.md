Deleting a user with privileges in [[PostgreSQL]] can throw errors like this:
```
Query 1 ERROR: ERROR:  user "<user name>" cannot be dropped because some objects depend on it
DETAIL:  privileges for default privileges on new relations belonging to user test
privileges for default privileges on new relations belonging to user test2
privileges for default privileges on new relations belonging to user test3
```

There are three privilege levels:
1. User to user 
2. Schema to user 
3. Table to user

### List all privileges assigned
First find out what privileges are assigned. This lists all of them.

How to read the table:
* `obowner`: shows the owner of the resource.
* `objname`: specifies if it's a table or schema privilege.
*  `aclstring`:   specifies the access control.  Example: `reporting_etl=arwdRxt/looker`. This means user `looker` is owner and reporting_etl has privilege on.
*  
```sql
SELECT pg_get_userbyid(b.relowner)::text AS objowner, 
		trim(c.nspname)::text AS schemaname,  
		b.relname::text AS objname,
		CASE WHEN relkind='r' THEN 'table' ELSE 'view' END::text AS objtype, 
		TRIM(SPLIT_PART(array_to_string(b.relacl,','), ',', NS.n))::text AS aclstring, 
		NS.n as grantseq,
		null::text as colname
		FROM 
		(SELECT  oid,generate_series(1,array_upper(relacl,1))  AS n FROM pg_catalog.pg_class) NS
		INNER JOIN pg_catalog.pg_class B ON b.oid = ns.oid AND  NS.n <= array_upper(b.relacl,1)
		INNER JOIN pg_catalog.pg_namespace c on b.relnamespace = c.oid
		where relkind in ('r','v')
		UNION ALL
		SELECT pg_get_userbyid(c.relowner)::text AS objowner, 
		trim(d.nspname)::text AS schemaname,  
		c.relname::text AS objname,
		'column'::text AS objtype, 
		TRIM(SPLIT_PART(array_to_string(b.attacl,','), ',', NS.n))::text AS aclstring, 
		NS.n as grantseq,
		b.attname::text as colname
		FROM 
		(SELECT attrelid,generate_series(1,array_upper(attacl,1))  AS n FROM pg_catalog.pg_attribute_info) NS
		INNER JOIN pg_catalog.pg_attribute_info B ON b.attrelid = ns.attrelid AND  NS.n <= array_upper(b.attacl,1)
		INNER JOIN pg_catalog.pg_class c on b.attrelid = c.oid
		INNER JOIN pg_catalog.pg_namespace d on c.relnamespace = d.oid
		where relkind in ('r','v')
		UNION ALL
		SELECT pg_get_userbyid(b.nspowner)::text AS objowner,
		null::text AS schemaname,
		b.nspname::text AS objname,
		'schema'::text AS objtype,
		TRIM(SPLIT_PART(array_to_string(b.nspacl,','), ',', NS.n))::text AS aclstring,
		NS.n as grantseq,
		null::text as colname
		FROM 
		(SELECT oid,generate_series(1,array_upper(nspacl,1)) AS n FROM pg_catalog.pg_namespace) NS
		INNER JOIN pg_catalog.pg_namespace B ON b.oid = ns.oid AND NS.n <= array_upper(b.nspacl,1)
		UNION ALL
		SELECT pg_get_userbyid(b.datdba)::text AS objowner,
		null::text AS schemaname,
		b.datname::text AS objname,
		'database'::text AS objtype,
		TRIM(SPLIT_PART(array_to_string(b.datacl,','), ',', NS.n))::text AS aclstring,
		NS.n as grantseq,
		null::text as colname
		FROM 
		(SELECT oid,generate_series(1,array_upper(datacl,1)) AS n FROM pg_catalog.pg_database) NS
		INNER JOIN pg_catalog.pg_database B ON b.oid = ns.oid AND NS.n <= array_upper(b.datacl,1) 
		UNION ALL
		SELECT pg_get_userbyid(b.proowner)::text AS objowner,
		trim(c.nspname)::text AS schemaname, 
		textin(regprocedureout(b.oid::regprocedure))::text AS objname,
		decode(prorettype,0,'procedure','function')::text AS objtype,
		TRIM(SPLIT_PART(array_to_string(b.proacl,','), ',', NS.n))::text AS aclstring,
		NS.n as grantseq,
		null::text as colname  
		FROM 
		(SELECT oid,generate_series(1,array_upper(proacl,1)) AS n FROM pg_catalog.pg_proc) NS
		INNER JOIN pg_catalog.pg_proc B ON b.oid = ns.oid and NS.n <= array_upper(b.proacl,1)
		INNER JOIN pg_catalog.pg_namespace c on b.pronamespace=c.oid 
		UNION ALL
		SELECT null::text AS objowner,
		null::text AS schemaname,
		lanname::text AS objname,
		'language'::text AS objtype,
		TRIM(SPLIT_PART(array_to_string(b.lanacl,','), ',', NS.n))::text AS aclstring,
		NS.n as grantseq, 
		null::text as colname
		FROM 
		(SELECT oid,generate_series(1,array_upper(lanacl,1)) AS n FROM pg_catalog.pg_language) NS
		INNER JOIN pg_catalog.pg_language B ON b.oid = ns.oid and NS.n <= array_upper(b.lanacl,1)
		UNION ALL
		SELECT pg_get_userbyid(b.defacluser)::text AS objowner,
		trim(c.nspname)::text AS schemaname,
		decode(b.defaclobjtype,'r','tables','f','functions','p','procedures')::text AS objname,
		'default acl'::text AS objtype,
		TRIM(SPLIT_PART(array_to_string(b.defaclacl,','), ',', NS.n))::text AS aclstring,
		NS.n as grantseq, 
		null::text as colname
		FROM 
		(SELECT oid,generate_series(1,array_upper(defaclacl,1)) AS n FROM pg_catalog.pg_default_acl) NS
		INNER JOIN pg_catalog.pg_default_acl b ON b.oid = ns.oid and NS.n <= array_upper(b.defaclacl,1) 
		LEFT JOIN  pg_catalog.pg_namespace c on b.defaclnamespace=c.oid
```

### Change ownership 
```sql
alter table table_name owner to <new user name>;
alter schema schema_name  owner to <new user name>;
```

### Revoke default privileges (user to user)
```sql
ALTER DEFAULT PRIVILEGES FOR USER <fromuser_name> REVOKE ALL ON TABLEs FROM <user_tobe_removed>;
```

### Change table privileges (table to user)
```sql
revoke all on table table_name from <new user name>;
```

### Change schema privileges (schema to user)
```sql
revoke all on schema schema_name from <new user name>;
```

### Drop the user
```sql
DROP USER <user name>;
```

#published
