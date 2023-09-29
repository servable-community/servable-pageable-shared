import _ from 'underscore'

const mergeItem = ({ item, customData = {} }) => {
  const { id } = item
  let _item = { ...item }
  let items = item.items ? item.items : []

  if (id) {
    let _custom = customData[id]
    if (_custom) {
      if (_.isArray(_custom)) {

        items = [
          ...items,
          ..._custom
        ]

      }
      else if (!_.isEmpty(_custom)) {
        _item.params = {
          ...(_item.params ? _item.params : {}),
          ...(_custom.params ? _custom.params : {}),
          data: {
            ...((_item.params && _item.params.data) ? _item.params.data : {}),
            ...((_custom.params && _custom.params.data) ? _custom.params.data : {}),
          }
        }
      }
    }
  }

  items = items.map(i => {
    const j = { ...i }
    return mergeItem({ item: j, customData })
  })

  return {
    ..._item,
    items
  }
}

export default mergeItem
