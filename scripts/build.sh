#!/bin/bash

# Build script for Voidcast project
# Builds Go daemon, Node.js CLI, and Next.js web app

set -e

echo "Building Voidcast..."

# Build Go daemon
echo "Building Go daemon..."
cd "$(dirname "$0")/.."
go build -o bin/voidcastd ./cmd/voidcastd

# Build Node.js CLI
echo "Building Node.js CLI..."
cd cli
if [ ! -d "node_modules" ]; then
    echo "Installing CLI dependencies..."
    yarn install
fi
yarn build
cd ..

# Build Next.js web app
echo "Building Next.js web app..."
cd web
if [ ! -d "node_modules" ]; then
    echo "Installing web dependencies..."
    yarn install
fi
yarn build
cd ..

echo "Build complete!"
echo "Binaries are in ./bin/"
echo "CLI is in ./cli/dist/"
echo "Web app is in ./web/.next/"

