Some [[Domain events]] can trigger many users hitting a website. For example when a notification about popular content is sent out to a large amount of devices. When the notifications are sent out, it is already clear that a scale-up is needed. Instead of waiting for users to hit the website and scaling-up then, why not scale before?

### Domain events
Before a notification is sent out, count the number of devices and increase the `notifications_scheduled` counter.

### HPA
Kubernetes has a Horizontal Pod Autoscaler (HPA) which is responsible for scaling based on metrics. HPAs can use external metrics to scale. 
A condition can be added to the HPA to scale when the average value of a domain metrics is higher than x.

```yaml
  - type: External
    external:
      metricName: notification_scheduled
      # The targetAverageValue controls the scaling factor.
      # Think of this like "how many notifications one pod can handle".
      # Example: Consider a spike of 10 000 notifications. 10 000 / targetAverageValue additional pods will be started.
      targetAverageValue: 600
```

The average  will go down eventually, then pods can be scaled down if other conditions allow it.

#published