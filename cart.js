document.addEventListener('DOMContentLoaded', () => {
    const decreaseQtyBtns = document.querySelectorAll('.decrease-qty');
    const increaseQtyBtns = document.querySelectorAll('.increase-qty');
    const cartItems = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total');
    let total = 0;

    increaseQtyBtns.forEach(button => {
        button.addEventListener('click', increaseQty);
    });

    decreaseQtyBtns.forEach(button => {
        button.addEventListener('click', decreaseQty);
    });

    function increaseQty(event) {
        const product = event.target.closest('.product');
        const qtyElement = product.querySelector('.qty');
        const price = parseFloat(product.querySelector('p').textContent.replace('₹', ''));
        let qty = parseInt(qtyElement.textContent);

        qty++;
        qtyElement.textContent = qty;

        updateCart(product, qty, price);
    }

    function decreaseQty(event) {
        const product = event.target.closest('.product');
        const qtyElement = product.querySelector('.qty');
        const price = parseFloat(product.querySelector('p').textContent.replace('₹', ''));
        let qty = parseInt(qtyElement.textContent);

        if (qty > 0) {
            qty--;
            qtyElement.textContent = qty;
        }

        updateCart(product, qty, price);
    }

    function updateCart(product, qty, price) {
        const productName = product.querySelector('h2').textContent;
        let cartItem = Array.from(cartItems.children).find(item => item.querySelector('.item-name').textContent === productName);

        if (qty > 0) {
            if (!cartItem) {
                cartItem = document.createElement('li');
                cartItem.innerHTML = `<span class="item-name">${productName}</span><span class="item-qty">Qty: ${qty}</span><span class="item-price">₹${(price * qty).toFixed(2)}</span>`;
                cartItems.appendChild(cartItem);
            } else {
                cartItem.querySelector('.item-qty').textContent = `Qty: ${qty}`;
                cartItem.querySelector('.item-price').textContent = `₹${(price * qty).toFixed(2)}`;
            }
        } else if (cartItem) {
            cartItems.removeChild(cartItem);
        }

        updateTotal();
    }

    function updateTotal() {
        total = Array.from(cartItems.children).reduce((sum, item) => {
            const itemPrice = parseFloat(item.querySelector('.item-price').textContent.replace('₹', ''));
            return sum + itemPrice;
        }, 0);

        totalElement.textContent = `Total: ₹${total.toFixed(2)}`;
    }
});
