provider "grafana" {
  url  = var.grafana_url
  auth = var.grafana_auth
}

module "grafana_folder" {
  source               = "./modules/grafana/folder"
  grafana_folder_title = "Nebula"
}

module "prometheus" {
  source          = "./modules/grafana/datasource"
  datasource_type = "prometheus"
  name            = "Prometheus"
  url             = var.prometheus_datasource_url
}

module "loki" {
  source          = "./modules/grafana/datasource"
  datasource_type = "loki"
  name            = "Nebula Loki"
  url             = var.nebula_loki_url
}

module "grafana_nebula_dashboard" {
  source            = "./modules/grafana/dashboard"
  grafana_folder_id = module.grafana_folder.folder_id

  dashboard_folder_path = "nodejs"
  dashboard_name        = "Nebula Server"

  loki_datasource_name       = module.loki.datasource_name
  prometheus_datasource_name = module.prometheus.datasource_name

  prometheus_datasource_uid = module.prometheus.datasource_uid
  loki_datasource_uid       = module.loki.datasource_uid

  depends_on = [module.prometheus, module.loki]
}
