let cart = [];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: "smooth" });
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  alert(`${name} added to cart!`);
}

function showCart() {
  scrollToSection("cart");
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)} `;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => { cart.splice(index,1); updateCart(); };
    li.appendChild(removeBtn);
    list.appendChild(li);
    total += item.price;
  });
  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
  document.getElementById("cart-count").textContent = cart.length;
}

// Back to Top button visibility
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTop");
  if (window.scrollY > 300) btn.classList.add("show");
  else btn.classList.remove("show");
});

// Scroll animations: reveal sections when they enter viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(sec => observer.observe(sec));
