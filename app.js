/* ============ إعداد Firebase ============ */
const firebaseConfig = {
  apiKey: "AIzaSyA1wwH5dC6J35wWkBblkbEYAicBmUZ4DLc",
  authDomain: "foodics-training.firebaseapp.com",
  projectId: "foodics-training",
  storageBucket: "foodics-training.firebasestorage.app",
  messagingSenderId: "513818011587",
  appId: "1:513818011587:web:955b2661c4ffe4f6093f76",
  measurementId: "G-RK022PVZTE"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Firebase Auth محتاج إيميل، فبنحول اسم المستخدم لإيميل وهمي ثابت
const EMAIL_DOMAIN = "@foodics-training.local";
function usernameToEmail(username) {
  return username.toLowerCase() + EMAIL_DOMAIN;
}

/* ============ بيانات المنتجات (متخزنة على Firestore دلوقتي) ============ */
const defaultProducts = [
  // Milkshakes
  { name: "Milk Shake", price: 95, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Nescafe Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Banana Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Caramel Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Red Berry Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Mocha Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Kiwi Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Blue Berry Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Lotus Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },
  { name: "Candy Shake", price: 99, icon: "🥤", cat: "Milkshakes", stock: true },

  // Ice Cream
  { name: "Mix Ice Cream", price: 94, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Banana Split", price: 99, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Sun Day", price: 89, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Sun Day Oreo", price: 99, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Sun Day Mars", price: 99, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Sun Day Kitkat", price: 99, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Sun Day Twix", price: 99, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Sun Day Chocolate Hazelnut", price: 99, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Vanilla Madness", price: 99, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Chocolate Madness", price: 99, icon: "🍨", cat: "Ice Cream", stock: true },
  { name: "Candy Madness", price: 105, icon: "🍨", cat: "Ice Cream", stock: true },

  // Sandwiches
  { name: "Chicken Panne", price: 179, icon: "🥪", cat: "Sandwiches", stock: true },
  { name: "Chicken Crispy", price: 179, icon: "🥪", cat: "Sandwiches", stock: true },
  { name: "Chicken Zinger", price: 179, icon: "🌶️", cat: "Sandwiches", stock: true },
  { name: "Cordon Blue", price: 189, icon: "🥪", cat: "Sandwiches", stock: true },
  { name: "Blue Ripple", price: 189, icon: "🥪", cat: "Sandwiches", stock: true },
  { name: "Country Fried Chicken", price: 189, icon: "🥪", cat: "Sandwiches", stock: true },
  { name: "Grilled Chicken Sandwich", price: 169, icon: "🥪", cat: "Sandwiches", stock: true },

  // Main Dishes
  { name: "Grilled Chicken", price: 279, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Grilled Steak", price: 389, icon: "🥩", cat: "Main Dishes", stock: true },
  { name: "Mix Grilled", price: 379, icon: "🍖", cat: "Main Dishes", stock: true },
  { name: "Fajita Chicken", price: 309, icon: "🌶️", cat: "Main Dishes", stock: true },
  { name: "Fajita Beef", price: 409, icon: "🌶️", cat: "Main Dishes", stock: true },
  { name: "Fajita Mix", price: 374, icon: "🌶️", cat: "Main Dishes", stock: true },
  { name: "Fajita Sausage", price: 329, icon: "🌶️", cat: "Main Dishes", stock: true },
  { name: "Chicken Stuffed", price: 359, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Chicken Mix", price: 309, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Beef Mix", price: 409, icon: "🥩", cat: "Main Dishes", stock: true },
  { name: "Quesadilla Chicken", price: 309, icon: "🌮", cat: "Main Dishes", stock: true },
  { name: "Quesadilla Beef", price: 409, icon: "🌮", cat: "Main Dishes", stock: true },
  { name: "Smoked Roll", price: 369, icon: "🌶️", cat: "Main Dishes", stock: true },
  { name: "Combo Tallah", price: 409, icon: "🍽️", cat: "Main Dishes", stock: true },
  { name: "Special Tallah", price: 439, icon: "🍽️", cat: "Main Dishes", stock: true },
  { name: "Mexican Owleh", price: 359, icon: "🌶️", cat: "Main Dishes", stock: true },
  { name: "Chicken Pickles", price: 319, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Picatta Chicken", price: 329, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Picatta Beef", price: 419, icon: "🥩", cat: "Main Dishes", stock: true },
  { name: "Goreginzola Chicken", price: 409, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Italian Chicken", price: 329, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Italian Beef", price: 419, icon: "🥩", cat: "Main Dishes", stock: true },
  { name: "Philadelphia Chicken", price: 329, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Philadelphia Beef", price: 419, icon: "🥩", cat: "Main Dishes", stock: true },
  { name: "Monterey Chicken", price: 329, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Trois Chicken", price: 329, icon: "🍗", cat: "Main Dishes", stock: true },
  { name: "Trois Steak", price: 429, icon: "🥩", cat: "Main Dishes", stock: true },

  // Oriental Grill
  { name: "Tikka Meal", price: 279, icon: "🍢", cat: "Oriental Grill", stock: true },
  { name: "Mashab Meal", price: 309, icon: "🍢", cat: "Oriental Grill", stock: true },
  { name: "Shish Tawook Meal", price: 259, icon: "🍢", cat: "Oriental Grill", stock: true },
  { name: "Chicken Mix Meal", price: 289, icon: "🍢", cat: "Oriental Grill", stock: true },
  { name: "Kofta Meal", price: 339, icon: "🍢", cat: "Oriental Grill", stock: true },
  { name: "Mix Meat Meal", price: 409, icon: "🍢", cat: "Oriental Grill", stock: true },
  { name: "Mix Grilled Meal", price: 449, icon: "🍢", cat: "Oriental Grill", stock: true },
  { name: "Grilled Tallah Meal", price: 499, icon: "🍢", cat: "Oriental Grill", stock: true },
];

let products = [];
let productsUnsubscribe = null;

async function ensureDefaultProducts() {
  const snapshot = await db.collection("products").limit(1).get();
  if (snapshot.empty) {
    const batch = db.batch();
    defaultProducts.forEach(p => {
      const ref = db.collection("products").doc();
      batch.set(ref, p);
    });
    await batch.commit();
  }
}

function listenToProducts() {
  if (productsUnsubscribe) productsUnsubscribe();
  productsUnsubscribe = db.collection("products").onSnapshot(snapshot => {
    products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderProducts();
  });
}

async function addProductToDb(product) {
  await db.collection("products").add(product);
}

async function deleteProductFromDb(id) {
  await db.collection("products").doc(id).delete();
}

const TAX_RATE = 0.14;

let cart = [];              // [{name, price, qty}]
let currentCat = "all";
let currentSearch = "";
let orderType = "Dine In";
let paymentMethod = "Cash";
let orderCounter = 1000;
let cashierName = "";

const productsEl = document.getElementById("products");
const itemsEl = document.getElementById("items");

/* ============ تسجيل الدخول (Firebase Authentication) ============ */
document.getElementById("loginBtn").addEventListener("click", async () => {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const errorEl = document.getElementById("loginError");

  if (!user || !pass) {
    errorEl.textContent = "من فضلك ادخل اسم المستخدم وكلمة المرور";
    return;
  }

  errorEl.textContent = "جاري تسجيل الدخول...";

  try {
    await auth.signInWithEmailAndPassword(usernameToEmail(user), pass);
    errorEl.textContent = "";
    cashierName = user;
    document.getElementById("cashierName").textContent = "الكاشير: " + cashierName;
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("pos").style.display = "block";

    // زرار إدارة المستخدمين يظهر بس للأدمن
    document.getElementById("manageUsersBtn").style.display =
      (cashierName === "admin") ? "inline-block" : "none";
    document.getElementById("importTallahBtn").style.display =
      (cashierName === "admin") ? "block" : "none";

    await ensureDefaultProducts();
    listenToProducts();
    renderCart();
    updateClock();
    setInterval(updateClock, 1000 * 30);
  } catch (err) {
    errorEl.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة";
  }
});

document.getElementById("guestBtn").addEventListener("click", async () => {
  const errorEl = document.getElementById("loginError");
  errorEl.textContent = "جاري الدخول كزائر...";

  try {
    await auth.signInAnonymously();
    errorEl.textContent = "";
    cashierName = "زائر";
    document.getElementById("cashierName").textContent = "الكاشير: زائر (تجربة)";
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("pos").style.display = "block";

    // الزائر ميقدرش يدير المستخدمين
    document.getElementById("manageUsersBtn").style.display = "none";

    await ensureDefaultProducts();
    listenToProducts();
    renderCart();
    updateClock();
    setInterval(updateClock, 1000 * 30);
  } catch (err) {
    errorEl.textContent = "الدخول كزائر مش متاح دلوقتي، حاول تاني";
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  if (cart.length > 0 && !confirm("فيه طلب لسه مفتوح، متأكد عايز تخرج؟")) return;
  if (productsUnsubscribe) { productsUnsubscribe(); productsUnsubscribe = null; }
  await auth.signOut();
  document.getElementById("pos").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("manageUsersBtn").style.display = "none";
  cart = [];
});

/* ---- نافذة إدارة المستخدمين (الأدمن بس) ---- */
const usersModal = document.getElementById("usersModal");

document.getElementById("manageUsersBtn").addEventListener("click", () => {
  usersModal.classList.add("show");
});

document.getElementById("closeUsersModal").addEventListener("click", () => {
  usersModal.classList.remove("show");
});

document.getElementById("addUserBtn").addEventListener("click", async () => {
  const nameInput = document.getElementById("newUserName");
  const passInput = document.getElementById("newUserPass");
  const errorEl = document.getElementById("userError");

  const name = nameInput.value.trim();
  const pass = passInput.value.trim();

  if (!name || !pass) {
    errorEl.textContent = "من فضلك اكتب اسم مستخدم وكلمة مرور";
    return;
  }
  if (pass.length < 6) {
    errorEl.textContent = "كلمة المرور لازم تكون 6 حروف/أرقام على الأقل";
    return;
  }

  errorEl.textContent = "جاري الإضافة...";

  // بنستخدم تطبيق فرعي مؤقت عشان ننشئ الحساب من غير ما نسجل خروج الأدمن الحالي
  const secondaryApp = firebase.initializeApp(firebaseConfig, "secondary_" + Date.now());
  try {
    await secondaryApp.auth().createUserWithEmailAndPassword(usernameToEmail(name), pass);
    await secondaryApp.auth().signOut();
    errorEl.textContent = "";
    nameInput.value = "";
    passInput.value = "";
    alert(`تم إنشاء حساب "${name}" بنجاح، يقدر يدخل بيه دلوقتي`);
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      errorEl.textContent = "اسم المستخدم ده موجود بالفعل";
    } else {
      errorEl.textContent = "حصل خطأ: " + err.message;
    }
  } finally {
    await secondaryApp.delete();
  }
});

function updateClock(){
  const now = new Date();
  document.getElementById("clockNow").textContent = now.toLocaleTimeString("ar-EG",{hour:'2-digit',minute:'2-digit'});
}

/* ============ نوع الطلب ============ */
document.querySelectorAll(".order-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".order-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    orderType = btn.dataset.type;
    const typeNames = {"Dine In":"تناول بالفرع","Takeaway":"تيك أواي","Delivery":"دليفري"};
    document.getElementById("orderMeta").textContent = "النوع: " + typeNames[orderType];
  });
});

/* ============ الأقسام + البحث ============ */
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    renderProducts();
  });
});

document.getElementById("searchBox").addEventListener("input", (e) => {
  currentSearch = e.target.value.trim().toLowerCase();
  renderProducts();
});

function renderProducts() {
  productsEl.innerHTML = "";
  let list = currentCat === "all" ? products : products.filter(p => p.cat === currentCat);
  if (currentSearch) {
    list = list.filter(p => p.name.toLowerCase().includes(currentSearch));
  }

  if (list.length === 0) {
    productsEl.innerHTML = "<p>لا يوجد منتجات مطابقة</p>";
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card" + (p.stock ? "" : " out-of-stock");
    card.innerHTML = `
      <button class="delete-product-btn" title="حذف الصنف">×</button>
      <div class="icon">${p.icon}</div><h4>${p.name}</h4><p>${p.price} EGP</p>`;

    card.querySelector(".delete-product-btn").addEventListener("click", async (e) => {
      e.stopPropagation();
      if (confirm(`متأكد عايز تمسح "${p.name}" نهائيًا من قائمة المنتجات؟`)) {
        await deleteProductFromDb(p.id);
      }
    });

    if (p.stock) {
      card.addEventListener("click", () => addToCart(p));
    }
    productsEl.appendChild(card);
  });
}

/* ============ إضافة صنف جديد ============ */
document.getElementById("importTallahBtn").addEventListener("click", async () => {
  if (!confirm(`هيتم إضافة ${defaultProducts.length} صنف من قائمة مطعم طلة (هيتخطى أي صنف بنفس الاسم موجود بالفعل). تكمل؟`)) return;

  const existingNames = new Set(products.map(p => p.name));
  const toAdd = defaultProducts.filter(p => !existingNames.has(p.name));

  if (toAdd.length === 0) {
    alert("كل الأصناف دي موجودة بالفعل في القائمة");
    return;
  }

  const batch = db.batch();
  toAdd.forEach(p => {
    const ref = db.collection("products").doc();
    batch.set(ref, p);
  });
  await batch.commit();

  alert(`تم إضافة ${toAdd.length} صنف بنجاح`);
});

document.getElementById("addProductBtn").addEventListener("click", async () => {
  const nameInput = document.getElementById("newName");
  const priceInput = document.getElementById("newPrice");
  const catInput = document.getElementById("newCat");

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const cat = catInput.value;

  if (!name || isNaN(price) || price <= 0) {
    alert("من فضلك اكتب اسم صحيح وسعر أكبر من صفر");
    return;
  }

  await addProductToDb({ name, price, icon: "🆕", cat, stock: true });
  nameInput.value = "";
  priceInput.value = "";
});

/* ============ الكارت ============ */
function addToCart(product) {
  const existing = cart.find(i => i.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: product.name, price: product.price, qty: 1, note: "" });
  }
  renderCart();
}

function updateNote(index, value) {
  cart[index].note = value;
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function calcTotals() {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountPercent = parseFloat(document.getElementById("discountInput").value) || 0;
  const discountAmount = subtotal * (discountPercent / 100);
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * TAX_RATE;
  const total = afterDiscount + tax;
  return { subtotal, discountAmount, tax, total };
}

function renderCart() {
  itemsEl.innerHTML = "";

  if (cart.length === 0) {
    itemsEl.innerHTML = '<div class="empty-cart">لا يوجد أصناف في الطلب</div>';
  } else {
    cart.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "item-row";
      row.innerHTML = `
        <div class="info">
          <div class="name">${item.name}</div>
          <div>${item.price} EGP</div>
        </div>
        <div class="qty-controls">
          <button class="qty-minus">-</button>
          <span>${item.qty}</span>
          <button class="qty-plus">+</button>
        </div>
        <button class="remove-btn">حذف</button>
        <input type="text" class="item-note-input" placeholder="ملاحظة على الصنف (مثال: من غير سكر)" value="${item.note || ''}">
      `;
      row.querySelector(".qty-minus").addEventListener("click", () => changeQty(index, -1));
      row.querySelector(".qty-plus").addEventListener("click", () => changeQty(index, 1));
      row.querySelector(".remove-btn").addEventListener("click", () => removeItem(index));
      row.querySelector(".item-note-input").addEventListener("input", (e) => updateNote(index, e.target.value));
      itemsEl.appendChild(row);
    });
  }

  const { subtotal, discountAmount, tax, total } = calcTotals();
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("discountAmount").textContent = discountAmount.toFixed(2);
  document.getElementById("taxAmount").textContent = tax.toFixed(2);
  document.getElementById("grandTotal").textContent = total.toFixed(2);
}

document.getElementById("discountInput").addEventListener("input", renderCart);

document.getElementById("clearBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  if (confirm("متأكد عايز تمسح الطلب؟")) {
    cart = [];
    renderCart();
  }
});

/* ============ طريقة الدفع ============ */
document.querySelectorAll(".pay-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pay-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    paymentMethod = btn.dataset.method;
  });
});

/* ============ إتمام الطلب + طباعة الرسيت ============ */
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("السلة فارغة، ضيف أصناف الأول");
    return;
  }

  orderCounter += 1;
  const orderNo = "#" + orderCounter;
  document.getElementById("orderNumberLabel").textContent = orderNo;

  const { subtotal, discountAmount, tax, total } = calcTotals();
  const typeNames = {"Dine In":"تناول بالفرع","Takeaway":"تيك أواي","Delivery":"دليفري"};
  const payNames = {"Cash":"كاش","Card":"فيزا/ماستركارد","Wallet":"محفظة إلكترونية"};
  const tableNo = document.getElementById("tableNo").value.trim();

  document.getElementById("receiptDate").textContent = new Date().toLocaleString("ar-EG");
  document.getElementById("rOrderNo").textContent = orderNo;
  document.getElementById("rCashier").textContent = cashierName;
  document.getElementById("rOrderType").textContent = typeNames[orderType];

  const tableRow = document.getElementById("rTableRow");
  if (orderType === "Dine In" && tableNo) {
    tableRow.style.display = "flex";
    document.getElementById("rTable").textContent = tableNo;
  } else {
    tableRow.style.display = "none";
  }

  const receiptItems = document.getElementById("receiptItems");
  receiptItems.innerHTML = "";
  cart.forEach(item => {
    const noteHtml = item.note ? `<div style="font-size:11px;color:#555;">ملاحظة: ${item.note}</div>` : "";
    receiptItems.innerHTML += `<tr><td>${item.name}${noteHtml}</td><td>${item.qty}</td><td>${(item.price*item.qty).toFixed(2)} EGP</td></tr>`;
  });

  document.getElementById("rSubtotal").textContent = subtotal.toFixed(2) + " EGP";
  document.getElementById("rDiscount").textContent = discountAmount.toFixed(2) + " EGP";
  document.getElementById("rTax").textContent = tax.toFixed(2) + " EGP";
  document.getElementById("rTotal").textContent = total.toFixed(2) + " EGP";
  document.getElementById("rPayment").textContent = payNames[paymentMethod];

  window.print();

  // بعد إتمام الطلب يفضى الكارت استعدادًا لطلب جديد
  cart = [];
  document.getElementById("discountInput").value = 0;
  renderCart();
});
