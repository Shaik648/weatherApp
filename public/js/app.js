


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location + '&limit=1').then((rep) => {
        console.log(rep)
        rep.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    }).catch((err) => {
        console.log(err)
        messageOne.textContent = err
    })
})