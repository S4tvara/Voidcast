#!/bin/bash

# Development script for Voidcast project
# Starts development servers for web and CLI watch mode

set -e

echo "Starting Voidcast development environment..."

# Start Next.js dev server in background
echo "Starting Next.js dev server..."
cd "$(dirname "$0")/../web"
if [ ! -d "node_modules" ]; then
    echo "Installing web dependencies..."
    yarn install
fi
yarn dev &
WEB_PID=$!

# Start CLI in watch mode
echo "Starting CLI in watch mode..."
cd ../cli
if [ ! -d "node_modules" ]; then
    echo "Installing CLI dependencies..."
    yarn install
fi
yarn dev &
CLI_PID=$!

echo "Development servers started!"
echo "Next.js: http://localhost:3000"
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "kill $WEB_PID $CLI_PID 2>/dev/null; exit" INT TERM
wait

