#------------------------------------------------------------------------------#
# Grafana Provider Configuration for avoid error like 
# Could not retrieve the list of available versions for provider hashicorp/grafana: provider registry
# registry.terraform.io does not have a provider named registry.terraform.io/hashicorp/grafana                                                
#------------------------------------------------------------------------------#
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 3.0"
    }
  }
}

resource "grafana_dashboard" "dashboard" {

  for_each = fileset("${path.module}/templates/${var.dashboard_folder_path}", "*.json")

  folder = var.grafana_folder_id
  config_json = templatefile("${path.module}/templates/${var.dashboard_folder_path}/${each.key}", {
    DS_PROMETHEUS  = var.prometheus_datasource_name != "" ? var.prometheus_datasource_name : null
    DASHBOARD_NAME = var.dashboard_name
    DS_LOKI        = var.loki_datasource_name != "" ? var.loki_datasource_name : null
    PROMETHEUS_UID = var.prometheus_datasource_uid != "" ? var.prometheus_datasource_uid : null
    LOKI_UID       = var.loki_datasource_uid != "" ? var.loki_datasource_uid : null
  })
}
