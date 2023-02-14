<script setup>
const props = defineProps(['items'])

console.log(props.items)
const emit = defineEmits('approve')

function approveList() {
    emit('approve')
}
function cancelList() {
    emit('cancel')
}

</script>

<template >
    <div class="m-4 font-bold text-4xl">Preview Screen</div>
    <button v-on:click="approveList" class=" m-4 btn btn-primary">Approve List</button>
    <button @click="cancelList" class="btn m-4 btn-warning">Cancel</button>
    <div class="overflow-x-auto">
        <table class="table w-full">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th>Quantity</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items">
                    
                    <th>{{ index + 1 }}</th>
                    <th>{{ item.quantity }}</th>
                    <td>{{ item.name }}</td>
                </tr>

            </tbody>
        </table>
    </div>
    <!-- <div>Preview Screen</div>
    <button v-on:click="approveList" class=" m-4 btn btn-primary">Approve List</button>
    <button @click="cancelList" class="btn m-4 btn-warning">Cancel</button>
    <li v-for="item in items" :key="item.qty">
        {{ item.quantity }} {{ item.name }}
    </li> -->
</template>