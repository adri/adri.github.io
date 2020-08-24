When using the Terraform EKS module to manage a AWS EKS cluster, it needs access to the Kubernetes API. When running on Terraform Cloud, unfortunately there is no static IP address that can be used to restrict the Kubernetes APIs public access.

Unless you host your own Terraform workers in your own VPC, access to the Kubernetes API is needed.

### Manage Resources that need API access yourself
Actually the only reason why Kubernetes API access is needed, is that Terraform manages the ConfigMap "aws_auth".

This configuration file can be managed by yourself instead. These settings can be used on the EKS module to avoid Terraform connecting to the Kubernetes API:

```
// Avoid Terraform connecting to the Kubernetes cluster API.
// Because Terraform workers don't run in our VPC, we would need to make our cluster accessible publicly.
manage_aws_auth  = "false"
write_kubeconfig = "false"
```

To not actually delete the ConfigMap, the ConfigMap key can be manually deleted:
```
terraform state rm 'module.cluster-name.kubernetes_config_map.aws_auth[0]'
```

See [[Delete key from Terraform Cloud state]].

#published 