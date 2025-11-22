package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Voidcast daemon - programmable blackhole proxy and honeypot toolkit")
		fmt.Println("Usage: voidcastd [command]")
		os.Exit(1)
	}

	command := os.Args[1]
	log.Printf("Voidcast daemon starting with command: %s", command)

	// TODO: Implement daemon logic
	fmt.Println("Daemon initialized (stub)")
}
