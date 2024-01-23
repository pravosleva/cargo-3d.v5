#!/bin/bash

source ./_aux-tool.read-env.sh
source ./_aux-tool.log.sh # NOTE: See also https://opensource.com/article/20/6/bash-source-command

# PROD_TARGET_PATH_BUILD_DIR=$(read_env PROD_TARGET_PATH_BUILD_DIR .env.prod."$1")
PROD_TARGET_PATH_BUILD_DIR=$(read_env PROD_TARGET_PATH_BUILD_DIR .env.production.local)

good '-- REMOTE DEPLOY STARTED 🛫' &&

rsync -av --delete dist/ $PROD_TARGET_PATH_BUILD_DIR &&

good '-- REMOTE DEPLOY COMPLETED 🛬'
