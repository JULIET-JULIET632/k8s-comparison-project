# Monitoring Setup — Prometheus + Grafana

## Installation (all clusters)

### Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

### Add Prometheus community repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

### Install kube-prometheus-stack
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

### Expose Grafana
kubectl patch svc monitoring-grafana -n monitoring -p '{"spec": {"type": "NodePort"}}'

### Expose Prometheus
kubectl patch svc monitoring-kube-prometheus-prometheus -n monitoring -p '{"spec": {"type": "NodePort"}}'

### Get Grafana password
kubectl get secret monitoring-grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode

## Key Metrics Observed

### kubeadm HA
- CPU Utilisation: 3.43%
- Memory Utilisation: 28.6%
- kube-system memory: 1.62 GiB
- App memory: 27.8 MiB

### k3s HA
- CPU Utilisation: 4.50%
- Memory Utilisation: 40.9%
- Node metrics collected via Prometheus node-exporter on all 5 nodes

## Note on k3s
k3s runs control plane components differently from kubeadm so some Grafana 
dashboards show "No data". Node-level metrics are still collected correctly 
by Prometheus node-exporter.
