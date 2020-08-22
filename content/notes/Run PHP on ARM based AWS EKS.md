Amazon has published a blog post [Improving performance of PHP for Arm64 and impact on AWS Graviton2 based EC2 instances](https://aws.amazon.com/blogs/compute/improving-performance-of-php-for-arm64-and-impact-on-amazon-ec2-m6g-instances/) that shows 20% cheaper ARM based instances with better performance.

### ARM 
* ARM is a company that develops and sells the ARM processor architecture. 
* ARM uses **RISC** (reduced instruction set computing)
* Intel and AMD use **CISC** (complex instruction set computing)

### RISC vs CISC example
A comparison of the pros and cons between the two approaches:

| RISC | CISC |
|  :-: | :-: |
| Focus on software | Focus on hardware  |
| Simple instructions (single-clock) | Complex  instructions (multi-clock)|
| Large assembly code size | Small assembly code size |
|  Lower power usage | Higher power usage |
|  Slower compile times | Faster compile times |

Many years ago the RAM price was very high, so CISC had advantages because it uses less instructions. The price of RAM has decreased and compilers have become smarter making RISC the better architecture now.

### RISC vs CISC example
Some background on CPU architecture to understand the trade-offs between the two.

Example:

`a = a * b`

RISC uses only basic commands, leading to many instructions:

```asm6502
LOAD A, 2:3  ; `2:3` is the where the value `a` is stored
LOAD B, 5:2  ; `5:2` is the where the value `b` is stored
PROD A, B    ; multiply 
STORE 2:3, A ; store back in `a`
```

CISC uses complex commands that are implemented in hardware:

```asm6502
MULT 2:3, 5:2 ; all in one instruction
```

### Why isn't RISC the standard?
* Missing software support (Windows was designed for CISC)
* Little commercial interest meant less chips produced and higher prices for ARM based chips
* Intel did a lot of work to make CISC good

### Cloud providers  
On AWS a `m6g.4xlarge` costs 20% less than a `m5.4xlarge` and is up to 40% faster. 

### Steps to run PHP on ARM on AWS EKS
* Server needs to run on ARM in AWS EKS
* Kubernetes tools needs to run on ARM in AWS EKS
* Software needs to compile to ARM 
* Container needs to be built to ARM on CI

### Findings
* New Relic doesn't have ARM builds:  
[Vote for the feature here](https://discuss.newrelic.com/t/feature-request-arm-architecture-support/23244/11)
* CircleCI doesn't have ARM support. But images can be built via `docker buildx`. That's slow because it's emulated but at least it works
* Most things seem to be available on ARM!

### Use AWS EKS AMI with ARM
A AWS EKS AMI image can be retrieved using this command:
```
aws ssm get-parameter --name /aws/service/eks/optimized-ami/1.16/amazon-linux-2-arm64/recommended/image_id --region eu-west-1 --query "Parameter.Value" --output text
```

A node group with that image needs to be added. Using the option 
`--register-with-taints=dedicated=arm64:NoSchedule` is recommended so no pods are scheduled on these nodes. 

When running node groups with x86 and arm64 containers at the same time, the Kubernetes tools like kube-proxy and Amazon VPC CNI Plugin need to be deployed on the arm64 nodes. The [AWS guide to enable ARM support](https://docs.aws.amazon.com/eks/latest/userguide/arm-support.html#enable-arm-support) has all YAML definitions. The names and labels need to be changed to not conflict with the existing x86 versions. This step might be skipped in the future when the images can support multiple architectures. 

Pods can be given a toleration and affinity to be scheduled on an ARM node:

```yaml
  tolerations:
    - effect: NoSchedule
      key: dedicated
      operator: Equal
      value: arm64
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
         - matchExpressions:
           - key: "kubernetes.io/os"
             operator: In
             values:
              - linux
           - key: "kubernetes.io/arch"
             operator: In
             values:
              - arm64
           - key: "eks.amazonaws.com/compute-type"
             operator: NotIn
             values:
               - fargate    
```


### Build docker container
To build a container that supports multiple architectures:

1. Use docker edge version
2. Create a new builder
    ```bash
    docker buildx create --name mybuilder
    ```
3. Use the new builder
    Build images for x86 and arm64 architectures:

    Base image:
    ```
    docker buildx build --platform linux/amd64,linux/arm64 -t adri/test:base-arm -f etc/php7-fpm/Dockerfile.base --push .
    ```

    Main image:

    ```
    docker buildx build --platform linux/amd64,linux/arm64 -t adri/test:arm-test -f etc/php7-fpm/Dockerfile --push .
    ```

### Sources
- [Building Multi-Arch Images for Arm and x86 with Docker Desktop](https://www.docker.com/blog/multi-arch-images/)
- [Improving performance of PHP for Arm64 and impact on AWS Graviton2 based EC2 instances](https://aws.amazon.com/blogs/compute/improving-performance-of-php-for-arm64-and-impact-on-amazon-ec2-m6g-instances/)
- [What is ARM](https://www.androidcentral.com/what-arm-cpu)
- [RISC vs CISC](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2000-01/risc/risccisc/)

#published 