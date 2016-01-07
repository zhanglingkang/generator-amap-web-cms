#!/bin/bash

if hash tnpm 2>/dev/null; then
   echo "tnpm installed"
else
    npm i  tnpm --registry=http://registry.npm.alibaba-inc.com
fi

__DIRNAME__=$(cd "$(dirname "$0")"; pwd)

cd "$__DIRNAME__"

envType=$1
__ENV__=daily
case $envType in
    daily )
    #日常环境
    __ENV__=daily
    ;;
    prepub )
    #预发环境pre
    __ENV__=production
    ;;
    publish )
    __ENV__=production
    ;;
    * )
    #项目环境
    ;;
esac

NODE_BIN_DIR=$(cd ../node_modules/.bin/;pwd)

export PATH=${NODE_BIN_DIR}:/bin:/usr/bin:$PATH

tnpm i

cd "${__DIRNAME__}/../";gulp -p;

cd "${__DIRNAME__}../app/config";cp config_${__ENV__}.js config.js


