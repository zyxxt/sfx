#!/bin/sh

WEBROOT="${INSTALLROOT}/dc/var/www/bbc/web/"
OLD="${PATH}"
CURRENT_PWD="$(cd `dirname $0`; pwd)"

echo "\n\nadd lib to path. node, npm, phantomjs..."
NEW="${CURRENT_PWD}/lib/node-v7.2.0-linux-x64/bin/:${PATH}"
export PATH=${NEW}
NEW="${CURRENT_PWD}/lib/phantomjs-2.1.1-linux-x86_64/bin/:${PATH}"
export PATH=${NEW}

echo "\n\nchmod node, npm, phantomjs"
chmod +x ./lib/node-v7.2.0-linux-x64/bin/*
chmod +x ./lib/node-v7.2.0-linux-x64/lib/node_modules/npm/bin/*
rm -rf ./lib/node-v7.2.0-linux-x64/bin/npm
ln -s ../lib/node_modules/npm/bin/npm-cli.js ./lib/node-v7.2.0-linux-x64/bin/npm
chmod +x ./lib/phantomjs-2.1.1-linux-x86_64/bin/phantomjs

echo "\n\nclean dist..."
rm -rf ./dist
rm -rf ./node_modules/\@cgroup/
rm -rf ./node_modules/sf-vue-component/
rm -rf ./node_modules/echarts/

echo "\n\ninstall. it will cost a lot of time. please wait..."
yarn install
if [ $? -ne 0 ]; then
    echo "yarn install error!"
    exit 1
fi

echo "\n\neslint. checklist checking..."
sfx eslint
if [ $? -ne 0 ]; then
    echo "sfx eslint error!"
    exit 1
fi

echo "\n\nbuild dist..."
sfx build
if [ $? -ne 0 ]; then
    echo "sfx build error!"
    exit 1
fi
#npm run unit

export PATH="${OLD}"

echo "\n\nclean INSTALLROOT..."
rm -rf ${WEBROOT}
mkdir -p ${WEBROOT}

echo "\n\ncopy dist to INSTALLROOT..."
cp ./dist/* ${WEBROOT} -rf
if [ $? -ne 0 ]; then
    echo "copy to INSTALLROOT error!"
    exit 1
fi

# clean
rm -rf ./dist
