variable "datasource_type" {
  type        = string
  description = "The type of data source (e.g. prometheus, loki)"
}

variable "name" {
  type        = string
  description = "Unique name for the data source in Grafana"
}

variable "url" {
  type        = string
  description = "The HTTP endpoint of your database/server"
}

variable "http_method" {
  type        = string
  default     = "POST"
  description = "HTTP method to use (typically POST or GET)"
}

variable "basic_auth_username" {
  type        = string
  default     = ""
  description = "Username for basic authentication"
}

variable "basic_auth_password" {
  type        = string
  default     = ""
  sensitive   = true
  description = "Password for basic authentication"
}

variable "additional_json_data" {
  type        = map(any)
  default     = {}
  description = "Type-specific settings like prometheusType or version overrides"
}
