On macOS there is a tool called  `fs_usage` which can be used to see what files are accessed on the system while it is running. It needs sudo to run.

### Watch files by process
1. Find out the PID of the process that should be monitored 
```
ps aux | grep php-fpm
```
2. Listen for file system access 
```
sudo fs_usage -f "pathname" [pid]
```

### Explanation
- `access`  checks whether the calling process can access the file pathname
- `open` creates a new open file description, an entry in the system-wide table of open files
- `close` closes a file descriptor
- `stat64` returns information about a file

### Sources
- http://manpagez.com/man/1/fs_usage/
- https://linux.die.net/man/2/access
- https://linux.die.net/man/2/open
- https://linux.die.net/man/2/stat64

#published