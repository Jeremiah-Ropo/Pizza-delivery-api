import axios from 'axios'
import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart');

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res => {
        console.log(res)
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e)

        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})

const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

initAdmin();


// Socket

let socket = io()

socket.emit('join', )

