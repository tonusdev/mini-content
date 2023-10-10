'use client'

import { Button, Input, Spinner, useDisclosure } from '@nextui-org/react'
import { Editor } from '@tiptap/react'
import { useArticleQuery } from '@/services/useArticleQuery'
import { useBackButton } from '@tma.js/sdk-react'
import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/client'
import { useRouter } from 'next/navigation'
import { useUpdateArticleMutation } from '@/services/useUpdateArticleMutation'
import PublishModal from '@/components/PublishModal'
import Tiptap from '@/components/Tiptap'

export default function EditPage({
  params,
}: {
  params: { articleId: string }
}) {
  const t = useI18n()
  const { isOpen, onOpen: openPublishModal, onOpenChange } = useDisclosure()
  const router = useRouter()
  const backButton = useBackButton()
  backButton.show()
  backButton.on('click', () => {
    router.back()
    setTimeout(() => {
      backButton.hide()
    }, 100)
  })
  const { data, isPending } = useArticleQuery({
    input: {
      id: params.articleId,
      view: false,
    },
  })

  const [title, setTitle] = useState('')
  const [editor, setEditor] = useState<Editor>()
  const [editorPremium, setEditorPremium] = useState<Editor>()

  useEffect(() => {
    if (isPending === false && data?.article) {
      setTitle(data.article.title)
    }
  }, [isPending, data])

  const { mutateAsync: updateArticle } = useUpdateArticleMutation()
  const publish = () => {
    updateArticle({
      input: {
        id: params.articleId,
        title,
        content: editor?.getJSON() ?? {},
        premiumContent: editorPremium?.getJSON() ?? {},
      },
    })
    openPublishModal()
  }

  const initEditor = (editor: Editor) => {
    setEditor(editor)
  }

  const initEditorPremium = (editor: Editor) => {
    setEditorPremium(editor)
  }

  if (isPending || !data?.article) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col p-2">
      <div className="flex">
        <Input
          label={t('article_title') + ':'}
          labelPlacement="outside"
          placeholder={t('enter_article_title')}
          className="max-w-lg"
          defaultValue={data.article.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <label className="mt-4 block origin-top-left pb-1.5 text-small font-medium text-foreground transition-all !duration-200 !ease-out will-change-auto motion-reduce:transition-none">
        {t('content_for_all')}:
      </label>
      <Tiptap
        placeholder={t('enter_anyone_content')}
        isEditable={true}
        content={data.article.content}
        onInit={initEditor}
      />
      <label className="mt-4  block origin-top-left pb-1.5 text-small font-medium text-foreground transition-all !duration-200 !ease-out will-change-auto motion-reduce:transition-none">
        {t('content_for_premium')}:
      </label>
      <Tiptap
        placeholder={t('enter_premium_content')}
        isEditable={true}
        content={data.article.premiumContent}
        onInit={initEditorPremium}
      />
      <Button
        onClick={publish}
        className="mb-[600px] mt-4 w-full"
        color="success"
      >
        {t('publish')}
      </Button>
      <PublishModal
        isOpen={isOpen}
        articleId={params.articleId}
        onOpenChange={(value: boolean) => {
          onOpenChange()
          if (value === false) {
            router.back()
            setTimeout(() => {
              backButton.hide()
            }, 100)
          }
        }}
      />
    </div>
  )
}
