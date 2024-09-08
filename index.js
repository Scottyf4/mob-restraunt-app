// Importing data from data.js to itterate over

import menuArray from "./data/data.js";


// Taking control of HTMl to render each menu item

const paymentModal = document.getElementById('modal-container');
const paymentForm = document.getElementById('payment-form')
const orderPlaceholdder = document.getElementById('order-template')
const confirmation = document.getElementById('order-confirmation')

// Event listeners

document.addEventListener('click', e => {
    if (e.target.dataset.item){
        addItemToOrder(e.target.dataset.item)
    } 

    if (newOrder.length > 0){
        displayOrderBox()  
    } 
    if (e.target.id === 'remove-btn'){
        handleRemove(e.target.dataset.remove)
    }
    if (e.target.id === 'clearOrder'){
        clearOrder()
    }

    if (e.target.id === 'completeOrder'){
        handlePayment()
    }
    if (e.target.id === 'paybtn'){
        handleFullPayment(e)
    }

    if (e.target.id === 'confirmationClsBtn'){
        resetPage()
    } 
    if (e.target.id === 'order-confirmation'){
        resetPage()
    }
})

// Function to render menu items from Data.js

function getMenuData(){

    let menuDataHtml = ``

    menuArray.forEach(item => {
        menuDataHtml += `
                <div class='menuCard'>
                        <div class='informationContainer'>
                            <div>
                                <p class='menuImage'>${item.emoji}</p>
                            </div>
                            <div>
                                <p class='menuName'>${item.name}</p>
                                <p class='menuIngredients'>${item.ingredients}</p>
                                <p class='menuPrice'>$${item.price}</p>
                            </div>
                        </div>
                        <div class='btnContainer'>
                            <button id='addToOrder${item.id}' class='menuBtn' data-item=${item.id}>+</button>
                        </div>
                        
                </div>   
            `
})
    return menuDataHtml
    
}

// function to add newly ordered items to the order list


let newOrder = []


function addItemToOrder(item){

    const targetItem = parseInt(item)  
        
    menuArray.forEach(menuItem => {
        if(menuItem.id === targetItem){
            newOrder.push({
                name: menuItem.name,
                price: menuItem.price,
                id: menuItem.id
            })
        }          
    }) 
    return newOrder
}

// Functions to display data from order list and calculate total amount

function displayOrderBox(){

    let totalOrder = 0

    newOrder.forEach(item => {
        totalOrder += item.price
    })

    document.getElementById('order-template').innerHTML = `
        <div class='order-template'>
            <div>
                <h3 class='order-title'>Your Order</h3>
                ${displayOrderedItems(newOrder)}
                <button id='clearOrder'>Clear Order</button>
            </div>
            
        </div>
        <div class='order-total'>
            <h3 class='items-total'>Total Price</h3>
            <h4 class='items-total'>$${totalOrder}</h4>
        </div>
        <button id='completeOrder'>Complete Order</button>
    
    `
}


function displayOrderedItems(orders){

    
    let orderDetails = ``

    orders.forEach(order => {
        orderDetails += `
            <div>
                
                <div class='order-container'>
                    <div class='orderItemBtn'>
                        <p class="order-items">${order.name}</p>
                        <button id='remove-btn' data-remove=${order.id}>remove</button>
                    </div>
                    
                    <p class="order-items">$${order.price}</p>
                </div>
                
            </div>
        `
    })
    return orderDetails
}

// Function to handle removing items from the orders list

function handleRemove(removeItem){
    
    let itemToRemove = parseInt(removeItem)
    
    const filteredOrder = newOrder.filter(item => item.id !== itemToRemove)
    newOrder = filteredOrder 
    displayOrderBox()
    

}

// Function to help spead up and clear all items from order

function clearOrder(){
    newOrder = []
    displayOrderBox()
}

// Functions to display payment modal and remove once submitted

function handlePayment(){
    paymentModal.style.display = 'block'
    document.getElementById('main-section').style.opacity = '0.1'
    
}

// Payment function to use basic form validation and take name from submit to reuse and to hide modal

function handleFullPayment(e){

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const paymentFormData = new FormData(paymentForm)
        const name = paymentFormData.get('name')
        const firstName = name.split(' ')[0]


        orderPlaceholdder.innerHTML = `
        <div class='order-confirmation' id='order-confirmation'>
            <button id='confirmationClsBtn'>X</button>
            <h2 >Thanks, ${firstName}! Your order is on the way.</h2>
        </div>
        `
        paymentModal.style.display = 'none'
        document.getElementById('main-section').style.opacity = '1'
    })


    
}

function resetPage(){
    newOrder = []
    document.getElementById('order-template').innerHTML = `
    <div id="order-template">
            <h3 id="order-placeholder">No items ordered. Click the + icon to add to your order</h3>
        </div>
    `
}


// Main function to render all menu items

function render(){
    document.getElementById("menu-item").innerHTML = getMenuData()
     
  }

render()


