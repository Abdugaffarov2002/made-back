// try {
//   const x = 10;
//   console.log(y);
// } catch (error) {
//   console.error(error);
// } finally {
//   console.log("qwerty");
// }

const API = "http://localhost:8000/products";

const name_inp = document.querySelector(".name_input");
const phone_inp = document.querySelector(".phone_input");
const img_inp = document.querySelector(".image_input");

const send_btn = document.querySelector(".send_button");

const card = document.querySelector(".card");

const modalBlock = document.querySelector(".form_post");
const modalOpenBtn = document.querySelector(".modal_open_btn");

const container = document.querySelector(".container");

modalOpenBtn.addEventListener("click", () => {
  modalBlock.style.display = "flex";
  modalOpenBtn.style.display = "none";
  container.style.display = "none";
});

// ! POST // CREATE

async function postProduct(newProducts) {
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProducts),
    });
    getProducts();
  } catch (error) {
    console.error(error);
  }
  modalBlock.style.display = "none";
  modalOpenBtn.style.display = "flex";
  container.style.display = "block";
}

send_btn.addEventListener("click", () => {
  if (
    name_inp.value.trim() !== "" &&
    phone_inp.value.trim() !== "" &&
    img_inp.value.trim() !== ""
  ) {
    const newProducts = {
      name: name_inp.value,
      phone: phone_inp.value,
      img: img_inp.value,
    };
    postProduct(newProducts);
  } else {
    alert("Убедитесь на заполненность полей");
  }

  name_inp.value = "";
  phone_inp.value = "";
  img_inp.value = "";
});

// ! GET // READ

async function getProducts() {
  try {
    const result = await fetch(API).then((data) => data.json());

    card.innerHTML = "";

    console.log(card);

    result.forEach((item) => {
      card.innerHTML += `
      <div class="card_item">
        <img src=${item.img}  width='150px'/>
        <h3>${item.name}</h3>
        <p>${item.phone}</p>
        <button onclick="deleteProduct(${item.id})">DELETE</button>
        <button onclick="getOneProduct(${item.id})">EDIT</button>
      </div>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

getProducts();

/// Delete ///
async function deleteProduct(id) {
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    getProducts();
  } catch (error) {
    console.error(error);
  }
}

const modal = document.querySelector(".modal_blok");

const editedNameInp = document.querySelector(".edit_name_input");
const editedPhoneInp = document.querySelector(".edit_phone_input");
const editedImgInp = document.querySelector(".edit_image_input");
const editIdInp = document.querySelector(".edit_id_input");

const editBtn = document.querySelector(".edit_btn");

/// get one product ///

async function getOneProduct(id) {
  const result = await fetch(`${API}/${id}`).then((data) => data.json());
  modal.style.display = "block";
  container.style.display = "none";

  editedNameInp.value = result.name;
  editedPhoneInp.value = result.phone;
  editedImgInp.value = result.img;
  editIdInp.value = result.id;
}

async function editProduct() {
  const id = editIdInp.value;
  const editedProduct = {
    name: editedNameInp.value,
    phone: editedPhoneInp.value,
    img: editedImgInp.value,
    id: id,
  };
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedProduct),
  });
  getProducts();
}

editBtn.addEventListener("click", () => {
  editProduct();
  modal.style.display = "none";
  container.style.display = "block";
});
