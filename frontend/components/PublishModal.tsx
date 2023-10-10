import React from 'react'
import { useI18n } from '@/i18n/client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react'

interface ModalProps {
  onOpenChange: (isOpen: boolean) => void
  isOpen: boolean
  articleId: string
}

export default function PublishModal(props: ModalProps) {
  const t = useI18n()
  const miniAppUrl = process.env.NEXT_PUBLIC_MINI_APP_LINK + '?startapp='
  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={props.isOpen}
        placement="bottom"
        onOpenChange={props.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t('publicated')}</ModalHeader>
              <ModalBody>
                <Input
                  className="mt-4"
                  label={t('link_to_article') + ':'}
                  labelPlacement="outside"
                  value={miniAppUrl + props.articleId}
                  isReadOnly
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  onPress={() => {
                    navigator.clipboard.writeText(miniAppUrl + props.articleId)
                    onClose()
                  }}
                >
                  {t('copy_link')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
