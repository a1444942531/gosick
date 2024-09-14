<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="text-center text-3xl font-bold text-gray-900">登录</h2>
            </div>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-6">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">用户名</label>
                    <input id="email" v-model="username"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="your-email@example.com">
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">密码</label>
                    <input type="password" id="password" v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password">
                </div>
                <div class="flex items-center justify-end">
                    <button type="button" @click="login"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        登录
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">

const username = ref("")
const password = ref("")

async function login() {
    await GqlCreateToken({
        tokenCreateDto: {
            username: username.value,
            password: password.value
        }
    })
}
</script>