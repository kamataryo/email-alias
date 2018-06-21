const pageHostname = window.location.hostname
const DATA_NAME = 'chrome_extension__email_alias__original_email'
const buttonStyleStr = `
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: turquoise;
  opacity: .7;
  color: white;
  font-weight: bold;
`

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.getElementsByTagName('input')

  for (var i = 0; i < elements.length; i++) {
    const element = elements[i]
    if (element.attributes.type.value === 'email') {
      const addButton = document.createElement('button')
      addButton.setAttribute('type', 'button')
      addButton.innerHTML = '+@'
      addButton.setAttribute('style', buttonStyleStr)
      element.insertAdjacentElement('afterend', addButton)

      addButton.addEventListener('click', () => {
        const dataset = addButton.dataset
        // clear
        if (addButton.innerHTML === '-@') {
          element.value = dataset[DATA_NAME]
          addButton.innerHTML = '+@'
          dataset[DATA_NAME] = ''
          return
        }

        const [user, mailHost] = element.value.split('@')

        // Entered email address may be valid.
        if (user && mailHost) {
          const originalEmail = dataset[DATA_NAME]

          // an alias hasn't been attached yet
          if (!originalEmail) {
            dataset[DATA_NAME] = element.value
            const withAlias = `${user}+${pageHostname}@${mailHost}`
            element.value = withAlias
            addButton.innerHTML = '-@'
          }
        }
      })
    }
  }
})
