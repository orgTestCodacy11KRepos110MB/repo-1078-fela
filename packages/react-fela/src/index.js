import connect from './connect'
import createComponent from './createComponent'
import createComponentWithProxy from './createComponentWithProxy'
import FelaComponent from './FelaComponent'
import FelaTheme from './FelaTheme'
import RendererProvider from './RendererProvider'
import ThemeProvider from './ThemeProvider'
import useFela from './useFela'
import withTheme from './withTheme'
import renderToNodeList from './renderToNodeList'
import fe from './fe'

import { RendererContext, ThemeContext } from './context'

const FelaRenderer = RendererContext.Consumer

export {
  connect,
  createComponent,
  createComponentWithProxy,
  FelaComponent,
  FelaRenderer,
  FelaTheme,
  RendererContext,
  RendererProvider,
  ThemeContext,
  ThemeProvider,
  renderToNodeList,
  useFela,
  withTheme,
  fe,
}
