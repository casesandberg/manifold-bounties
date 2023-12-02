'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog'
import { Input } from './ui/Input'
import { setAuthCookie } from '@/lib/auth'
import { useRouter } from 'next/router'

export function AuthDialog({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const [key, setKey] = useState('')
  const router = useRouter()

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
            setAuthCookie(key)
            router.reload()
          }}
        >
          Save Key
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
