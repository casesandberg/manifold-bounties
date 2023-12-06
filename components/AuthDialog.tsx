'use client'

import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/Dialog'
import { Input } from './ui/Input'
import { Alert, AlertDescription } from './ui/Alert'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Label } from './ui/Label'

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

        <Alert>
          <InfoCircledIcon className="h-5 w-5" />
          <AlertDescription>
            We never store your api key on a server, it is only ever stored on your device.
          </AlertDescription>
        </Alert>

        <Label>Manifold api key</Label>
        <Input placeholder="XXXXXXXX-XXXX..." autoComplete="off" value={key} onChange={(e) => setKey(e.target.value)} />

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
