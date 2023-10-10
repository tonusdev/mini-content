'use client'

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from '@nextui-org/react'
import { useArchiveArticleMutation } from '@/services/useArchiveArticleMutation'
import { useArticlesQuery } from '@/services/useArticlesQuery'
import { useCreateArticleMutation } from '@/services/useCreateArticleMutation'
import { useI18n } from '@/i18n/client'
import { useRouter } from 'next/navigation'
import { useUserQuery } from '@/services/useUserQuery'
import { useMainButton } from '@tma.js/sdk-react'
import { useEffect } from 'react'

export default function UserPage() {
  const t = useI18n()
  const mainButton = useMainButton()
  const { isSuccess } = useUserQuery()
  const { data: articlesQuery, isPending } = useArticlesQuery({
    input: {
      archived: false,
    },
  })
  const { mutateAsync: archiveArticle } = useArchiveArticleMutation()
  const { mutateAsync: createArticle } = useCreateArticleMutation()
  const router = useRouter()

  const handleCreateArticle = async () => {
    const response = await createArticle({
      input: {
        title: t('new_article'),
      },
    })
    router.push('/edit/' + response.createArticle.id)
    mainButton.hide()
    mainButton.off('click', handleCreateArticle)
  }

  useEffect(() => {
    if (mainButton) {
      mainButton.setText(t('create_new_article'))
      mainButton.enable().show()
      mainButton.on('click', handleCreateArticle)
    }
  }, [])

  if (!isSuccess || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  const openArticle = (articleId: string) => {
    router.push('/edit/' + articleId)
    mainButton.hide()
    mainButton.off('click', handleCreateArticle)
  }

  const archive = async (articleId: string) => {
    await archiveArticle({
      input: {
        id: articleId,
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col p-2">
      {articlesQuery?.articles.length !== 0 || (
        <>
          <div className="mb-10 mt-20 text-center">{t('no_articles')}</div>
          <Button
            color="primary"
            className="mb-4"
            onClick={handleCreateArticle}
          >
            {t('create_new_article')}
          </Button>
        </>
      )}
      {articlesQuery?.articles.map((article) => (
        <div key={article.id} className="my-2 rounded bg-white p-4 shadow-md">
          <h2
            onClick={() => openArticle(article.id)}
            className="mb-2 text-xl font-bold"
          >
            {article.title}
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-500">
              {t('views')}: {article.views + article.premiumViews}/
              {article.premiumViews}
            </p>
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" color="default" variant="bordered">
                  {t('menu')}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="edit"
                  onClick={() => openArticle(article.id)}
                >
                  {t('edit')}
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => archive(article.id)}
                >
                  {t('archive')}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  )
}
