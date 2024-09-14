<template>
    <div>hello world</div>
</template>
<script setup lang="ts">
const { createToken } = await GqlGetToken({
    username: "alice",
    password: "123456"
})
useGqlHeaders({ 'authorization': 'Bearer ' + createToken })

try {
    const { getUser } = await GqlGetUsers({
        id: 1
    })
    console.log(getUser)
} catch (error) {
    console.log(error)
}
</script>