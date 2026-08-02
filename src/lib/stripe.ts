import { loadStripe } from '@stripe/stripe-js'

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
export const stripePromise = loadStripe(stripeKey)

export const PRICE_IDS = {
  pro: import.meta.env.VITE_STRIPE_PRO_PRICE_ID || 'price_pro_placeholder',
  business: import.meta.env.VITE_STRIPE_BUSINESS_PRICE_ID || 'price_business_placeholder',
} as const

export const CREDIT_PACK_PRICES: Record<string, string> = {
  pack_500: import.meta.env.VITE_STRIPE_PACK_500_ID || 'price_500_placeholder',
  pack_2000: import.meta.env.VITE_STRIPE_PACK_2000_ID || 'price_2000_placeholder',
  pack_10000: import.meta.env.VITE_STRIPE_PACK_10000_ID || 'price_10000_placeholder',
}
