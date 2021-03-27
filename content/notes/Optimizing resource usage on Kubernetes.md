Goal: Use resources optimally with low p99 latency 

Pod resources:
- CPU
- Memory

Internal:
- Number of threads
- Memory limit per thread

Metrics:
- requests/sec 
- CPU utilization
- CPU throttling
- Memory utilization

=> How to optimize this?

[[Scalability of software systems]]

### Sources
- [How to cold start fast a java service on k8s (EKS)](https://itnext.io/how-to-cold-start-fast-a-java-service-on-k8s-eks-3a7b4450845d)
    - how to measure the time it takes to launch a java* container? 
	- how to measure the time/resources it takes for the JVM to start?
	- how to measure the time it take to launch a java HTTP server
- [[Optimizing docker images]] for faster image download
- [Google best practices](https://cloud.google.com/solutions/best-practices-for-running-cost-effective-kubernetes-applications-on-gke#mixing_hpa_and_vpa)

#published 