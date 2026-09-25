variable "grafana_folder_id" {
  type = string
}

variable "dashboard_folder_path" {
  type = string
}

variable "dashboard_name" {
  type = string
}

variable "loki_datasource_name" {
  type = string
  default = ""
}

variable "prometheus_datasource_name" {
  type = string
  default = ""
}

variable "loki_datasource_uid" {
  type        = string
  default = ""
}

variable "prometheus_datasource_uid" {
  type        = string
  default = ""
}