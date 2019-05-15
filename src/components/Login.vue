<template>
  <div>
    <form
      class="login"
      @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Username</label>
      <input
        v-model="username"
        required
        type="username"
        placeholder="Username">
      <label>Email</label>
      <input
        v-model="email"
        required
        type="email"
        placeholder="Email">
      <label>Password</label>
      <input
        v-model="password"
        required
        type="password"
        placeholder="Password">
      <hr>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
  export default {
    data () {

      return {
        username: '',
        email: '',
        password: ''
      }

    },
    methods: {
      login () {

        const creds = (this.username, this.password)

        this.$store.dispatch('login', creds).
       then(() => this.$router.push('/')).
       catch((err) => console.log(err))

      }
    }
  }
</script>
