import { useState } from 'react'
import { RefreshCw, Monitor, Smartphone, Tablet, ExternalLink, ChevronRight, ChevronDown, File, Folder, FileCode, FileJson, FileType, GitBranch, Maximize2 } from 'lucide-react'
import { cn } from '../../lib/utils'

type FileNode = { name: string; type: 'file' | 'folder'; children?: FileNode[]; ext?: string }

const FILE_TREE: FileNode[] = [
  { name: 'src', type: 'folder', children: [
    { name: 'components', type: 'folder', children: [{ name: 'App.tsx', type: 'file', ext: 'tsx' },{ name: 'Header.tsx', type: 'file', ext: 'tsx' },{ name: 'Dashboard.tsx', type: 'file', ext: 'tsx' }] },
    { name: 'pages', type: 'folder', children: [{ name: 'Home.tsx', type: 'file', ext: 'tsx' },{ name: 'Settings.tsx', type: 'file', ext: 'tsx' }] },
    { name: 'lib', type: 'folder', children: [{ name: 'supabase.ts', type: 'file', ext: 'ts' },{ name: 'stripe.ts', type: 'file', ext: 'ts' },{ name: 'utils.ts', type: 'file', ext: 'ts' }] },
    { name: 'main.tsx', type: 'file', ext: 'tsx' },{ name: 'index.css', type: 'file', ext: 'css' },
  ]},
  { name: 'supabase', type: 'folder', children: [{ name: 'migrations', type: 'folder', children: [{ name: '001_create_users.sql', type: 'file', ext: 'sql' },{ name: '002_create_projects.sql', type: 'file', ext: 'sql' }] }] },
  { name: 'package.json', type: 'file', ext: 'json' },{ name: 'vite.config.ts', type: 'file', ext: 'ts' },{ name: 'README.md', type: 'file', ext: 'md' },
]

const fileIcons: Record<string, any> = { tsx: FileCode, ts: FileCode, json: FileJson, css: FileType, sql: FileCode, md: File, default: File }

const PREVIEW_HTML = '<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter,system-ui,sans-serif;background:#0A0A0F;color:#F0F0F5}.app{padding:24px;max-width:800px;margin:0 auto}.header{display:flex;align-items:center;gap:12px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #2A2A3D}.logo{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#D4AF37,#F06292);display:flex;align-items:center;justify-content:center;font-size:18px}.title{font-size:20px;font-weight:700}.title span{background:linear-gradient(135deg,#D4AF37,#F06292);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px}.card{background:rgba(18,18,26,0.8);border:1px solid #2A2A3D;border-radius:16px;padding:20px}.card-label{font-size:12px;color:#A0A0B8;margin-bottom:8px}.card-value{font-size:28px;font-weight:700;background:linear-gradient(135deg,#D4AF37,#F06292);-webkit-background-clip:text;-webkit-text-fill-color:transparent}table{width:100%;border-collapse:collapse;margin-top:16px}th{text-align:left;padding:12px;font-size:11px;text-transform:uppercase;color:#686880;border-bottom:1px solid #2A2A3D}td{padding:12px;font-size:14px;border-bottom:1px solid rgba(42,42,61,0.5)}.badge{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600}.badge-active{background:rgba(34,197,94,0.1);color:#22C55E}.badge-pending{background:rgba(212,175,55,0.1);color:#D4AF37}</style></head><body><div class="app"><div class="header"><div class="logo">⚡</div><div class="title">Hercules<span>.ai</span> — Dashboard Preview</div></div><div class="stats"><div class="card"><div class="card-label">Total Users</div><div class="card-value">12,847</div></div><div class="card"><div class="card-label">Projects</div><div class="card-value">3,294</div></div><div class="card"><div class="card-label">Revenue</div><div class="card-value">$48.2k</div></div></div><table><tr><th>Project</th><th>Status</th><th>Last Deploy</th></tr><tr><td>SaaS Dashboard</td><td><span class="badge badge-active">Active</span></td><td>2 hours ago</td></tr><tr><td>E-Commerce Store</td><td><span class="badge badge-pending">Building</span></td><td>—</td></tr><tr><td>API Gateway</td><td><span class="badge badge-active">Active</span></td><td>1 day ago</td></tr></table></div></body></html>'

export function PreviewPage() {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'src/components', 'src/lib']))
  const [selectedFile, setSelectedFile] = useState<string>('src/components/Dashboard.tsx')
  const [previewKey, setPreviewKey] = useState(0)

  const toggleFolder = (path: string) => { setExpandedFolders((prev) => { const next = new Set(prev); next.has(path) ? next.delete(path) : next.add(path); return next }) }

  const renderTree = (nodes: FileNode[], parentPath: string = '', depth: number = 0): any => nodes.map((node) => {
    const nodePath = parentPath ? `${parentPath}/${node.name}` : node.name
    if (node.type === 'folder') return (<div key={nodePath}><button onClick={() => toggleFolder(nodePath)} className="flex items-center gap-1.5 w-full py-1 px-2 rounded hover:bg-[var(--dark-surface-2)] text-[var(--text-secondary)] hover:text-white transition-colors text-xs" style={{ paddingLeft: `${depth * 16 + 8}px` }}>{expandedFolders.has(nodePath) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}<Folder className="w-3.5 h-3.5 text-[var(--gold-500)]" />{node.name}</button>{expandedFolders.has(nodePath) && node.children && renderTree(node.children, nodePath, depth + 1)}</div>)
    const IconComponent = fileIcons[node.ext || ''] || fileIcons.default
    return (<button key={nodePath} onClick={() => setSelectedFile(nodePath)} className={cn('flex items-center gap-1.5 w-full py-1 px-2 rounded transition-colors text-xs', selectedFile === nodePath ? 'bg-[var(--gold-500)]/10 text-[var(--gold-500)]' : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--dark-surface-2)]')} style={{ paddingLeft: `${depth * 16 + 8}px` }}><IconComponent className="w-3.5 h-3.5" />{node.name}</button>)
  })

  return (
    <div className="flex h-full">
      <div className="w-56 min-w-[224px] border-r border-[var(--dark-border)] bg-[var(--dark-surface)]/60 flex flex-col"><div className="p-3 border-b border-[var(--dark-border)]"><div className="flex items-center gap-2 text-xs text-[var(--text-muted)]"><GitBranch className="w-3.5 h-3.5" /><span className="font-mono text-[10px]">main</span></div></div><div className="flex-1 overflow-y-auto py-2"><div className="px-2 mb-1 text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">Explorer</div>{renderTree(FILE_TREE)}</div></div>
      <div className="flex-1 flex flex-col">
        <div className="h-10 min-h-[40px] border-b border-[var(--dark-border)] bg-[var(--dark-surface)]/80 flex items-center justify-between px-3">
          <div className="flex items-center gap-2"><div className="flex bg-[var(--dark-surface-2)] rounded-lg p-0.5">{([{ id: 'desktop', icon: Monitor },{ id: 'tablet', icon: Tablet },{ id: 'mobile', icon: Smartphone }] as const).map(({ id, icon: I }) => (<button key={id} onClick={() => setViewMode(id)} className={cn('p-1.5 rounded-md transition-colors', viewMode === id ? 'bg-[var(--dark-bg)] text-white' : 'text-[var(--text-muted)] hover:text-white')}><I className="w-3.5 h-3.5" /></button>))}</div></div>
          <div className="flex items-center gap-2"><button onClick={() => setPreviewKey((k) => k + 1)} className="p-1.5 rounded-lg hover:bg-[var(--dark-surface-2)] text-[var(--text-muted)] hover:text-white"><RefreshCw className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg hover:bg-[var(--dark-surface-2)] text-[var(--text-muted)] hover:text-white"><ExternalLink className="w-3.5 h-3.5" /></button><button className="p-1.5 rounded-lg hover:bg-[var(--dark-surface-2)] text-[var(--text-muted)] hover:text-white"><Maximize2 className="w-3.5 h-3.5" /></button></div>
        </div>
        <div className="flex-1 bg-white"><iframe key={previewKey} srcDoc={PREVIEW_HTML} className={cn('h-full border-0 transition-all', viewMode === 'desktop' ? 'w-full' : viewMode === 'tablet' ? 'max-w-[768px] mx-auto' : 'max-w-[375px] mx-auto')} sandbox="allow-scripts" title="App Preview" /></div>
      </div>
    </div>
  )
}
