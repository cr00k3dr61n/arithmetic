<template>
  <div>
    <form
      class="login"
      @submit.prevent="login">
      <h1>Sign in</h1>
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
        email: '',
        password: ''
      }

    },
    methods: {
      login () {

        const creds = (this.email, this.password)

        this.$store.dispatch('login', creds).
       then(() => this.$router.push('/')).
       catch((err) => console.log(err))

      }
    }
  }
</script>
