import type {
  DOMExportOutput,
  ElementFormatType,
  LexicalCommand,
  LexicalNode,
  NodeKey,
  Spread,
} from 'lexical'

import { $applyNodeReplacement, createCommand } from 'lexical'
import * as React from 'react'
import {
  DecoratorBlockNode,
  SerializedDecoratorBlockNode,
} from '@lexical/react/LexicalDecoratorBlockNode'

const FontColorComponent = React.lazy(() =>
  import('../components/FontColorComponent').then((module) => ({
    default: module.EmbedNodeComponent,
  })),
)

export type FontColorNodeData = {
  url: string
}

export type SerializedFontColorNode = Spread<
  {
    children?: never // required so that our typed editor state doesn't automatically add children
    type: 'fontColor'
    fields: FontColorNodeData
  },
  SerializedDecoratorBlockNode
>

export const CHANGE_FONT_COLOR_COMMAND: LexicalCommand<FontColorNodeData> =
  createCommand('CHANGE_FONT_COLOR_COMMAND')

export const OPEN_FONT_COLOR_DRAWER_COMMAND: LexicalCommand<{
  data?: FontColorNodeData | null
  nodeKey?: string
}> = createCommand('OPEN_FONT_COLOR_DRAWER_COMMAND')

export class FontColorNode extends DecoratorBlockNode {
  __data: FontColorNodeData

  constructor({
    data,
    format,
    key,
  }: {
    data: FontColorNodeData
    format?: ElementFormatType
    key?: NodeKey
  }) {
    super(format, key)
    this.__data = data
  }

  static clone(node: FontColorNode): FontColorNode {
    return new FontColorNode({
      data: node.__data,
      format: node.__format,
      key: node.__key,
    })
  }

  static getType(): string {
    return 'fontColor'
  }

  /**
   * The data for this node is stored serialized as JSON. This is the "load function" of that node: it takes the saved data and converts it into a node.
   */
  static importJSON(serializedNode: SerializedFontColorNode): FontColorNode {
    const importedData: FontColorNodeData = {
      url: serializedNode.fields.url,
    }
    const node = $createFontColorNode(importedData)
    node.setFormat(serializedNode.format)
    return node
  }

  /**
   * Allows you to render a React component within whatever createDOM returns.
   */
  decorate(): React.ReactElement {
    return <FontColorComponent nodeKey={this.__key} data={this.__data} />
  }

  exportDOM(): DOMExportOutput {
    return { element: document.createElement('div') }
  }

  exportJSON(): SerializedFontColorNode {
    return {
      ...super.exportJSON(),
      fields: this.getData(),
      type: 'fontColor',
      version: 2,
    }
  }

  getData(): FontColorNodeData {
    return this.getLatest().__data
  }

  setData(data: FontColorNodeData): void {
    const writable = this.getWritable()
    writable.__data = data
  }

  getTextContent(): string {
    return '\n'
  }
}

export function $createFontColorNode(data: FontColorNodeData): FontColorNode {
  return $applyNodeReplacement(
    new FontColorNode({
      data,
    }),
  )
}

export function $isEmbedNode(node: LexicalNode | null | undefined): node is FontColorNode {
  return node instanceof FontColorNode
}
