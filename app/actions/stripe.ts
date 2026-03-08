'use server'

import { stripe } from '@/lib/stripe'
import { products } from '@/lib/products'

export async function startCheckoutSession(items: { id: string; quantity: number }[]) {
  // Validate and create line items from cart
  const lineItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.id)
      if (!product) {
        throw new Error(`Product with id "${item.id}" not found`)
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: item.quantity,
      }
    })

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: lineItems,
    mode: 'payment',
  })

  return session.client_secret
}

export async function getCheckoutSessionStatus(clientSecret: string) {
  const session = await stripe.checkout.sessions.retrieve(clientSecret, {
    expand: ['payment_intent'],
  })

  return {
    status: session.payment_status,
    total: session.amount_total,
  }
}
