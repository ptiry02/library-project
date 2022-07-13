document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('library-project JS imported successfully!')
  },
  false
)

const btns = [...document.getElementsByClassName('delete-btns')]

btns.forEach((btn) => {
  btn.addEventListener('click', (ev) => {
    const conf = window.confirm('Are you sure you want to delete this item?')
    if (!conf) {
      ev.preventDefault()
    }
  })
})
