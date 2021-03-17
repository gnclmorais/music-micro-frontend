<template>
  <div class="flex-grow px-6 py-5">
    <h1 class="mb-4">Signin</h1>

    <form id="auth-form" action="#" method="POST" @submit.prevent="submit">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="username" class="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input type="text" name="username" id="username" class="mt-1 flex rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-500" v-model="username" required>
            </div>

            <div class="col-span-3 sm:col-span-2">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input type="password" name="password" id="password" class="mt-1 flex rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-500" v-model="password" required>
            </div>

            <div class="col-span-3 sm:col-span-2">
              <input type="submit" value="Submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    formData() {
      return { username: this.username, password: this.password }
    }
  },
  methods: {
    submit() {
      fetch('https://buildingmfe.maxgallo.io/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.formData),
      })
      .then(response => {
        // Success
        if (response.ok) return response.json()

        // Error
        return response.json().then(({ data: { message }}) => {
          throw new Error(message)
        })
      })
      .then(({ data: { token } }) => {
        // Store the signin token we received
        window.router.token = token

        // Proceeed
        window.bootstrap.router.navigateTo('/play')
      })
      .catch(alert) // Error
    }
  }
}
</script>
