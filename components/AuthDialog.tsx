'use client'

import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/Dialog'
import { Input } from './ui/Input'

export function AuthDialog({
  isVisible,
  onClose,
  onSubmit,
}: {
  isVisible: boolean
  onClose: () => void
  onSubmit: (authKey: string) => void
}) {
  const [key, setKey] = useState('')

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>To increase bounty, add your Manifold api key</DialogTitle>
          <DialogDescription>
            Enter your{' '}
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href="https://manifold.markets/profile"
              target="_blank"
            >
              Manifold API key
            </a>{' '}
            to add mana to bounty proposals.
          </DialogDescription>
        </DialogHeader>

        <Input placeholder="XXXXXXXX-XXXX..." value={key} onChange={(e) => setKey(e.target.value)} />
        <DialogClose
          onClick={() => {
            onSubmit(key)
          }}
        >
          Save Key
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
