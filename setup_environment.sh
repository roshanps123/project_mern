#!/usr/bin/env bash
set -euo pipefail

# 1) Update package list
sudo apt-get update -y

# 2) Install git + docker + docker compose plugin
sudo apt-get install -y git docker.io docker-compose-plugin

# 3) Start Docker and enable it on boot
sudo systemctl enable --now docker

# 4) Allow current user to run docker without sudo

sudo usermod -aG docker "$USER"

# 5) Create required directory structure
sudo mkdir -p /opt/project_mern/app /opt/project_mern/data

# Optional: allow your user to manage these directories without sudo
sudo chown -R "$USER":"$USER" /opt/project_mern

# 6) Print success message with versions
echo "SUCCESS: Environment ready."
echo "Git:    $(git --version)"
echo "Docker: $(docker --version)"
echo "Compose: $(docker compose version)"
echo "Created: /opt/project_mern/app and /opt/project_mern/data"
echo "NOTE: If 'docker ps' fails without sudo, log out and log back in, then retry."
