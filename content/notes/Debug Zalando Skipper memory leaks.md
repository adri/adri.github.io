To find out what memory is leaking exactly, Skipper has an option to enable the go profiling tools (pprof). 

### How to profile 
When running Skipper inside of Kubernetes:
1. Configure `-enable-profile` when starting Skipper
2. Proxy to a Skipper pod `kubectl port-forward skipper-ingress-pzx2b 9911:9911`
3. Go to http://127.0.0.1:9911/debug/pprof/ and download a dump full goroutine stack dump, wait a few minutes, and download another dump
4. Install goroutine-inspect and run it $GOPATH/bin/goroutine-inspect
5. Make a diff (`l` = only in original, `c` = in both, `r` = in original 2)
    ```
    original = load("goroutine.dump")
    original2 = load("goroutine2.dump")
    l, c, r = original.diff(original2)
    c.show()
    ```

The content of `c` is a list of all goroutines that are in both dumps. This means that the goroutine is not cleaned up between the dumps.

#published