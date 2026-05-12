let cart = [];

// Smooth scroll to section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

// Add shoe with size/color variants
function addShoeToCart(button, name, price) {
  const card = button.closest(".card");
  const size = card.querySelector(".size").value;
  const color = card.querySelector(".color").value;
  cart.push({ name, price, size, color });
  updateCart();
  openCart();
}

// Add service (no variants)
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  openCart();
}

// Cart modal controls
function showCart() { updateCart(); openCart(); }
function openCart() { document.getElementById("cart-modal").style.display = "block"; }
function closeCart() { document.getElementById("cart-modal").style.display = "none"; }

// Update cart items and total
function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.size && item.color) {
      li.textContent = `${item.name} (Size ${item.size}, ${item.color}) - KES ${item.price.toLocaleString()}`;
    } else {
      li.textContent = `${item.name} - KES ${item.price.toLocaleString()}`;
    }
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => { cart.splice(index,1); updateCart(); };
    li.appendChild(removeBtn);
    list.appendChild(li);
    total += item.price;
  });
  document.getElementById("cart-total").textContent = `Total: KES ${total.toLocaleString()}`;
  document.getElementById("cart-count").textContent = cart.length;
}

// Back to Top button visibility
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTop");
  if (window.scrollY > 300) btn.classList.add("show");
  else btn.classList.remove("show");
});

// Scroll animations: reveal sections and cards
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(sec => observer.observe(sec));
document.querySelectorAll(".card").forEach(card => observer.observe(card));
