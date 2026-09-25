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

resource "grafana_data_source" "data_source" {
  type                = var.datasource_type
  name                = var.name
  url                 = var.url
  basic_auth_enabled  = var.basic_auth_username != "" ? true : false
  basic_auth_username = var.basic_auth_username

  json_data_encoded = jsonencode(merge(
    {
      httpMethod = var.http_method
    },
    var.additional_json_data
  ))

  # Only includes the secure block if a password is provided
  secure_json_data_encoded = var.basic_auth_password != "" ? jsonencode({
    basicAuthPassword = var.basic_auth_password
  }) : null
}
