import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { Project } from '../src/entities/project/model/types'

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Proyecto 1',
    description: 'Descripción del proyecto. Una aplicación moderna que resuelve un problema real con tecnología de vanguardia.',
    siteUrl: '#',
    tags: ['Vue.js', 'TypeScript'],
  },
  {
    id: 'project-2',
    title: 'Proyecto 2',
    description: 'Descripción del proyecto. Plataforma serverless escalable con integración de APIs externas y diseño responsivo.',
    siteUrl: '#',
    tags: ['Node.js', 'Vercel'],
  },
  {
    id: 'project-3',
    title: 'Proyecto 3',
    description: 'Descripción del proyecto. Herramienta de productividad con interfaz intuitiva y experiencia de usuario excepcional.',
    siteUrl: '#',
    tags: ['Vite', 'Tailwind CSS'],
  },
  {
    id: 'project-4',
    title: 'Proyecto 4',
    description: 'Descripción del proyecto. Sistema con arquitectura de componentes bien definida y cobertura de tests completa.',
    siteUrl: '#',
    tags: ['Playwright', 'Vitest'],
  },
]

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ projects })
}
