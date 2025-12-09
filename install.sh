#!/bin/bash

cd "$(dirname "$0")"

cp -v ubuntu/firefox-ftl.desktop ~/.local/share/applications/
xdg-mime default firefox-ftl.desktop x-scheme-handler/ftl
xdg-mime default firefox-ftl.desktop x-scheme-handler/ftls

#sudo mkdir -p /etc/opt/edge/policies/managed
#sudo cp -v edge/* /etc/opt/edge/policies/managed/

sudo mkdir -p /etc/opt/chrome/policies/{managed,recommended}
sudo bash -c 'cat <<EOF >/etc/opt/chrome/policies/managed/allow_ftl_protocol.json
{
  "URLWhitelist": [
    "ftl:*", "ftls:*",
  ],
  "URLAllowlist": [
    "ftl:*", "ftls:*",
  ]
}
EOF'