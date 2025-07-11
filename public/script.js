const imgsrc = [
  "/Sneakick/Assets/shoe1.png",
  "/Sneakick/Assets/shoe2.png",
  "/Sneakick/Assets/shoe3.png",
  "/Sneakick/Assets/shoe4.png",
  "/Sneakick/Assets/shoeCop5.png",
  "/Sneakick/Assets/shoeCop6.png",
  "/Sneakick/Assets/Shoe7.png",
];
const wishlist = [];
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  const itemAtCart = JSON.parse(localStorage.getItem("shoe")) || [];
  const hasItem = document.getElementById("cartHasItem");
  const BillAmt = document.getElementById("totalAmt");
  function updateLocalStorage() {
    localStorage.setItem("shoe", JSON.stringify(itemAtCart));
  }

  function getTotal() {
    const total = itemAtCart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    BillAmt.innerText = total.toFixed(2);
  }

  if (page === "home") {
    setupHomePage();
  } else if (page === "Cart") {
    setupCartPage();
  }
  else if(page === "login"){
    setupProfilePage();
  }
  else if(page === "Exists"){
    setupExistsPage();
  }
 
  function setupExistsPage(){
    const Name = document.getElementById('UserName');
    const Email = document.getElementById('UserEmail');
    const Phone = document.getElementById('UserPhone');
    const Pass = document.getElementById('UserPass');
    const existingUser = JSON.parse(localStorage.getItem('user'));
    Name.innerHTML = existingUser.name;
    Email.innerHTML = existingUser.email;
    Phone.innerHTML = existingUser.phone;
    let toggleState = true;
    const toggle = document.getElementById('togglePass')
    toggle.addEventListener('click',()=>{
      if(toggleState){
        Pass.innerHTML = existingUser.pass;
      }
      else{
        Pass.innerHTML = "•••••••••••"
      }
      toggleState=!toggleState;
    })
  }


  function setupHomePage() {
    const carousel = document.getElementById("carousel");
    const slides = carousel.querySelectorAll("img");
    const popupMenu = document.getElementById("PopUp");
    const menu = document.getElementById("menu");
    const nav = document.getElementById("nav");
    const totalSlides = slides.length;
    let index = 0;

    menu.addEventListener("click", () => toggleMenu(popupMenu, nav, 55));
    window.addEventListener("scroll", () => handleScroll(nav, popupMenu, 55));

    document.getElementById("next").addEventListener("click", () => {
      index = (index + 1) % totalSlides;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    });

    document.getElementById("prev").addEventListener("click", () => {
      index = (index - 1 + totalSlides) % totalSlides;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    });

    const overlays = document.querySelectorAll(".shoe-overlay");
    overlays.forEach((overlay) => {
      const container = overlay.closest(".group");
      container.addEventListener("mouseenter", () =>
        overlay.classList.remove("hidden")
      );
      container.addEventListener("mouseleave", () =>
        overlay.classList.add("hidden")
      );
    });

    const CartBtn = document.querySelectorAll(".AddtoCart");
    CartBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const ShoePrice = document.getElementById(`price${index + 1}`);
        const item = {
          name: `shoes${index}`,
          price: parseInt(ShoePrice.innerHTML),
        };
        const existing = itemAtCart.find((shoe) => shoe.name === item.name);
        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          item.quantity = 1;
          itemAtCart.push(item);
        }
        updateLocalStorage();
        alert("Item added to cart successfully!");
      });
    });
  }

  function setupCartPage() {
    const popupMenu = document.getElementById("PopUp");
    const menu = document.getElementById("menu");
    const nav = document.getElementById("nav");
    const cartDiv = document.getElementById("CartInfo");
    const cart = document.getElementById("CartItems");

    menu.addEventListener("click", () => toggleMenu(popupMenu, nav, 80));
    window.addEventListener("scroll", () => handleScroll(nav, popupMenu, 55));

    if (itemAtCart.length > 0) {
      getTotal();
      cartDiv.classList.add("hidden");
      hasItem.classList.remove("hidden");

      imgsrc.forEach((src, index) => {
        const item = itemAtCart.find((i) => i.name === `shoes${index}`);
        if (!item) return;

        const container = document.createElement("div");
        container.className =
          "flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 border-b border-gray-300";

        const img = document.createElement("img");
        img.src = src;
        img.alt = item.name;
        img.className = "w-full sm:w-[180px] object-contain";

        const name = document.createElement("span");
        name.innerText = `Shoe${index}`;
        name.className =
          "text-3xl sm:text-6xl font-michroma font-semibold text-gray-800 mb-1";

        const quantity = document.createElement("span");
        quantity.className = "text-lg sm:text-xl text-gray-500 mb-2";
        quantity.innerText = `×${item.quantity || 1}`;

        const price = document.createElement("span");
        price.className =
          "text-2xl sm:text-3xl font-semibold text-green-600 mt-1";
        price.innerText = `₹${item.price * item.quantity}`;

        const sizeLabel = document.createElement("label");
        sizeLabel.innerText = "Size :";
        sizeLabel.className = "text-gray-600 font-medium mr-2";

        const sizeSelect = document.createElement("select");
        sizeSelect.className =
          "border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none";
        [6, 7, 8, 9, 10].forEach((size) => {
          const option = document.createElement("option");
          option.value = size;
          option.text = size;
          sizeSelect.appendChild(option);
        });

        const sizeWrap = document.createElement("div");
        sizeWrap.className = "flex items-center gap-2 flex-wrap";
        sizeWrap.appendChild(sizeLabel);
        sizeWrap.appendChild(sizeSelect);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.className =
          "bg-green-300 font-semibold hover:text-white text-red-400 px-3 py-2 rounded-lg hover:scale-95 transition-all ease-in-out duration-300 hover:bg-red-500 mt-4 w-fit";

        deleteBtn.addEventListener("click", () => {
          alert("Item removed from cart successfully");
          const indexToRemove = itemAtCart.findIndex(
            (i) => i.name === item.name
          );
          if (indexToRemove !== -1) {
            itemAtCart.splice(indexToRemove, 1);
            updateLocalStorage();
            getTotal();
            container.remove();
          }
          if (itemAtCart.length === 0) {
            hasItem.classList.add("hidden");
            cartDiv.classList.remove("hidden");
          }
        });

        const infoBox = document.createElement("div");
        infoBox.className = "flex flex-col gap-2 sm:ml-6 mt-2 sm:mt-0 w-full";
        infoBox.appendChild(name);
        infoBox.appendChild(quantity);
        infoBox.appendChild(sizeWrap);
        infoBox.appendChild(price);
        infoBox.appendChild(deleteBtn);

        container.appendChild(img);
        container.appendChild(infoBox);
        cart.appendChild(container);
      });

      const checkOut = document.getElementById("CheckOutbtn");
      const Payment = document.getElementById("PaymentPopUp");
      const cancel = document.getElementById("ClosePayment");
      const CashOnDelivery = document.getElementById("payCOD");
      const UserInfo = document.getElementById("ShippingPopUp");
      const CloseCod = document.getElementById("CloseShipping");
      const DoneCOD = document.getElementById("submit");
      const UPI = document.getElementById("payUPI");
      const UPIPop = document.getElementById("UPIpay");
      const CloseUpi = document.getElementById("CloseUPI");
      const PayUpi = document.getElementById("payupi");
      const PayCod = document.getElementById("paycod");
      const PayGpay = document.getElementById("payGPay");
      checkOut.addEventListener("click", () =>
        Payment.classList.remove("hidden")
      );
      cancel.addEventListener("click", () => Payment.classList.add("hidden"));
      CashOnDelivery.addEventListener("click", () =>
        UserInfo.classList.remove("hidden")
      );
      DoneCOD.addEventListener("click", () => {
        alert("Order placed Successfully");
        cart.innerHTML = "";
        localStorage.removeItem("shoe");
        hasItem.classList.add("hidden");
        cartDiv.classList.remove("hidden");
      });
      CloseCod.addEventListener('click',()=>{
        UserInfo.classList.add("hidden")
      })
      UPI.addEventListener('click',()=>{
        UPIPop.classList.remove('hidden')
      })
      CloseUpi.addEventListener('click',()=>{
        UPIPop.classList.add('hidden')
      })
      PayUpi.addEventListener('click',()=>{
        alert('Payment done successfully')
        cart.innerHTML = "";
        localStorage.removeItem("shoe");
        hasItem.classList.add("hidden");
        cartDiv.classList.remove("hidden");
        UPIPop.classList.add('hidden')
        Payment.classList.add("hidden")
      })
      PayGpay.addEventListener('click',()=>{
        alert('Payment done successfully')
        cart.innerHTML = "";
        localStorage.removeItem("shoe");
        hasItem.classList.add("hidden");
        cartDiv.classList.remove("hidden");
        UPIPop.classList.add('hidden')
        Payment.classList.add("hidden")
      })
      PayCod.addEventListener('click',()=>{
        Payment.classList.add('hidden')
        UserInfo.classList.remove('hidden');
      })
    } else {
      hasItem.classList.add("hidden");
      cartDiv.classList.remove("hidden");
    }
  }
  function toggleMenu(menu, nav, offset) {
    const navRect = nav.getBoundingClientRect();
    const isHidden = menu.classList.contains("hidden");
    menu.style.top = `${navRect.bottom + window.scrollY - offset}px`;
    menu.style.left = `${navRect.left + window.scrollX}px`;
    if (isHidden) {
      setTimeout(() => {
        menu.classList.remove("opacity-0", "scale-75", "hidden");
        menu.classList.add("opacity-100", "scale-100");
      }, 10);
    } else {
      menu.classList.add("opacity-0", "scale-75");
      menu.classList.remove("opacity-100", "scale-100");
      setTimeout(() => {
        menu.classList.add("hidden");
      }, 300);
    }
  }
  function handleScroll(nav, popupMenu, offset) {
    const navRect = nav.getBoundingClientRect();
    if (window.scrollY > 60) {
      nav.classList.add(
        "w-[90%]",
        "min-h-[30px]",
        "top-4",
        "rounded-2xl",
        "left-1/2",
        "-translate-x-1/2"
      );
      nav.classList.remove("w-full", "min-h-[50px]", "sm:min-h-[70px]", "p-1");
    } else {
      nav.classList.remove(
        "w-[90%]",
        "min-h-[30px]",
        "top-4",
        "rounded-2xl",
        "left-1/2",
        "-translate-x-1/2"
      );
      nav.classList.add("w-full", "min-h-[50px]", "sm:min-h-[70px]", "p-1");
    }
    popupMenu.style.top = `${navRect.bottom + window.scrollY - offset}px`;
    popupMenu.style.left = `${navRect.left + window.scrollX}px`;
    popupMenu.classList.add("opacity-0", "scale-75");
    popupMenu.classList.remove("opacity-100", "scale-100");
    setTimeout(() => popupMenu.classList.add("hidden"), 300);
  }

  // function CheckUser(){
  //   if(user.name === null){
  //     window.open("login.html","_self")
  //   }
  //   else{
  //     window.open("registerUser.html","_self")
  //   }
  // }
  let count = 0;
  function setupProfilePage() {
  const RegisterBttn = document.getElementById('registerUser');
  RegisterBttn.addEventListener('click', () => {
    const userName = document.getElementById('nameUser').value.trim();
    const userPhone = document.getElementById('phoneUser').value.trim();
    const userEmail = document.getElementById('emailUser').value.trim();
    const userPass = document.getElementById('passwordUser').value.trim();
    const user = {
      name: userName,
      phone: userPhone,
      email: userEmail,
      pass: userPass
    };
    if (!userName || !userPhone || !userEmail || !userPass) {
      alert("Please fill in all the fields!");
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    alert('Registered Successfully');

    // setTimeout(() => {
    // }, 100);
    count+=1
  });
}
const Profile = document.getElementById('Profile');
const savedUser = JSON.parse(localStorage.getItem('user'));
Profile.addEventListener('click', () => {
  if (savedUser && savedUser.name) {
    window.location.href = "register-user.html";
  } else {
    window.location.href = "login.html";
  }
});

// if(savedUser.name && savedUser){
//   Profile.addEventListener('click',()=>{
//     window.location.href="registerUser.html"
//   })
// }
// Profile.addEventListener('click',()=>{
//   alert("asdas")
//   window.location.href="login.html"
// })
// else{
//   Profile.addEventListener('click',()=>{
//     window.location.href="login.html"
//   })
// }

});//end of dom
