<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <div>
        <input
          id="name"
          v-model="name"
          type="text"
          required
          autofocus>
      </div>

      <label for="email" >E-Mail Address</label>
      <div>
        <input
          id="email"
          v-model="email"
          type="email"
          required>
      </div>

      <label for="password">Password</label>
      <div>
        <input
          id="password"
          v-model="password"
          type="password"
          required>
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input
          id="password-confirm"
          v-model="password_confirmation"
          type="password"
          required>
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data () {

      return {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        isAdmin: null
      }

},
    methods: {
      register () {

        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
          isAdmin: this.is_admin
        }

        this.$store.dispatch('register', data).
        then(() => this.$router.push('/')).
        catch((err) => console.log(err))

      }
    }
  }
</script>
