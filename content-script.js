const pageHostname = window.location.hostname
const DATA_NAME = 'chrome_extension__email_alias__original_email'

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.getElementsByTagName('input')

  for (var i = 0; i < elements.length; i++) {
    const element = elements[i]
    if (element.attributes.type.value === 'email') {
      element.addEventListener('blur', e => {
        const dataset = element.dataset
        // clear
        if (!e.target.value) {
          dataset[DATA_NAME] = e.target.value
          return
        }

        const [user, mailHost] = e.target.value.split('@')

        // Entered email address may be valid.
        if (user && mailHost) {
          const originalEmail = dataset[DATA_NAME]

          // an alias hasn't been attached yet
          if (!originalEmail) {
            dataset[DATA_NAME] = e.target.value
            const withAlias = `${user}+${pageHostname}@${mailHost}`
            element.value = withAlias
          }
        }
      })
    }
  }
})
