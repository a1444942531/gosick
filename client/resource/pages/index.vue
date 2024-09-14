<template>
    <div>hello world</div>
</template>
<script setup lang="ts">
// const { createToken } = await GqlCreateToken({
//     username: "alice",
//     password: "123456"
// })
useGqlHeaders({ 'authorization': 'Bearer ' + "Hello WOrld" })
</script>