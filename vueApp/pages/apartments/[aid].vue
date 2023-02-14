<template>
  <div>
    <NavBarVue />
    <h2 v-if="loadPreview.load == true">
      <InventoryPreview :items="previewItems.inventory" @approve="approveList()" @cancel="cancelList()" />
    </h2>
    <div v-else>
      <div v-if="showAlert.show" class="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Cannot Add More Than 20 Items</span>
        </div>
      </div>
      <div class="stats shadow">

        <div class="stat">
          <div class="stat-value">{{ state.inventory.length }}</div>
          <div class="stat-title">Different Items</div>
        </div>

      </div>
      <button @click="showForm" class="btn btn-success">Add Inventory Item</button>
      <div v-if="addFormView.showForm == 'show'" class="card w-96 bg-base-100 shadow-xl">

        <div class="card-body items-center text-center">
          <h2 class="card-title">Add Item</h2>
          <label for="name">Add Name</label>
          <select @change="(e)=>handleChange(e)" name="name" id="">
            <option value="refrigerator">Refrigerator</option>
            <option value="television">Television</option>
            <option value="bed">Bed</option>
            <option value="table">Table</option>
            <option value="sofa">Sofa</option>
          </select>
          <!-- <input type="text" :value="nameAdd.name" :onchange="(e) => nameAdd.name = e.target.value"
            placeholder="Add Name"> -->
          <label for="name">Add Quantity</label>

          <input type="text" :value="quantityAdd.qty" :onchange="(e) => quantityAdd.qty = e.target.value"
            placeholder="Add Quantity">
          <div class="card-actions">
            <button @click="confirmAdd()" class="btn btn-primary">Add Item</button>
          </div>
        </div>
      </div>
      <div v-if="formView.showForm == 'show'" class="card w-96 bg-base-100 shadow-xl">

        <div class="card-body items-center text-center">
          <h2 class="card-title">Edit Item</h2>
          <input type="text" :value="nameEdit.name" :onchange="(e) => nameEdit.name = e.target.value"
            placeholder="Edit Name">
          <input type="text" :value="quantityEdit.qty" :onchange="(e) => quantityEdit.qty = e.target.value"
            placeholder="Edit Quantity">
          <div class="card-actions">
            <button @click="confirmEdit(item)" class="btn btn-primary">Edit Item</button>
          </div>
        </div>
      </div>
      <div v-if="state.inventory.length > 0" class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Quantity</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in state.inventory">
              <th>{{ index + 1 }}</th>
              <th>{{ item.quantity }}</th>
              <td>{{ item.name }}</td>
              <td><button @click="editItem(item)" class=" btn btn-primary">Edit</button></td>
              <td><button @click="deleteItem(item)" class="btn  btn-warning">Delete</button></td>
            </tr>

          </tbody>
        </table>
      </div>

      <h2 v-else>There are no items for this apartment</h2>

    </div>


  </div>
</template>
  
<script setup>

// import apartments from '../../apartments'
import NavBarVue from '../NavBar.vue';
import InventoryPreview from '../InventoryPreview.vue'
import { reactive } from 'vue';
import { onMounted } from 'vue'


const { aid } = useRoute().params
const state = reactive({ inventory: "" })
const previewItems = reactive({ inventory: "" })
const formView = reactive({ showForm: "hide" })
const addFormView = reactive({ showForm: "hide" })
const nameEdit = reactive({ name: "" })
const quantityEdit = reactive({ qty: "" })
const nameAdd = reactive({ name: "" })
const quantityAdd = reactive({ qty: "" })
const selectedItem = reactive({ item: "" })
const loadPreview = reactive({ load: false })
const showAlert = reactive({ show: false })

let selectedApartment;
onMounted(() => {

  let apartments = JSON.parse(localStorage.getItem("items"))
  if (apartments != undefined) {

    let apartmentWithAID = apartments.filter((item) => {
      if (item.aid == aid) {
        return item
      }
    })

    selectedApartment = apartmentWithAID[0]
    console.log(selectedApartment)
    state.inventory = selectedApartment.inventory
  }
})

function handleChange(e){
  nameAdd.name = e.target.value
}

function approveList() {
  console.log("approved")
  let data = JSON.parse(localStorage.getItem("items"))
  let changedData = data.map((apartment) => {
    if (apartment.aid == aid) {

      apartment.inventory = previewItems.inventory
    }
    return apartment
  })
  state.inventory = previewItems.inventory
  localStorage.setItem("items", JSON.stringify(changedData))

  loadPreview.load = false
}
function cancelList() {
  state.inventory.pop()
  console.log("cancelled")
  loadPreview.load = false

}
function showForm() {
  console.log("check2")
  addFormView.showForm = 'show'
}
function deleteItem(item) {
  let data = JSON.parse(localStorage.getItem("items"))
  console.log(data);
  let index = state.inventory.indexOf(item)
  state.inventory.splice(index, 1)
  console.log(state.inventory)

  let changedData = data.map((item) => {
    if (item.aid == aid) {
      item.inventory = state.inventory
    }
    return item


  })
  console.log(changedData)
  localStorage.setItem("items", JSON.stringify(changedData))
  console.log(index)

}
function editItem(item) {
  console.log("check")
  formView.showForm = 'show'
  selectedItem.item = item
  console.log(formView.showForm)


}

function confirmEdit() {
  console.log(selectedItem.item)
  console.log(nameEdit.name)
  console.log(quantityEdit.qty)

  let goAhead = checkTotalItems()
  if (goAhead) {

    let data = JSON.parse(localStorage.getItem("items"))
    let changedData = data.map((apartment) => {
      if (apartment.aid == aid) {
        for (let i = 0; i < apartment.inventory.length; i++) {
          if (apartment.inventory[i].name == selectedItem.item.name) {
            console.log(apartment.inventory[i].name)
            apartment.inventory[i].name = nameEdit.name
            apartment.inventory[i].quantity = quantityEdit.qty
          }
        }
      }
      return apartment

    })
    console.log(changedData)
    localStorage.setItem("items", JSON.stringify(changedData))
    formView.showForm = "hide"
    // selectedApartment.inventory = changedData
    window.location.reload()
  }
}
function checkTotalItems() {
  let data = JSON.parse(localStorage.getItem("items"))
  let totalItems = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i].aid == aid) {
      for (let j = 0; j < data[i].inventory.length; j++) {
        // if (data[i].inventory[i].name != nameEdit.name) {

          totalItems += parseInt(data[i].inventory[j].quantity)
        // }
      }
    }
  }
  totalItems -= selectedItem.item.quantity
  totalItems += parseInt(quantityEdit.qty)
  console.log(totalItems)
  if (totalItems > 20) {
    showAlert.show = true
    setTimeout(() => {
      showAlert.show = false
    }, 4000)
    // alert("Item Not Added. Can't Have More Than 20 Items")
    return false
  }

  return true
}
function confirmAdd() {

  let goAhead = getTotalItems()
  if (goAhead) {

    previewItems.inventory = state.inventory
    previewItems.inventory.push({ "name": nameAdd.name, "quantity": quantityAdd.qty })
    loadPreview.load = true
    // navigateTo("/preview/"+changedData)
    // localStorage.setItem("items",JSON.stringify(changedData))
    addFormView.showForm = "hide"
  }

  // state.inventory.push({"name": nameAdd.name, "quantity": quantityAdd.qty})

}

function getTotalItems() {
  let data = JSON.parse(localStorage.getItem("items"))
  let totalItems = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i].aid == aid) {

      for (let j = 0; j < data[i].inventory.length; j++) {
        totalItems += parseInt(data[i].inventory[j].quantity)
      }
    }
  }
  totalItems += parseInt(quantityAdd.qty)
  console.log(totalItems)
  if (totalItems > 20) {
    showAlert.show = true
    setTimeout(() => {
      showAlert.show = false
    }, 4000)
    // alert("Item Not Added. Can't Have More Than 20 Items")
    return false
  }

  return true
}
</script>