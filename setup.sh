#!/usr/bin/env bash
latest="$(curl -L -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" https://api.github.com/repos/nvm-sh/nvm/releases/latest | jq -r '.html_url' | awk -F/ '{print $8}')"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/"$latest"/install.sh | bash

\. "$HOME/.nvm/nvm.sh"

nvm install --lts