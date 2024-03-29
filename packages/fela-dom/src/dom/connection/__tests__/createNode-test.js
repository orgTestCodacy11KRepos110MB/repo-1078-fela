import { html as beautify } from 'js-beautify'
import { RULE_TYPE, STATIC_TYPE, KEYFRAME_TYPE } from 'fela-utils'

import createNode from '../createNode'

import cleanHead from '../../__helpers__/cleanHead'

beforeEach(cleanHead)

describe('Creating a style node', () => {
  it('should have the correct attributes', () => {
    const getHTML = (media, support) => ({
      _media: media,
      _support: support,
      html: createNode({ type: RULE_TYPE, media, support }).outerHTML,
    })

    expect(getHTML()).toMatchSnapshot()
    expect(getHTML('(min-width:300px)')).toMatchSnapshot()
    expect(getHTML(undefined, '(display:flex)')).toMatchSnapshot()
    expect(getHTML('(min-width:300px)', '(display:flex)')).toMatchSnapshot()
  })

  it('should respect the correct order', () => {
    createNode({
      type: RULE_TYPE,
      media: '(min-width:300px)',
    })

    createNode({
      type: RULE_TYPE,
      media: '(min-width:300px)',
      support: true,
    })

    createNode({
      type: STATIC_TYPE,
    })

    createNode({
      type: RULE_TYPE,
    })

    createNode({
      type: KEYFRAME_TYPE,
    })

    expect(
      beautify(document.head.outerHTML, {
        indent_size: 2,
      })
    ).toMatchSnapshot()
  })
})
