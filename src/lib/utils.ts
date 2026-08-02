import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCredits(amount: number): string {
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}k`
  return String(amount)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export const TIERS = {
  free: { name: 'Free', credits: 100, price: 0, features: ['10 AI prompts/day', '1 active project', 'Community support'] },
  pro: { name: 'Pro', credits: 5000, price: 29, features: ['Unlimited prompts', '10 active projects', 'GitHub sync', 'Priority support'] },
  business: { name: 'Business', credits: 20000, price: 99, features: ['Everything in Pro', 'Unlimited projects', 'Team collaboration', 'Custom integrations', 'Dedicated support'] },
} as const

export const CREDIT_PACKS = [
  { credits: 500, price: 5, id: 'pack_500' },
  { credits: 2000, price: 15, id: 'pack_2000' },
  { credits: 10000, price: 59, id: 'pack_10000' },
]
