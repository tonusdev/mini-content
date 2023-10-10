'use client'

import { Spinner } from '@nextui-org/react'
import { useArticleQuery } from '@/services/useArticleQuery'
import { useI18n } from '@/i18n/client'
import Tiptap from '@/components/Tiptap'

export default function ViewPage({
  params,
}: {
  params: { articleId: string }
}) {
  const t = useI18n()
  const { data, isPending } = useArticleQuery({
    input: {
      id: params.articleId,
      view: true,
    },
  })

  if (isPending === false && data?.article === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {t('article_not_found')}
      </div>
    )
  }


  if (isPending || !data?.article) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }


  return (
    <div className="prose prose-sm flex min-h-screen flex-col p-2">
      <div className="flex">
        <h1>{data.article.title}</h1>
      </div>
      <Tiptap isEditable={false} content={data.article.content} />
      {data.article.premiumContent !== null ? (
        <Tiptap isEditable={false} content={data.article.premiumContent} />
      ) : (
        <div className="flex mt-20 text-center text-xl">
          🚫 {t('buy_premium')}
        </div>
      )}
    </div>
  )
}
