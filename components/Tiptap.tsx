'use client'

import Link from '@tiptap/extension-link'
import {
  useEditor,
  EditorContent,
  Content,
  Node,
  mergeAttributes,
  ReactNodeViewRenderer,
  NodeViewWrapper,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { Suspender } from './Suspender'
import Placeholder from '@tiptap/extension-placeholder'
import { Mention } from '@tiptap/extension-mention'
import { Image } from '@tiptap/extension-image'

export type TiptapProps = {
  content?: Content
  placeholder?: string
  editable?: boolean
  className?: string
}

const Tiptap = ({ content, placeholder, editable, className }: TiptapProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const editor = useEditor({
    extensions: [
      Image.extend({ renderText: () => '[image]' }),
      Mention.extend({
        name: 'contract-mention',
        HTMLAttributes: {
          class: 'bg-border',
        },
      }),
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder,
      }),
    ],
    onBeforeCreate({ editor }) {
      // Before the view is created.
    },
    onCreate({ editor }) {
      // The editor is ready.
      setIsLoading(false)
    },
    content,
    editable,
    editorProps: {
      attributes: {
        class:
          'prose prose-p:text-muted-foreground prese-a:underline prose-a:text-foreground prose-a:opacity-75 prose-p:my-1 prose-ul:my-0 dark:prose-invert prose-sm sm:prose-base focus:outline-none',
      },
    },
  })

  return <EditorContent editor={editor} className={className} />
}

export default Tiptap
