import { objectEach } from 'fast-loops'

import createSubscription from './connection/createSubscription'

export default function render(renderer, targetDocument) {
  if (!renderer.updateSubscription) {
    renderer.scoreIndex = {}
    renderer.nodes = {}

    renderer.updateSubscription = createSubscription(renderer, targetDocument)
    renderer.subscribe(renderer.updateSubscription)

    // simulate rendering to ensure all styles rendered prior to
    // calling FelaDOM.render are correctly injected as well
    objectEach(renderer.cache, renderer._emitChange)
  }
}
