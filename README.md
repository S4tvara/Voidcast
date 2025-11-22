# Voidcast

Voidcast is a programmable blackhole proxy and honeypot toolkit that lets developers, security engineers, and network explorers simulate, sink, replay, or redirect traffic all while staying invisible.

## Features

| Feature | Description |
|---------|-------------|
| **Sink Mode (Blackhole Sink)** | Silently drop traffic at socket or layer-7, with optional metadata logging for analysis |
| **Mirage Mode (Fake Replay Server)** | Replay fake responses to emulate real services (HTTP, TCP, etc.) |
| **Drift Mode (Dynamic Proxy)** | Dynamically proxy or redirect requests to real or decoy backends |
| **Traffic Introspection** | CLI tool to inspect, tail, and filter traffic in real time |
| **Programmable Rules** | Define matching/mutation logic via JS/Lua/DSL |
| **Deception Hooks** | Trap bots, scanners, and pentesters; log behavior or redirect to bait endpoints |

## Use Cases

- Security teams building deceptive perimeters
- Developers needing traffic mirroring, mutation, or controlled failure zones
- Interview demos to simulate misbehaving or unreleased APIs
- Capture-the-flag (CTF) hosts setting up traps or lures
- Testing networks for faulty clients, retries, edge-case handling

## Architecture

Voidcast uses a hybrid architecture:

- **Go Core**: Handles raw sockets, TCP/HTTP listeners, and performance-critical proxying
- **Node.js/TypeScript CLI**: Provides configuration, scripting, and rule engine
- **Next.js Web Interface**: React-based UI for traffic playback and analysis

This split optimizes for performance where it matters while keeping Voidcast highly programmable and approachable for users writing rules and automation.

## Project Structure

```
voidcast/
├── cmd/                    # Go executables
│   └── voidcastd/         # Core daemon
├── internal/               # Go internal packages
│   ├── engine/            # Core traffic engine
│   ├── proxy/             # Proxy logic
│   └── sink/              # Sink mode implementation
├── pkg/                    # Go public packages
│   └── api/               # RPC/API interfaces
├── cli/                    # Node.js/TypeScript CLI
├── web/                    # Next.js web interface
└── scripts/                # Bash scripts
```

## Getting Started

### Prerequisites

- Go 1.21 or later
- Node.js 18 or later
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/voidcast.git
cd voidcast
```

2. Install all dependencies:
```bash
make install
```

Or manually:
```bash
go mod download
cd cli && yarn install
cd ../web && yarn install
```

### Building

Build all components:
```bash
make build
```

Or use the build script:
```bash
./scripts/build.sh
```

Build individual components:
```bash
make build-go    # Build Go daemon
make build-cli   # Build Node.js CLI
make build-web   # Build Next.js web app
```

### Development

Start development servers:
```bash
make dev
```

Or use the dev script:
```bash
./scripts/dev.sh
```

This will start:
- Next.js dev server at http://localhost:3000
- CLI in watch mode

### Usage

#### CLI Commands

```bash
# Sink mode - silently drop traffic
voidcast sink --port 8080

# Mirage mode - replay fake responses
voidcast mirage --port 8080

# Drift mode - dynamic proxy
voidcast drift --port 8080

# Inspect traffic
voidcast inspect --filter "method=GET"
```

#### Go Daemon

```bash
# Run the daemon
./bin/voidcastd start
```
