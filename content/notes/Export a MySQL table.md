
For reproducing issues or for backing up data from production it can be needed to get an export of a MySQL table. UI tools often fail to export or import large tables. The `mysqldump` command turned out to work well.

### Dump a table in a SQL file
```
mysqldump -h [host] --single-transaction --set-gtid-purged=OFF -u adrian_read -p [db] [table] > 20200707-[table.sql
```
 
Tips:
- Use a read replica when possible
- `--single-transaction` is important to not lock tables

#published

