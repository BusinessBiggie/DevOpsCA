#TODO: Write a better readme


## K8s

For this port forwarding are needed!

this can be done this way:

`kubectl port-forward pod/backend-788d95c49d-j56l4  5000:8080`

`kubectl port-forward pod/frontend-cd584f945-lv5b5 8080:80`

replace the part behind pod/ with the pod ID which can be found with the minikube dashboard `minikube dashboard --url &`
