
//Fetch runs in browser, but can't run in node

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Weather is loading....'
    message2.textContent = ''

    const response = fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return message1.textContent = data.error
        }
        message1.textContent = data.location
        message2.textContent = data.forecast
       
    })
    search.value = ''
})
console.log(response)
}) 

// let div = document.getElementById('weather')

// let p = document.createElement('p')
// div.appendChild(p)
// p.textContent = response