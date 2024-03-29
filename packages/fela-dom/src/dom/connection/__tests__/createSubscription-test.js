import { createRenderer } from 'fela'

import createSubscription from '../createSubscription'

import getStyleSheetStyle from '../../__helpers__/getStyleSheetStyle'
import cleanHead from '../../__helpers__/cleanHead'

beforeEach(cleanHead)
afterEach(() => {
  process.env.NODE_ENV = 'test'
})

describe('Subscribing to the DOM', () => {
  it('should render rules to a DOM node', () => {
    const renderer = createRenderer()

    const updateSubscription = createSubscription(renderer)
    renderer.subscribe(updateSubscription)

    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue',
      ':hover': {
        color: 'red',
      },
    }))

    const styleSheets = Object.keys(renderer.nodes).map((key) =>
      getStyleSheetStyle(renderer.nodes[key])
    )

    expect(styleSheets).toMatchSnapshot()
  })

  it('should render static styles to a DOM node', () => {
    const renderer = createRenderer()

    const updateSubscription = createSubscription(renderer)
    renderer.subscribe(updateSubscription)

    renderer.renderStatic(
      {
        backgroundColor: 'red',
        color: 'blue',
      },
      'body, html'
    )

    const styleSheets = Object.keys(renderer.nodes).map((key) =>
      getStyleSheetStyle(renderer.nodes[key])
    )

    expect(styleSheets).toMatchSnapshot()
  })

  it('should render keyframes to a DOM node', () => {
    const renderer = createRenderer()

    const updateSubscription = createSubscription(renderer)
    renderer.subscribe(updateSubscription)

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }))

    const styleSheets = Object.keys(renderer.nodes).map((key) =>
      getStyleSheetStyle(renderer.nodes[key])
    )

    expect(styleSheets).toMatchSnapshot()
  })

  it('should render media rules and support rules to single DOM nodes (devMode)', () => {
    const renderer = createRenderer()

    const updateSubscription = createSubscription(renderer)
    renderer.subscribe(updateSubscription)

    renderer.renderRule(() => ({
      color: 'blue',
      '@supports (display: flex)': {
        display: 'flex',
      },
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
          '@supports (display: grid)': {
            display: 'grid',
          },
        },
      },
    }))

    const styleSheets = Object.keys(renderer.nodes).map((key) =>
      getStyleSheetStyle(renderer.nodes[key])
    )

    expect(styleSheets).toMatchSnapshot()
  })

  it('should clear all DOM nodes', () => {
    const renderer = createRenderer()

    const updateSubscription = createSubscription(renderer)
    renderer.subscribe(updateSubscription)

    renderer.renderRule(() => ({
      color: 'blue',
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
        },
      },
    }))

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }))

    renderer.clear()

    const styleSheets = Object.keys(renderer.nodes).map((key) =>
      getStyleSheetStyle(renderer.nodes[key])
    )

    expect(styleSheets).toMatchSnapshot()
  })

  it('should correctly recreate nodes after clean', () => {
    const renderer = createRenderer()

    const updateSubscription = createSubscription(renderer)
    renderer.subscribe(updateSubscription)

    renderer.renderRule(() => ({
      color: 'blue',
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
        },
      },
    }))

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }))

    const styleSheetsBeforeClean = Object.keys(renderer.nodes).map((key) =>
      getStyleSheetStyle(renderer.nodes[key])
    )

    renderer.clear()

    renderer.renderRule(() => ({
      color: 'blue',
      '@media (min-width: 300px)': {
        color: 'red',
        '@media (max-height: 500px)': {
          color: 'yellow',
        },
      },
    }))

    renderer.renderKeyframe(() => ({
      from: { color: 'red' },
      to: { color: 'blue' },
    }))

    const styleSheets = Object.keys(renderer.nodes).map((key) =>
      getStyleSheetStyle(renderer.nodes[key])
    )

    expect(styleSheetsBeforeClean).toEqual(styleSheets)
    expect(styleSheets).toMatchSnapshot()
  })
})
