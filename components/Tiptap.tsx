'use client'

import Link from '@tiptap/extension-link'
import { useEditor, EditorContent, Content, Node, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
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
      Node.create({
        name: 'mention',
        inline: true,
        addAttributes() {
          return {
            id: {
              default: null,
              parseHTML: (element) => element.getAttribute('data-id'),
              renderHTML: (attributes) => {
                if (!attributes.id) {
                  return {}
                }

                return {
                  'data-id': attributes.id,
                }
              },
            },

            label: {
              default: null,
              parseHTML: (element) => element.getAttribute('data-label'),
              renderHTML: (attributes) => {
                if (!attributes.label) {
                  return {}
                }

                return {
                  'data-label': attributes.label,
                }
              },
            },
          }
        },
        parseHTML() {
          return [
            {
              tag: `span[data-type="${this.name}"]`,
            },
          ]
        },
        renderHTML({ node, HTMLAttributes }) {
          return [
            'span',
            mergeAttributes({ 'data-type': this.name }, HTMLAttributes),
            `@${node.attrs.label ?? node.attrs.id}`,
          ]
        },
        renderText({ node }) {
          return `@${node.attrs.label ?? node.attrs.id}`
        },
      }),
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
          'prose prose-primary prose-a:brightness-95 prose-a:font-medium prose-a:underline prose-a:underline-offset-4 hover:prose-a:opacity-75 prose-p:my-1 prose-ul:my-0 prose-sm sm:prose-base focus:outline-none',
      },
    },
  })

  return <EditorContent editor={editor} className={className} />
}

export default Tiptap
