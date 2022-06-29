How to show all the routes that are currently configured in Skipper.
This can be useful for debugging if Kubernetes Ingress definitions are done correctly.

1. Connect to a skipper instance
    ```
    k -n kube-system exec -it skipper-ingress-dz5sk -- sh
    ```
2. Fetch routes
    ```
    wget -O - http://localhost:9911/routes
    ```    
#published     