How to get PHP-FPM opcache statistics without exposing any routes.

### Cachetool
This tool can read APC and opcache statistics from a local PHP-FPM pool.  

1. Install
```
curl -sLO https://github.com/gordalina/cachetool/releases/download/6.5.0/cachetool.phar
```
2. Read statistics
```
php cachetool.phar opcache:status --fcgi
```

#published #tool #php #performance 