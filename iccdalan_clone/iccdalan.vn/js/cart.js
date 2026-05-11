document.addEventListener("DOMContentLoaded", () => {
  // Lấy giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem('iccdalan_cart')) || [];

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    // Giả sử có một phần tử hiển thị số lượng giỏ hàng trên Header có id "cart-count"
    const countEl = document.querySelector('#cart-count');
    if (countEl) countEl.innerText = count;
  }

  // Khởi tạo số lượng
  updateCartCount();

  // Bắt sự kiện thêm vào giỏ
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
      e.preventDefault();
      const btn = e.target.closest('.add-to-cart-btn');
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'));
      const image = btn.getAttribute('data-image');

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, image, quantity: 1 });
      }

      localStorage.setItem('iccdalan_cart', JSON.stringify(cart));
      updateCartCount();
      alert(`Đã thêm "${name}" vào giỏ hàng!`);
    }
  });
});
