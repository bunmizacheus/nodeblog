#!/bin/sh

export db="mongodb://localhost/nodejsblog"

echo "Installing modules for Server"
cd server/ && npm i

echo "Installing modules for Client"
cd ../client/ && npm i

echo "Starting Server and Client..."
cd ../server/ && nodemon &
cd ../client/ && npm start

wait
