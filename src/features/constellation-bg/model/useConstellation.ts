import { ref, onMounted, onUnmounted } from 'vue'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export function useConstellation(canvasRef: { value: HTMLCanvasElement | null }) {
  let animationId: number
  const nodes = ref<Node[]>([])
  const mouse = { x: -1000, y: -1000 }

  const MAX_DIST = 150
  const MOUSE_DIST = 120
  const NODE_COUNT = 80

  function initNodes(width: number, height: number) {
    nodes.value = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  }

  function draw() {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    const ns = nodes.value

    // Update positions
    for (const node of ns) {
      node.x += node.vx
      node.y += node.vy

      if (node.x < 0 || node.x > width) node.vx *= -1
      if (node.y < 0 || node.y > height) node.vy *= -1

      // Mouse repulsion
      const dx = node.x - mouse.x
      const dy = node.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_DIST) {
        const force = (MOUSE_DIST - dist) / MOUSE_DIST
        node.vx += (dx / dist) * force * 0.5
        node.vy += (dy / dist) * force * 0.5
      }

      // Speed limit
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
      if (speed > 1.2) {
        node.vx = (node.vx / speed) * 1.2
        node.vy = (node.vy / speed) * 1.2
      }
    }

    // Draw connections
    for (let i = 0; i < ns.length; i++) {
      for (let j = i + 1; j < ns.length; j++) {
        const dx = ns[i].x - ns[j].x
        const dy = ns[i].y - ns[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25
          ctx.beginPath()
          ctx.moveTo(ns[i].x, ns[i].y)
          ctx.lineTo(ns[j].x, ns[j].y)
          ctx.strokeStyle = `rgba(124, 106, 247, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
    }

    // Draw nodes
    for (const node of ns) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(160, 160, 184, ${node.opacity})`
      ctx.fill()
    }

    animationId = requestAnimationFrame(draw)
  }

  function resize() {
    const canvas = canvasRef.value
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initNodes(canvas.width, canvas.height)
  }

  function onMouseMove(e: MouseEvent) {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  onMounted(() => {
    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
  })
}
