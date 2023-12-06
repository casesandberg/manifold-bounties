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
          <DialogTitle>We need your Manifold api key to continue.</DialogTitle>
          <DialogDescription>
            Navigate to bottom of your{' '}
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href="https://manifold.markets/profile"
              target="_blank"
            >
              Manifold Profile
            </a>{' '}
            to locate it.
          </DialogDescription>
        </DialogHeader>

        <Input type="password" placeholder="XXXXXXXX-XXXX..." value={key} onChange={(e) => setKey(e.target.value)} />
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
