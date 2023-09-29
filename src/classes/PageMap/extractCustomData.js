import _ from 'underscore'

export default ({ item }) => {
  let data = {}
  handleItem({ item, data })
  return data
}

const handleItem = (props) => {
  const { item, data } = props
  const { id, items } = item


  //     const canEdit =
  //     item.params
  //     && item.params.edit
  //     && item.params.edit.canEdit

  // if (!canEdit) {
  //     return
  // }

  if (!items || !items.length) {
    handleUniqueItem(props)
    return
  }

  if (id) {
    const targets = items.filter(a => a.origin === 'user')
    if (targets.length) {
      data[id] = [
        ...(data[id] ? data[id] : []),
        ...targets
      ]
    }
  }

  items.map(i => handleItem({ item: i, data }))
}

const handleUniqueItem = ({ item, data }) => {
  const { id } = item
  if (!id) {
    return
  }

  const isValid =
    item.params
    && item.params.edit
    && item.params.edit.canEdit
    && item.params.data
    && !_.isEmpty(item.params.data)

  if (isValid) {
    data[id] = item
  }
}
