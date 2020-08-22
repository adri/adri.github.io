There are tools like `kubectl debug` that can start a tcpdump, however I wasn't able to start the tool for multiple pods at the same time. Becauase of an error that happend only sometimes, I needed to get a tcpdump on multiple pods of a deployment.

Example call:
`tcpdump -w /proc/1/root/tmp/trace.pcap -i eth0 -nn "src 172.31.80.74 or dst 172.31.80.74"`

`-nn` doesn't  resolve IPs or ports
`"src 172.31.80.74 or dst 172.31.80.74"` limits Redis communication

This script gets the host and the container ID of a given pod and then connects to that host, runs tcpdump on it and when stopped using ctrl + c it downloads and deletes the pcap file.

```bash
#!/usr/bin/env bash
# Usage:
# bash tcpdump-pod.sh name-of-pod

remote() {
  ssh -i ~/.ssh/k8s_prod_id_rsa -oStrictHostKeyChecking=no -o IdentitiesOnly=yes -o ServerAliveInterval=60 -o ProxyCommand="ssh -W %h:%p -o ServerAliveInterval=60 bastion.k8s.ticketswap.com" ec2-user@$1 $2
}

remote_cp() {
  scp -i ~/.ssh/k8s_prod_id_rsa -o IdentitiesOnly=yes -o ProxyCommand="ssh -W %h:%p bastion.k8s.ticketswap.com" ec2-user@$1:$2 $2
}

download_pcap() {
  remote_cp $hostIP $pod.pcap
  remote $hostIP "rm $pod.pcap"

  echo "Downloaded to $pod.pcap and removed from server"

  exit 0;
}
trap download_pcap INT

set -ex
pod=$1
hostIP=$(kubectl get pod $pod -o json | jq -r .status.hostIP)
containerID=$(kubectl get pod $pod -o json | jq -r '.status.containerStatuses[] | select(.name == "php") | .containerID' | sed 's/^docker:\/\///g')
interfaceID=$(remote $hostIP "docker exec $containerID /bin/bash -c 'cat /sys/class/net/eth0/iflink'")
eniID=$(remote $hostIP "sudo ip link |grep ^$interfaceID: | sed -nE 's/[0-9]+: (.*)@.*/\1/p'")
remote $hostIP "sudo yum install tcpdump -y"
remote $hostIP "sudo rm -fr $pod.pcap || true"
remote $hostIP "sudo tcpdump -nn 'src 172.31.80.74 or dst 172.31.80.74' -w $pod.pcap -i $eniID"
```

#published #kubernetes #tool #script #performance
