---
title: "A Deep Dive into HTTP/3 and QUIC Protocol"
date: "2026-03-17"
slug: "http3-quic-explained"
isDraft: false
tags: ["networking", "web", "protocols"]
readingTime: "7 min"
---

## What is HTTP/3?

HTTP/3 is the third major version of the HTTP protocol. Unlike its predecessors,
it runs over **QUIC** instead of TCP — which eliminates head-of-line blocking
at the transport layer.

## A simple QUIC connection in Go

```go title=main.go
package main

import (
  "context"
  "fmt"
  "github.com/quic-go/quic-go/http3"
)

func main() {
  client := &http3.RoundTripper{}
  defer client.Close()

  resp, err := client.RoundTrip(req.WithContext(context.Background()))
  if err != nil {
    fmt.Println("error:", err)
    return
  }
  fmt.Println("status:", resp.Status)
}
```

## Why it matters

QUIC establishes connections faster than TCP because it combines the transport
and TLS handshakes into a single round trip. For mobile users switching between
Wi-Fi and cellular, QUIC's connection migration means streams survive the change
without a full reconnect.

Inline code works too — `http3.RoundTripper` is the core type you interact with.
