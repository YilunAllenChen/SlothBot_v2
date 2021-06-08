#!/bin/bash

# usage: source env.sh

export KUBECONFIG=kubeconfig.yaml
echo $KUBECONFIG



# example usages
# kubectl get pods
# kubectl edit deployment bankly-deployment
# kubectl rollout restart deployment bankly-deployment