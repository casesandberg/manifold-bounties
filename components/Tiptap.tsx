'use client'

import Link from '@tiptap/extension-link'
import { useEditor, EditorContent, Content, Node, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Mention } from '@tiptap/extension-mention'
import { Image } from '@tiptap/extension-image'
import clsx from 'clsx'
import { useImperativeHandle } from 'react'

export type EditorRef = { clear: () => void }

export type TiptapProps = {
  content?: Content
  placeholder?: string
  editable?: boolean
  onChange?: (content: Content) => void
  className?: string
  editorRef?: React.Ref<EditorRef>
  id?: string
}

const Tiptap = ({ content, placeholder, editable, onChange, editorRef, className, id }: TiptapProps) => {
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
    onUpdate({ editor }) {
      onChange?.(editor.getJSON())
    },
    content,
    editable,
    editorProps: {
      attributes: {
        id: id ?? 'Editor',
        class: clsx(
          'prose prose-primary prose-a:brightness-95 prose-a:font-medium prose-a:underline prose-a:underline-offset-4 hover:prose-a:opacity-75 prose-p:my-1 prose-ul:my-0 prose-blockquote:my-0 prose-sm sm:prose-base focus:outline-none',
          className,
        ),
      },
    },
  })

  useImperativeHandle(
    editorRef,
    () => {
      return {
        clear() {
          editor?.commands.clearContent(true)
        },
      }
    },
    [editor],
  )

  return <EditorContent editor={editor} />
}

export default Tiptap
