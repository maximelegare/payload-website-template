'use client'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils'
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  RangeSelection,
} from 'lexical'

import { $patchStyleText } from '@lexical/selection'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PluginComponent } from '@payloadcms/richtext-lexical'
import {
  $createFontColorNode,
  FontColorNode,
  FontColorNodeData,
  CHANGE_FONT_COLOR_COMMAND,
  OPEN_FONT_COLOR_DRAWER_COMMAND,
} from '../nodes/FontColorNode'
import { FieldsDrawer, ToolbarDropdown } from '@payloadcms/richtext-lexical/client'
import { Modal, useModal } from '@payloadcms/ui'
import { ColorPicker } from '../components/ColorPickerComponent'
import { FontColorIcon } from '../icons/FontColorIcon'
import { boundModalToHTMLElement } from '@payload/hooks/boundTwoHTMLElements'
import { CustomToolbarDropdown } from '@payload/components/CustomToolbarDropdown'

const drawerSlug = 'lexical-embed-create'
export const modalSlug = 'lexical-font-color-modal'

export const FontColorPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()
  const { modalState } = useModal()

  const { toggleModal } = useModal()
  const [lastSelection, setLastSelection] = useState<RangeSelection | null>()
  const [targetNodeKey, setTargetNodeKey] = useState<string | null>(null)
  const [modalPositions, setModalPositions] = useState({ x: 0, y: 0 })
  const [fontColor, setFontColor] = useState('#000')

  const applyStyleText = (styles: Record<string, string>) => {
    console.log('color should change')
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles)
      }
    })
  }

  const handleScroll = () => {
    const triggerElement = document.getElementById('lexical-font-color-icon')
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect()
      setModalPositions({ x: rect.right, y: rect.top })
    }
  }

  useEffect(() => {
    if (modalState['colorpicker-modal']?.isOpen) {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Initial position set
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [modalState['colorpicker-modal']?.isOpen])

  useEffect(() => {
    const triggerElement = document.getElementById('lexical-font-color-icon')
    const rect = triggerElement.getBoundingClientRect()

    setModalPositions({ x: rect.right, y: rect.top })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [modalState])

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CHANGE_FONT_COLOR_COMMAND,
        ({ color }) => {
          if (targetNodeKey) {
            // Replace existing embed node
            const node: FontColorNode = $getNodeByKey(targetNodeKey) as FontColorNode
            if (!node) {
              return false
            }
            node.setData({ color })

            setTargetNodeKey(null)
            return true
          }

          let selection = $getSelection()

          if (!$isRangeSelection(selection)) {
            selection = lastSelection as RangeSelection | null
            if (!$isRangeSelection(selection)) {
              return false
            }
          }

          const focusNode = selection.focus.getNode()

          if (focusNode !== null) {
            const horizontalRuleNode = $createFontColorNode({
              color,
            })
            $insertNodeToNearestRoot(horizontalRuleNode)
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor, lastSelection, targetNodeKey, toggleModal])

  const onFontColorSelect = (value: string) => {
    applyStyleText({ color: value })
  }

  return (
    <Modal
      id="colorpicker-modal"
      lockBodyScroll={false}
      // ref={modalRef}
      slug="colorpicker-modal"
      htmlElement={'div'}
      style={{
        minHeight: '0px',
        // top:"20px",
        // right:"20px"

        top: `${modalPositions.y + 35}px`,
        right: `${modalPositions.x}px`,

      }}
    >
      <ColorPicker onFontColorChange={onFontColorSelect} fontColor={fontColor} />
    </Modal>
  )
}
