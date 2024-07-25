'use client'

import React, { useEffect, useState } from 'react'
import { ColorPickerWrapper } from './ColorPicker'

import { FontColorIcon } from '../../icons/FontColorIcon'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@@/shared/ui/dropdown-menu'
import { $patchStyleText } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { translateColor } from '../../utils/translateColor'
export const DropdownColorPicker = () => {
  const [fontColor, setFontColor] = useState('')
  const [editor] = useLexicalComposerContext()
  const [CSSVariable, setCSSVariable] = useState<string | null>(null)

  function getNodeStyles(node: HTMLElement) {
    const computedStyle = getComputedStyle(node)
    return {
      color: computedStyle.color,
    }
  }

  function getNodesDefaultColor() {
    editor.update(() => {
      const selection = $getSelection()

      if (selection !== null) {
        const nodes = selection.getNodes()

        // Check each node for the default color
        const defaultColor = nodes.reduce((acc: string, node) => {
          const domNode = editor.getElementByKey(node.getKey())
          if (domNode) {
            const HEXcolor = translateColor(getNodeStyles(domNode).color, 'HEX')
            // If its the first node, set the default color
            if (acc === '') {
              acc = HEXcolor
              return acc
              // If its not the first node, check if the color is the same
            } else if (acc === HEXcolor) {
              return acc
              // The color is not the same as the first node, so return the default color
              // Meaning there are multiple nodes with different colors
            } else {
              return undefined
            }
          }
        }, '')
        setFontColor(defaultColor)
      }
    })
  }

  const applyStyleTextToNodes = (styles: Record<string, string>) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles)
      }
    })
  }

  const updateStyles = (open: boolean) => {
    if (open) {
      // Sets the font color for the content in Lexcal
      // (if it loses the focus, the selection styling disapears)
      applyStyleTextToNodes({
        'background-color': '#7dccf8',
        color: '#000000',
        'padding-bottom': '1px',
      })
    } else {
      applyStyleTextToNodes({
        color: CSSVariable ?? fontColor,
        'background-color': null,
        'padding-bottom': null,
      })
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (open) getNodesDefaultColor()
    updateStyles(open)
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className="toolbar-popup__button toolbar-popup__button-bold">
        <FontColorIcon underscoreColor={fontColor} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <ColorPickerWrapper
          onApplyStyles={() => handleOpenChange(false)}
          fontColor={fontColor}
          onFontColorChange={(color, cssVariableColor) => {
            if (cssVariableColor) setCSSVariable(cssVariableColor)
            else setCSSVariable(null)
            setFontColor(color)
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
