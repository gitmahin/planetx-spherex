terraform {
  # Remote Backend Configuration
  # Manages state locking and history in a centralized, secure environment.

  # ERROR:
  # When Grafana is hosted in the cloud, use the HCP remote backend.
  # For local storage, do not use the HCP remote backend, as it will cause a connection error with Grafana.

  # cloud {
  #   organization = "teambinary"
  #   workspaces {
  #     name    = "nebula-workspace"
  #     project = "Nebula"
  #   }
  # }

  required_version = "1.15.8"

  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 3.0"
    }
  }
}
