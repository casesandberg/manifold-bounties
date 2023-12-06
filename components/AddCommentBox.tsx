'use client'

import { useState } from 'react'
import Tiptap from './Tiptap'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

export function AddCommentBox() {
  const [activeTags, setActiveTags] = useState<string>('')

  return (
    <div>
      <div className="mb-2 flex flex-row gap-2">
        <Badge
          className="cursor-pointer"
          variant={activeTags === 'also' ? 'default' : 'outline'}
          onClick={() => setActiveTags('also')}
        >
          I also think...
        </Badge>
        <Badge
          className="cursor-pointer"
          variant={activeTags === 'interested' ? 'default' : 'outline'}
          onClick={() => setActiveTags('interested')}
        >
          I am interested in working on this
        </Badge>
        <Badge
          className="cursor-pointer"
          variant={activeTags === 'started' ? 'default' : 'outline'}
          onClick={() => setActiveTags('started')}
        >
          I am actively working on this
        </Badge>
        <Badge
          className="cursor-pointer"
          variant={activeTags === 'finished' ? 'default' : 'outline'}
          onClick={() => setActiveTags('finished')}
        >
          I have finished this
        </Badge>
      </div>
      <Tiptap placeholder="Write a comment." className="comment-creator border-1 border focus-within:border-primary" />
      <div className="mt-2 flex flex-row justify-end">
        <Button variant="secondary" size="sm">
          Add Comment
        </Button>
      </div>
    </div>
  )
}
