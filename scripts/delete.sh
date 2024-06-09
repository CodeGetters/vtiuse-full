#!/bin/bash

# delete all node_modules

find . -name "node_modules" -type d -exec rm -rf {} +

echo "已删除所有 node_modules 文件夹"
