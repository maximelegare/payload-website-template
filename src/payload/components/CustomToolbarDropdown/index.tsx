import { Modal } from '@payloadcms/ui'
import React, { useEffect, useState } from 'react'
import { useModal } from '@payloadcms/ui'

type Props = {
  triggerElement: HTMLElement
  children: React.ReactNode | React.ReactElement
  id: string
  slug: string
}

export const CustomToolbarDropdown = ({ children, id, slug, triggerElement }: Props) => {
  const [{ x, y }, setPositions] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const { modalState } = useModal()

  useEffect(() => {
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect()

      if (rect) {
        setPositions({ x: rect.left, y: rect.top })
      }
    }
  }, [triggerElement])

  const handleScroll = () => {
    if (modalState[slug]?.isOpen) {
      const targetElement = document.getElementById(id)
      if (targetElement) {
        setPositions((prevPositions) => ({
          ...prevPositions,
          y: prevPositions.y + window.scrollY,
        }))
      }
    }
  }

  useEffect(() => {
    if (modalState[slug]?.isOpen) {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Initial position set
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [modalState[slug]?.isOpen])

  return (
    <Modal
      id={id}
      lockBodyScroll={false}
      slug={slug}
      htmlElement={'div'}
      style={{ top: `${y}px`, left: `${x}px`, minHeight: '0px' }}
    >
      {children}
    </Modal>
  )
}
