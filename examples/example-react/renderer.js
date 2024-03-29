import { createRenderer } from 'fela'
import embedded from 'fela-plugin-embedded'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import unit from 'fela-plugin-unit'
import validator from 'fela-plugin-validator'
import logger from 'fela-plugin-logger'
import perf from 'fela-perf'
import beautifier from 'fela-beautifier'
import layoutDebugger from 'fela-layout-debugger'
import sortMediaQueryMobileFirst from 'fela-sort-media-query-mobile-first'

export default () => {
  const renderer = createRenderer({
    plugins: [embedded(), unit(), prefixer(), fallbackValue()],
    enhancers: [perf(), beautifier(), sortMediaQueryMobileFirst()],
  })

  renderer.renderStatic(
    {
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      fontFamily: 'Lato',
    },
    'html,body,#app'
  )

  renderer.renderStatic({ display: 'flex' }, 'div')
  return renderer
}
