import ParseObject from '../ParseObject.js'
import mergeData from './mergeItem.js'
import extractCustomData from './extractCustomData.js'

export default class Page extends ParseObject {
  getData = (props) => {
    const model = this.get('model')
    if (!model) {
      return this.get('data')
    }
    return this.getDataWithModel(props)
  }

  getDataWithModel = () => {
    const model = this.get('model')
    let data = model.get('data')
    const customData = this.get('customData')

    const _d = mergeData({ item: data, customData })
    return _d
  }

  updateData = (props) => {
    const { item } = props
    const model = this.get('model')
    if (!model) {
      this.set('customData', item)
      return
    }
    return this.updateDataWithModel(props)
  }

  updateDataWithModel = (props) => {
    const { item } = props
    const customData = extractCustomData({ item })
    this.set('customData', customData)
  }
}
