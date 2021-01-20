Some [[Domain events]] can trigger many users hitting a website. For example when a notification about popular content is sent out to a large amount of devices. When the notifications are sent out, it is already clear that a scale-up is needed. Instead of waiting for users to hit the website and scaling-up then, why not scale before?

### HPA
Kubernetes has a Horizontal Pod Autoscaler (HPA) which is responsible for scaling based on metrics. HPAs can use external metrics to scale. 
A condition can be added to the HPA to scale when the average value of a domain metrics is higher than x.
For example:
- `avg(notifications_scheduled)` 0 -> keep replicas as is
- `avg(notifications_scheduled)` 100 -> keep replicas as is
- `avg(notifications_scheduled)` 10000 -> scale up 10 pods

The average per minute will go down eventually, then pods can be scaled down if other conditions allow it.

### Domain events
When a notification is sent out, count the number of devices and increase the `notifications_scheduled` metric.

#published