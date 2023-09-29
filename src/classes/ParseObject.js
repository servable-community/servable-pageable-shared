import * as LocaleUtils from './utils/locale.js'

export default class ParseObject extends Parse.Object {
  constructor(attributes) {
    super(attributes)
  }

  saveMasterly = () => this.save(null, { useMasterKey: true })
  fetchMasterly = () => this.fetch({ useMasterKey: true })
  destroyMasterly = () => this.destroy({ useMasterKey: true })

  locale = () => {
    const item = this.get('locale')
    if (item) {
      return item
    }
    return 'en'
  }

  getLocalizedPropertyValue = (propertyName) => LocaleUtils.localizedPropertyValue({ propertyName, locale: this.locale(), object: this })


  /* #region reviewable */
  reviewableDefaultStatus = () => {
    return 'accepted'
  }

  reviewableUpdatePublication = () => {
    const status = this.get('reviewableStatus')
    switch (status) {
      case 'accepted': {
        const isPageable = this.reviewableIsAcceptable()
        if (!isPageable) {
          this.set('reviewableStatus', 'toreview')
        }
      } break
      default: break
    }
  }

  reviewableIsAcceptable = () => {
    const dirtyKeys = this.dirtyKeys()
    const fields = this.reviewableInvalidatingFields()
    const candidates = fields.filter(a => dirtyKeys.includes(a))
    return candidates.length === 0
  }

  reviewableBy = () => {
  }

  reviewedBy = () => {
  }

  reviewableInvalidatingFields = () => {
    return []
  }
  /* #endregion  */
}
