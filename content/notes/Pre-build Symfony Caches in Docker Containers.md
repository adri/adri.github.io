In a typical Symfony project there are multiple caches built when running the `cache:warmup` command. By pre-building those caches and putting them into the container, the startup time can be reduced. 

### Doctrine 
1. **Metadata Cache**: Stores class metadata. ✅ Already in container
2. **Query Cache**: Stores DQL queries converted to SQL. This is generated at runtime. 
    💡Can be collected on CI -> Turned out to be too complex, instead I recommend to use a cache with 2 adapters: a local file cache backed by a shared external cache like Redis.
1. **Result Cache**: Stores results of queries. ❌Only at runtime
2. **Proxy directory**: Generated proxy objects which make lazy loading of entities possible. `/var/www/app/var/cache/[env]/doctrine/orm/Proxies` ✅ Already in container

### Symfony
1. **Route annotations**: Parsed controller route annotations.
2. **Container**: Service configuration and initialization. ⚠️ contains credentials when using parameters. Switch to environment variables instead.
3. **Translations**:  `/var/www/app/var/cache/[env]/translations/catalogue.gl.whsXFTx.php`
4. **Annotations**: A huge file of all annotations `/var/www/app/var/cache/[env]/annotations.php`
5. **Routes**:  ⚠️ contains domain names `/var/www/app/var/cache/[env]/url_generating_routes.php`

### Twig
1. **Template cache**: Twig templates compiled to PHP files.


### Use env variables instead of parameters
1. Make a script that checks that all parameters are accessed with `%env(parameter_name)%` to not leak any parameters
2. Replace parameters with environment variables in Website project
2. Make a script that checks that no parameter values are included in the generated container

How to test:
- Build a new image that includes cache warm-up while building (and removes it from the entrypoint.sh)
- Start the image with `CACHE_WARMUP=0` and run a request or `bin/console`. Run `docker diff [image-hash]` to list the changed files since the start. 
- The output should show show no files in `var/cache/[env]/ContainerXYZ` and way less files compared to running the image with `CACHE_WARMUP=1`

### Measurements
Measurements of a web-server pod using PHP-FPM and a separate nginx container:
- ~1m 44 seconds to boot new node (EC2 instance)
- ~15 seconds image pull
- ~20 seconds cache building and warmup
- ~5 seconds nginx retry interval
- 70 seconds initial readiness probe delay

**Times before optimizations**
Best time: 1 + 70s = 71 s  
Worst time:  60 + 44 + 1 + 15 + 70 = 190 = 3m 10s

Reducing the initial readiness probe delay (best case): 
1 + 25s = 26s  reduction of  63,4% vs current best case

Pre-building cache (best case): 
1 + 1s  = 2s  reduction of 97,1% vs current best case

Pre-building cache (worst case): 
1m 44s + 15 + 1 + 1 =  2m 1s  ~33% faster than current worst case

### Preload
⚠️  Something is wrong with preload, unclear what.

Without preload:
```bash
hyperfine -r 1000 --warmup 10 "bash test.sh"
  Time (mean ± σ):      68.9 ms ±  12.6 ms    [User: 3.7 ms, System: 5.9 ms]
  Range (min … max):    42.3 ms … 179.9 ms    1000 runs
```

With preload:
```bash
hyperfine -r 1000 --warmup 10 "bash test.sh"
  Time (mean ± σ):      67.2 ms ±  32.9 ms    [User: 3.5 ms, System: 5.5 ms]
  Range (min … max):    57.5 ms … 1074.3 ms    1000 runs
```

#published 