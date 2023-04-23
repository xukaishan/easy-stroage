<script setup>
const prefix = 'demo_' // 前缀命名空间 namespaces 
const persistent = new STROAGE(localStorage, prefix); // localStorage
const session = new STROAGE(sessionStorage, prefix); // sessionStorage

const obj = { name: 'wangyibo', age: 32, children: [{ name: 'zs' }] }
const address = { name: 'wangyibo', age: 32 }

const setPersistent = () => {
    persistent.set('user', obj) // true
    persistent.set('user.address', '成华大道二仙桥') // true
}
const getPersistent = () => {
    persistent.get('user.children') // [{ name: 'zs' }]
    persistent.get('user.tel') // null
}
</script>

<template>
    <div class="item">
        <button @click="setPersistent">set persistent</button>
        <button @click="getPersistent">get persistent</button>
    </div>
</template>

<style scoped>
.item {
    margin: 15px auto;
}
</style>
