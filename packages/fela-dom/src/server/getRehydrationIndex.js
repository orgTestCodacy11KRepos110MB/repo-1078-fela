const SELECTOR_PREFIX_REGEXP = /^[a-z0-9_-]*$/gi

export default function getRehydrationIndex(renderer) {
  if (
    renderer.selectorPrefix.length === 0 ||
    renderer.selectorPrefix.match(SELECTOR_PREFIX_REGEXP) !== null
  ) {
    return renderer.uniqueRuleIdentifier
  }

  return -1
}
