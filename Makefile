.PHONY: build build-go build-cli build-web dev clean install test

# Build all components
build: build-go build-cli build-web

# Build Go daemon
build-go:
	@echo "Building Go daemon..."
	@mkdir -p bin
	@go build -o bin/voidcastd ./cmd/voidcastd

# Build Node.js CLI
build-cli:
	@echo "Building Node.js CLI..."
	@cd cli && yarn install && yarn build

# Build Next.js web app
build-web:
	@echo "Building Next.js web app..."
	@cd web && yarn install && yarn build

# Development mode
dev:
	@./scripts/dev.sh

# Install all dependencies
install:
	@echo "Installing Go dependencies..."
	@go mod download
	@echo "Installing CLI dependencies..."
	@cd cli && yarn install
	@echo "Installing web dependencies..."
	@cd web && yarn install

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf bin/
	@rm -rf cli/dist/
	@rm -rf cli/node_modules/
	@rm -rf web/.next/
	@rm -rf web/node_modules/
	@rm -rf web/out/

# Run tests
test:
	@echo "Running Go tests..."
	@go test ./...
	@echo "Running CLI tests..."
	@cd cli && yarn test || true
	@echo "Running web tests..."
	@cd web && yarn test || true

