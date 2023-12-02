'use client'

import Link from '@tiptap/extension-link'
import { useEditor, EditorContent, Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export type TiptapProps = {
  content: Content
  editable?: boolean
  className?: string
}

const Tiptap = ({ content, editable, className }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content,
    editable,
  })

  return <EditorContent editor={editor} className={className} />
}

export default Tiptap
