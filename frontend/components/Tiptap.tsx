'use client'

import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  Editor,
} from '@tiptap/react'
import { Button, useDisclosure } from '@nextui-org/react'
import { CustomLink } from './CustomLink'
import Placeholder from '@tiptap/extension-placeholder'
import React, { useCallback, useEffect } from 'react'
import SetLinkModal from './SetLinkModal'
import StarterKit from '@tiptap/starter-kit'

interface TiptapProps {
  className?: string
  isEditable?: boolean
  placeholder?: string
  content?: string
  onInit?: (editor: Editor) => void
}

const Tiptap = (props: TiptapProps) => {
  const { isOpen, onOpen: openSetLinkModal, onOpenChange } = useDisclosure()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: props.placeholder ?? '',
        showOnlyWhenEditable: false,
      }),
      CustomLink.configure({
        openOnClick: !props.isEditable,
        autolink: !props.isEditable,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'rounded-md p-2 prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 !h-auto outline-none',
      },
    },
    content: props.content ?? '',
  })

  const [isEditable] = React.useState(props.isEditable ?? false)

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
      if (props.onInit) {
        props.onInit(editor)
      }
    }
  }, [isEditable, editor, props])

  const setLink = useCallback(
    (url: string, instant: boolean) => {
      if (!editor) {
        return null
      }

      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }

      if (instant) {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({
            // @ts-expect-error custom link with instant view
            href: null,
            onclick: `window.Telegram.WebApp.openLink('${url}', true); return false;`,
            target: null,
            rel: null,
            class: 'instant',
          })
          .run()
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()
      }
    },
    [editor]
  )

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100, zIndex: 10 }}
        >
          <Button
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            color={editor.isActive('bold') ? 'primary' : 'default'}
          >
            bold
          </Button>
          <Button
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            color={editor.isActive('italic') ? 'primary' : 'default'}
          >
            italic
          </Button>
          <Button
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            color={editor.isActive('strike') ? 'primary' : 'default'}
          >
            strike
          </Button>
          <Button
            size="sm"
            onClick={openSetLinkModal}
            color={editor.isActive('link') ? 'primary' : 'default'}
          >
            setLink
          </Button>
          <Button
            size="sm"
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
          >
            unsetLink
          </Button>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Button
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }
          >
            h1
          </Button>
          <Button
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            h2
          </Button>
          <Button
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            bullet list
          </Button>
          <Button
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            code
          </Button>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
      <SetLinkModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onLinkSet={setLink}
      />
    </>
  )
}

export default Tiptap
