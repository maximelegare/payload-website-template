'use client'

import React, { useEffect, useState } from 'react'
import { ColorPicker } from './ColorPicker'

import { FontColorIcon } from '../icons/FontColorIcon'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@@/shared/ui/dropdown-menu'
import { $patchStyleText } from '@lexical/selection'
import {
  $createTextNode,
  $getSelection,
  $getRoot,
  $isRangeSelection,
  LexicalNode,
  SerializedLexicalNode,
  $isParagraphNode,
  $parseSerializedNode,
  EditorState,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { translateColor } from '../utils/translateColor'
import { $dfs } from '@lexical/utils'
export const DropdownColorPicker = () => {
  const [fontColor, setFontColor] = useState('')
  const [editor] = useLexicalComposerContext()
  const [CSSVariable, setCSSVariable] = useState<string | null>(null)
  const [defaultLexicalNodes, setDefaultLexicalNodes] = useState<{
    serializedRootNodes: SerializedLexicalNode[]
    serializedSelectionNodes: SerializedLexicalNode[]
    serializedRootState: string
    selectionNodes: LexicalNode[]
  } | null>(null)

  function getNodeStyles(node: HTMLElement) {
    const computedStyle = getComputedStyle(node)
    return {
      color: computedStyle.color,
    }
  }

  const getLexicalNodes = (): {
    serializedRootNodes: SerializedLexicalNode[]
    serializedSelectionNodes: SerializedLexicalNode[]
    selectionNodes: LexicalNode[]
    serializedRootState: string
  } | null => {
    const editorState = editor.getEditorState()

    return editorState.read(() => {
      // Traverse the tree to get all nodes
      const rootNodes = $dfs()

      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return null
      const selectionNodes = selection.getNodes()

      return {
        serializedRootState: JSON.stringify(editorState),
        serializedRootNodes: rootNodes.map(({ node }) => node.exportJSON()),
        serializedSelectionNodes: selectionNodes.map((node) => node.exportJSON()),
        selectionNodes: selection.getNodes(),
      }
    })
  }

  const saveDefaultLexicalNodes = () => {
    const nodes = getLexicalNodes()
    setDefaultLexicalNodes(nodes)
  }

  const replaceRootNodes = () => {
    editor.update(() => {
      const [paragraph] = $getRoot().getChildren()

      if (!$isParagraphNode(paragraph)) {
        return
      }

      const [firstNode] = paragraph.getChildren()

      if (!firstNode) {
        return
      }

      const parsedState = JSON.parse(defaultLexicalNodes.serializedRootState) as EditorState

      // @ts-expect-error
      const parsedRoot = parsedState.root
      const parsedNodes = parsedRoot.children as SerializedLexicalNode[]

      const nodesToReplace = parsedNodes.map($parseSerializedNode)

      // Remove everything except root and first paragraph

      console.log('firstNode', firstNode)

      let target = null
      nodesToReplace.forEach((node) => {
        // const clone = $copyNode(node);
        // const clone = $copyNodeDeep(node);
        const clone = node // no cloning
        console.log('clone', clone)

        if (target === null) {
          firstNode.insertBefore(clone)
        } else {
          target.insertAfter(clone)
        }
        target = clone
      })

      // // Remove everything except root and first paragraph
      // const oldRootNodes = $dfs()
      // oldRootNodes.forEach(({ node }, idx) => {
      //   if (idx > 1) node.remove()
      // })

      // console.log('nodesToReplace', { nodesToReplace })

      // let target = null

      // // Remove current root nodes

      // if (!defaultLexicalNodes?.serializedRootNodes) return

      // nodesToReplace.forEach((node, idx) => {
      //   const clone = node // no cloning
      //   clone.__parent = paragraph

      //   if (idx > 1) {
      //     if (target === null) {
      //       firstNode.insertBefore(clone)
      //     } else {
      //       target.insertAfter(clone)
      //     }
      //     target = clone

      //   }
      // })

      // if (!selection || !defaultLexicalNodes) {
      //   return
      // }

      // Remove current selected nodes

      // console.log('defaultLexicalNodes', defaultLexicalNodes)
      // defaultLexicalNodes.lexicalNodes.forEach((node, idx) => {
      //   console.log('eachNode', node)
      //   node.remove()
      // })

      // Import saved nodes and insert them
      // defaultLexicalNodes.serializedRootNodes.forEach((savedNode) => {
      //   const newNode = $createTextNode(savedNode.text)
      //   newNode.setStyle(savedNode.style)
      // })
    })
    setDefaultLexicalNodes(null)
  }

  const setNodesDefaultColor = () => {
    editor.update(() => {
      // const nodes = getLexicalNodes()

      const selection = $getSelection()

      if (!selection) return

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

  const onModalClose = () => {
    if (fontColor) {
      applyStyleTextToNodes({
        color: CSSVariable ?? fontColor,
        'background-color': null,
        'padding-bottom': null,
      })
      // Replace the nodes with the default ones
    } else {
      applyStyleTextToNodes({
        color: '#000000',
        'background-color': null,
        'padding-bottom': null,
      })
      // replaceRootNodes()
    }
  }

  const onModalOpen = () => {
    setNodesDefaultColor()
    // saveDefaultLexicalNodes()

    // Apply false styling if focus is lost from Lexcal
    applyStyleTextToNodes({
      'background-color': '#7dccf8',
      color: '#000000',
      'padding-bottom': '1px',
    })
  }

  // const updateStyles = (open: boolean) => {
  //   if (open) {
  //     // Sets the font color for the content in Lexcal
  //     // (if it loses the focus, the selection styling disapears)
  //     applyStyleTextToNodes({
  //       'background-color': '#7dccf8',
  //       color: '#000000',
  //       'padding-bottom': '1px',
  //     })
  //   } else {
  //     // If there is a font color, apply it when closing
  //     if (fontColor) {
  //       applyStyleTextToNodes({
  //         color: CSSVariable ?? fontColor,
  //         'background-color': null,
  //         'padding-bottom': null,
  //       })
  //       // Replace the nodes with the default ones
  //     } else {
  //       replaceSelectedNodes(defaultLexicalNodes)
  //     }
  //   }
  // }

  const handleOpenChange = (open: boolean) => {
    if (open) onModalOpen()
    else onModalClose()

    // if (open) getNodesDefaultColor()
    // if (open) saveDefaultLexicalNodes()
    // updateStyles(open)
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className="toolbar-popup__button toolbar-popup__button-bold">
        <FontColorIcon underscoreColor={fontColor} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <ColorPicker
          onApplyStyles={() =>
            applyStyleTextToNodes({
              color: CSSVariable ?? fontColor,
              'background-color': null,
              'padding-bottom': null,
            })
          }
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
