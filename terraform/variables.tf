variable "grafana_auth" {
  type      = string
  sensitive = true
  default   = "admin:admin" // !!! USE remote execution
}

variable "grafana_url" {
  type    = string
  default = "http://localhost:3005"
}

variable "nebula_loki_url" {
  type = string
  default = "http://nebula-loki:3100"
} 

variable "prometheus_datasource_url" {
  type        = string
  default = "http://prometheus-server:9090"
}