import { arrayReduce, objectReduce } from 'fast-loops'

import findIndex from './findIndex'
import insertAtIndex from './insertAtIndex'

// TODO: we can further improve this one
export default function objectSortByScore(obj, getScore) {
  const sortedKeys = objectReduce(
    obj,
    (resultSortedKeys, value, key) => {
      const index = findIndex(
        resultSortedKeys,
        (el) => getScore(obj[el], el) > getScore(value, key)
      )

      if (index !== -1) {
        return insertAtIndex(resultSortedKeys, key, index)
      }

      return [...resultSortedKeys, key]
    },
    []
  )

  return arrayReduce(
    sortedKeys,
    (sortedObj, key) => {
      sortedObj[key] = obj[key]
      return sortedObj
    },
    {}
  )
}
