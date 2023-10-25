"use client"
import AdjustProdQuantity from '@/components/cart/adjust-prod-quantity'
import React from 'react'

export default function Page() {
  return (
    <div><AdjustProdQuantity cartId='1' quantity={5} /></div>
  )
}
