#!/bin/bash
# Helper shell script to setup (mainly) the kaltura client dependency - which for whatever reason
# is not available via NPM and you have to download and build yourself.
#
# Should probably be converted to a Node.js script so that it can be platform independent.

PROJECT_DIR=$(pwd)
CLIENT_BUILD_DIR=kaltura-typescript-client
DIST_FILE_PREFIX=kaltura-typescript-client-7.0.2

# Make sure we start clean
rm -rf $CLIENT_BUILD_DIR

# Download, build and NPM install
wget -O - https://github.com/kaltura/KalturaGeneratedAPIClientsTypescript/archive/v17.2.0.tar.gz | \
  tar --transform="s/KalturaGeneratedAPIClientsTypescript-17.2.0/$CLIENT_BUILD_DIR/" -zxv && \
  cd $CLIENT_BUILD_DIR && \
  npm install && \
  npm run deploy && \
  mv dist/$DIST_FILE_PREFIX*.tgz "$PROJECT_DIR"
  cd "$PROJECT_DIR" && \
  npm install file:$(echo $DIST_FILE_PREFIX*.tgz)
  (echo "Failed to setup Kaltura Typescript Client, aborting..."; exit 1;)