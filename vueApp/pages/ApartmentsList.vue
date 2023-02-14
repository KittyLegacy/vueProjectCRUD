<script setup>
import apartments from '../apartments'
import {onMounted} from 'vue'

    onMounted(()=>{
        console.log("check")

        let data = JSON.parse(localStorage.getItem("items"))
        if (data == undefined) {
            localStorage.setItem("items", JSON.stringify(apartments))
        }
    })

</script>

<template>
    <div class=" m-4 flex justify-between flex-wrap">

        <div v-for="(item, index) in apartments" class="card w-100 glass m-4 p-4">
            <figure><img :src="item.image" style="width:300px; height:200px" alt="apartment" /></figure>
            <div class="card-body">
                <h2 class="card-title">{{ item.address }}</h2>
                <p>{{ item.floor }}</p>
                <p>{{ item.door }}</p>
                <div class="card-actions justify-end">
                    <NuxtLink :to="'/apartments/' + item.aid" class="btn btn-success">Check Inventory</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
