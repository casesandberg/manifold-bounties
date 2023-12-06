'use client'

import { useRef, useState } from 'react'
import Tiptap, { EditorRef } from './Tiptap'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Content } from '@tiptap/react'
import { useAuth } from '@/lib/auth'
import { addComment } from '@/lib/manifold'
import { useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'

export function AddCommentBox({ bountyId }: { bountyId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState<Content>({})
  const [activeTags, setActiveTags] = useState<string>('')
  const { authKey, requestAuth } = useAuth()
  const router = useRouter()
  const editorRef = useRef<EditorRef>(null)

  const handleAddComment = () => {
    if (!authKey) {
      requestAuth()
      return
    }

    setIsLoading(true)

    console.log(content)

    if (activeTags && content && typeof content !== 'string' && 'content' in content) {
      content.content?.unshift({
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text:
                  activeTags === 'also'
                    ? 'I also think...'
                    : activeTags === 'interested'
                      ? 'I am interested in working on this'
                      : activeTags === 'started'
                        ? 'I am actively working on this'
                        : activeTags === 'finished'
                          ? 'I have finished'
                          : '',
              },
            ],
          },
        ],
      })
    }

    addComment(bountyId, content)
      .then(() => {
        editorRef.current?.clear()
        router.refresh()
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  return (
    <div>
      <div className="mb-2 flex flex-row flex-wrap gap-2">
        <Badge
          className="cursor-pointer"
          variant={activeTags === 'also' ? 'default' : 'secondary'}
          onClick={() => (activeTags === 'also' ? setActiveTags('') : setActiveTags('also'))}
        >
          I also think...
        </Badge>
        <Badge
          className="cursor-pointer"
          variant={activeTags === 'interested' ? 'default' : 'secondary'}
          onClick={() => (activeTags === 'interested' ? setActiveTags('') : setActiveTags('interested'))}
        >
          I am interested in working on this
        </Badge>
        <Badge
          className="cursor-pointer"
          variant={activeTags === 'started' ? 'default' : 'secondary'}
          onClick={() => (activeTags === 'started' ? setActiveTags('') : setActiveTags('started'))}
        >
          I am actively working on this
        </Badge>
        <Badge
          className="cursor-pointer"
          variant={activeTags === 'finished' ? 'default' : 'secondary'}
          onClick={() => (activeTags === 'finished' ? setActiveTags('') : setActiveTags('finished'))}
        >
          I have finished
        </Badge>
      </div>
      <Tiptap
        placeholder="Write a comment."
        className="border-1 min-h-[100px] border px-4 py-2 focus-within:border-primary"
        onChange={setContent}
        editorRef={editorRef}
      />
      <div className="mt-2 flex flex-row justify-end">
        <Button variant="secondary" size="sm" onClick={handleAddComment} disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Add Comment
        </Button>
      </div>
    </div>
  )
}
