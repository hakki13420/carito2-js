import { Products as data } from "./data/data.js"
import {cart} from './data/data.js'

const father = document.querySelector('.container')
const fatherCart=document.querySelector('#body-table')
const cardItem = document.querySelector('#cart-item')
const fragment=document.createDocumentFragment()

data.forEach(item => {
    const node = cardItem.content.firstElementChild.cloneNode(true)    
    node.querySelector('h4').textContent = item.nom
    node.querySelector('.card-img img').id = "img-"+item.id
    node.querySelector(".card-footer .btn").id="btn-"+item.id
    
    node.querySelector('.btn#btn-' + item.id).addEventListener('click', () => {
        const result = cart.filter(el => el.nom == item.nom)        
        if (result.length) {
            result[0].quantity=Number(result[0].quantity)+1
        } else {            
            cart.push({nom:item.nom, quantity:1})
        }        
    })
    node.querySelector('.image#img-'+item.id).src="./images/m1.jpg"//'https://picsum.photos/'+item*100
    fragment.appendChild(node)
})

father.appendChild(fragment)



//display the actual year in footer
document.querySelector('#year').textContent = new Date().getFullYear();

//table cart
const cartBtn = document.querySelector('.cart')
cartBtn.addEventListener('click', handelCartClick)

function handelCartClick() {
    const table = document.querySelector('.table')
    table.classList.toggle('none')
    table.classList.toggle('display')    
    addItemToCart()
}

function delItem(index) {
    //console.log(index)
    cart.splice(index, 1)
    addItemToCart()
}

//
function addItemToCart() {
    fatherCart.textContent=""   
    cart.forEach((item, index) => {        
        const node = document.querySelector('#cart-table').content.firstElementChild.cloneNode(true);                
        node.querySelector('.first').textContent = index+1;
        node.querySelector('.second').textContent = item.nom;
        node.querySelector('.third').textContent = item.quantity;
        node.querySelector('.fourth').innerHTML = `<Button class='btn-opt' data-id="${index}">X</Button>`;

        fragment.appendChild(node)
        fatherCart.appendChild(fragment)        
    })
    document.querySelectorAll('.fourth .btn-opt')
        .forEach(btn => {
            btn.addEventListener('click', () => {
                delItem(btn.dataset.id)
        })
    })
}