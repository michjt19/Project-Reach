#!/bin/bash

"""
Purpose: Install HTML and XML linting dependencies for this project.
Inputs: None.
Outputs: Installs tidy and libxml2-utils via apt-get.
Complexity: O(1) per package installation.
"""

set -euo pipefail

sudo apt-get update
sudo apt-get install -y tidy libxml2-utils

