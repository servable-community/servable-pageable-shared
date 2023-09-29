export const localizedPropertyValue = ({ propertyName, object, locale }) => {
  const localizedPropertyName = `${propertyName}Loc`
  const localizedValue = object.get(localizedPropertyName)
  if (!localizedValue) {
    return object.get(propertyName)
  }

  const _locale = locale ? locale : object.locale()
  if (!_locale) {
    return object.get(propertyName)
  }

  return localizedValue[_locale]
}
