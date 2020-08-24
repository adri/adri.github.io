Sometimes it can be necessary to change a key in the Terraform Cloud state without changing the Terraform files. 

1. Change the `backend.tf` definition to:
```
terraform {
  backend "remote" {
    organization = "org"
    hostname = "app.terraform.io"

    workspaces {
      name = "workspace"
    }
  }
}
```
2. Ensure your `~/.terraformrc` is available
```
credentials "app.terraform.io" {
  token = "token from https://app.terraform.io/app/settings/tokens"
}
```
3. Test if the connection works
``` 
terraform state list
```
4. Remove the actual key 
```
terraform state rm 'module.something.something_config_map.auth[0]'
```
5. When done, remove the `~/.terraformrc` file and undo the `backend.tf` changes to avoid accidents

#published