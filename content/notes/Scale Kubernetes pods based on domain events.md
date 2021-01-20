Some [[Domain events]] can trigger many users hitting a website. For example when a notification about popular content is sent out to a large amount of devices. When the notifications are sent out, it is already clear that a scale-up is needed. Instead of waiting for users to hit the website and scaling-up then, why not scale before?

### Domain events
Before a notification is sent out, count the number of devices and increase the `notification_scheduled` counter.

### Prometheus
To be able to scale based on metrics, the metric needs to be made available for Kubernetes. Using Prometheus that can be done using the [k8s-prometheus-adapter](https://github.com/DirectXMan12/k8s-prometheus-adapter). 

The Prometheus query is made available as `notification_scheduled` in the k8s-prometheus-adapter configuration.

```yaml
  - seriesQuery: '{__name__=~"^website:notification_scheduled$"}'
    name:
      as: "notification_scheduled"
    metricsQuery: 'website:notification_scheduled'
```

To check if it works, the raw external metrics can be retrieved like this:

```bash
kubectl get --raw /apis/external.metrics.k8s.io/v1beta1/ | jq .
```

This should list the new metric. If not, it can be that the metric is not available in Prometheus. The debug mode of the k8s-prometheus-adapter can help to find the exact query that is done. To enable the debug mode start the container with the argument `-v10`.

It can be that the metric is sometimes showing up and sometimes missing. Some programming languages like PHP are stateless and don't register metrics beforehand. When a new deployment happens, all metrics are lost and only show up when triggered again. To get around that issue, a rule can be defined in Prometheus which periodically evaluates a query and provides a default value if missing. Such a rule can be added in the Prometheus configuration:  

```yaml
  - name: website
    groups:
      - name: website
        interval: "1s"
        rules:
          - record: website:notification_scheduled
            expr: sum(avg_over_time(notification_scheduled[1m])) or vector(0)
```


### HPA
Kubernetes has a Horizontal Pod Autoscaler (HPA) which is responsible for scaling based on metrics. HPAs can use external metrics to scale. 
A condition can be added to the HPA to scale when the target average value of a domain metrics is higher than x.

```yaml
  - type: External
    external:
      metricName: notification_scheduled
      # The targetAverageValue controls the scaling factor.
      # Think of this like "how many notifications one pod can handle".
      # Example: Consider a spike of 10 000 notifications. 10 000 / targetAverageValue additional pods will be started.
      targetAverageValue: 600
```

The average will go down eventually, then pods can be scaled down if other conditions allow it.

#published