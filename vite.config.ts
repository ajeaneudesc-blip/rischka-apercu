import react from '@vitejs/plugin-react'
import { marked } from 'marked'
import { defineConfig, type Plugin } from 'vite'
import { parse } from 'yaml'

const markdown = (): Plugin => ({
  name: 'markdown-content',
  transform(code, id) {
    if (!id.endsWith('.md')) return
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(code)
    const data: unknown = match ? parse(match[1]) : {}
    const body = (match ? match[2] : code).trim()
    return { code: `export default ${JSON.stringify({ data: data ?? {}, body, html: marked.parse(body, { async: false }) })}`, map: null }
  },
})

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [markdown(), react()],
})
