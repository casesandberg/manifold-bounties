'use client'

import Link from '@tiptap/extension-link'
import { useEditor, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { Suspender } from './Suspender'
import Placeholder from '@tiptap/extension-placeholder'

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
  })

  return <EditorContent editor={editor} className={className} />
}

export default Tiptap
