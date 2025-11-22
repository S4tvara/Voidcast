export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Voidcast</h1>
      <p>Programmable blackhole proxy and honeypot toolkit</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Features</h2>
        <ul>
          <li><strong>Sink Mode:</strong> Silently drop traffic at socket or layer-7</li>
          <li><strong>Mirage Mode:</strong> Replay fake responses to emulate real services</li>
          <li><strong>Drift Mode:</strong> Dynamically proxy or redirect requests</li>
          <li><strong>Traffic Introspection:</strong> Inspect, tail, and filter traffic in real time</li>
          <li><strong>Programmable Rules:</strong> Define matching/mutation logic via JS/Lua/DSL</li>
          <li><strong>Deception Hooks:</strong> Trap bots, scanners, and pentesters</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Use Cases</h2>
        <ul>
          <li>Security teams building deceptive perimeters</li>
          <li>Developers needing traffic mirroring, mutation, or controlled failure zones</li>
          <li>Interview demos to simulate misbehaving or unreleased APIs</li>
          <li>Capture-the-flag (CTF) hosts setting up traps or lures</li>
          <li>Testing networks for faulty clients, retries, edge-case handling</li>
        </ul>
      </section>
    </main>
  )
}

