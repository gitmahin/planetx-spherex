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


resource "grafana_folder" "GrafanaFolder" {
  title = var.grafana_folder_title
}