How to show all the routes that are currenty configured in Skipper.
This can be useful for debugging if Kubernetes Ingress definitions are done correctly.

1. Connect to a skipper instance
    ```
    k -n kube-system exec -it skipper-ingress-dz5sk -- sh
    ```
2.  Install curl
    ```
    apk add curl
    ```
3. Fetch routes
    ```
    curl localhost:9911/routes
    ```
    
    
#published     