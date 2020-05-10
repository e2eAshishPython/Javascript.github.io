const cartItems = document.getElementById('cart-info');
const carts = document.getElementById('cart');

    cartItems.addEventListener('click',
    function()
    {
        carts.classList.toggle('show-cart');
    })


    const cartBtn = document.querySelectorAll('.store-item-icon');

    cartBtn.forEach(btn =>{
        btn.addEventListener('click',event =>
        {
            if (event.target.parentElement.classList.contains('store-item-icon')) {
                let fullPath = event.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf('images') + 6;
                let partPath = fullPath.slice(pos);
                const item ={};
                item.img = `img-cart${partPath}`;
                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name = name;
                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                let finalPrice = price.slice(1).trim();
                item.price = finalPrice;
                const CartItem = document.createElement('div');
                CartItem.classList.add('cart-item', 'd-flix', 'justify-content-between', 'text-capitalize', 'my-3');
                CartItem.innerHTML = `<div class="cart-item d-flex justify-content-between text-capitalize my-3"><img src="Static//${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="item-text"><p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p><span>$</span>
                  <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span></div><a href="#" id='cart-item-remove' class="cart-item-remove"><i class="fas fa-trash"></i></a></div>`;
                  const total = document.querySelector('.cart-total-container');
                  carts.insertBefore(CartItem,total);
                  ShowTotal();
                  
                    $('#thanksModal').modal('show');
                

            }
        }

        )
       
    })

    function ShowTotal() {
        const total = []
        const items = document.querySelectorAll('.cart-item-price');
        items.forEach(item =>{
            total.push(parseFloat(item.textContent));
        })

        const finalPrice = total.reduce(function(total,item){
            total +=item;
            return total;
        },0);

        const finalMoney = finalPrice.toFixed(2);

        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = total.length;
    }

const ClearCart = document.getElementById('clear-cart');

ClearCart.addEventListener('click',AddcartItems =>
{
    var CartItem =AddcartItems.target.parentElement.parentElement.children;
    for (let index = 0; index < CartItem.length ; index++) {
        if(CartItem[0].classList.contains('cart-item')){
            CartItem[0].remove()
        }
        
    }
   
    ShowTotal();
    carts.classList.toggle('show-cart');
})

document.getElementById('Close').addEventListener('click',function(){
    $('#thanksModal').modal('hide');
});

const imgaeContainer = document.querySelectorAll('.img-container');
const LightContainer = document.querySelector('.lightbox-container');
const lightboxItem = document.querySelector('.lightbox-item');
const imagesClass = document.querySelectorAll('.store-img');
ImageList = [];
imagesClass.forEach(image=>{
    ImageList.push(image.src);
})


imgaeContainer.forEach(event => {
    event.addEventListener('click',images=>
    {
        lightboxItem.style.backgroundImage = `url(${images.target.src})`;
        LightContainer.classList.add('show');
    })
})
let Counter=0;
document.querySelector('.fa-caret-right').addEventListener('click',event=>{
    Counter--;
    if (Counter < 0 ) {
        Counter = ImageList.length - 1 ;
    }
    lightboxItem.style.backgroundImage = `url(${ImageList[Counter]})`;
});


document.querySelector('.fa-caret-left').addEventListener('click',event=>{
    Counter++;
    if (Counter > ImageList.length -1 ) {
        Counter = 0;
    }
    lightboxItem.style.backgroundImage = `url(${ImageList[Counter]})`;
});


document.querySelector('.fa-window-close').addEventListener('click',event=>{
    LightContainer.classList.remove('show');
})