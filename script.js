document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsElement = document.getElementById('cart-items');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));

            const existingItem = cartItems.find(item => item.product === product);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += price;
            } else {
                cartItems.push({ product, price, quantity: 1, totalPrice: price });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product} (x${item.quantity}) - R$ ${item.totalPrice.toFixed(2)}`;
            cartItemsElement.appendChild(li);
            total += item.totalPrice;
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    document.getElementById('checkout').addEventListener('click', () => {
        // Criar a seção de detalhes da compra
        const purchaseDetailsSection = document.createElement('section');
        purchaseDetailsSection.id = 'purchase-details';
        purchaseDetailsSection.innerHTML = `
            <h2>Detalhes da Compra</h2>
            <ul>
                ${cartItems.map(item => `
                    <li>${item.product} (x${item.quantity}) - R$ ${item.totalPrice.toFixed(2)}</li>
                `).join('')}
            </ul>
            <p><strong>Total: R$ ${cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}</strong></p>
            <button id="close-details">Fechar</button>
        `;
        document.body.appendChild(purchaseDetailsSection);

        // Limpar o carrinho
        cartItems.length = 0;
        updateCart();

        // Fechar os detalhes da compra
        document.getElementById('close-details').addEventListener('click', () => {
            purchaseDetailsSection.remove();
        });
    });

    document.getElementById('contato').addEventListener('click', (event) => {
        event.preventDefault();
        alert('Contato:\nTelefone: +55 55997303851\nInstagram: @gabriel_saccol');
    });
});
