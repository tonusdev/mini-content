import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
} from '@nextui-org/react'
import { useI18n } from '@/i18n/client'

interface ModalProps {
  onOpenChange: (isOpen: boolean) => void
  isOpen: boolean
  onLinkSet: (url: string, instant: boolean) => void
}

export default function SetLinkModal(props: ModalProps) {
  const t = useI18n()
  const [link, setLink] = useState('')
  const [instant, setInstant] = useState(false)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value)
    if (event.target.value.startsWith('https://telegra.ph/')) {
      setInstant(true)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={props.isOpen}
        placement="top"
        onOpenChange={props.onOpenChange}
        onClose={() => {
          props.onLinkSet(link, instant)
          setLink('')
          setInstant(false)
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t('create_link')}
              </ModalHeader>
              <ModalBody>
                <Input placeholder={t('enter_link')} onChange={onChange} />
              </ModalBody>
              <ModalFooter>
                <Checkbox isSelected={instant} onValueChange={setInstant}>{t('instant_view')}</Checkbox>
                <Button color="danger" variant="light" onPress={onClose}>
                {t('close')}
                </Button>
                <Button color="primary" onPress={onClose}>
                {t('set_link')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
