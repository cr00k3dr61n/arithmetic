<template>
  <div id="app">
    <div class="container">
      <div class="nav-bar">
        <div class="one-third column">
          <a><h6><font-awesome-icon
            :icon="['fas', 'bars']"
            size="lg"
            style="color:darkslategrey;padding:0 5px"/>
            <router-link to="/">Modules</router-link>
          </h6></a>
        </div>
        <div
          class="two-thirds column"
          style="text-align:right">
          <font-awesome-icon
            :icon="['fas', 'user']"
            size="lg"
            style="color:darkslategrey;padding:0 5px"/>
          <span v-if="isLoggedIn">
            <router-link to="/learner">Profile</router-link>
            <a @click="logout">Logout</a>
          </span>
          <span v-else>
            <h6>
              <router-link to="login">Login</router-link>
              <router-link to="register">Sign-Up</router-link>
            </h6>
          </span>
        </div>
      </div>
      <div class="row">
        <div class="one column">
          <flash-message
            transition-name="flash"
            class="flashpool"/>
        </div>
        <div class="ten columns">
          <router-view/>
        </div>
        <div class="one column">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<style src="./skeleton.css"></style>
<script>
/* eslint-disable */
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faUserCircle, faBars } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'App',
  components: {
    FontAwesomeIcon
  },
  /*created () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      })
    }
  },*/
  computed: {
    icon () {

      // Fontawesome allows returning different icons
      // eslint-disable-next-line no-sequences
      return faUserCircle, faBars

    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {}
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Bungee+Shade|Montserrat+Alternates|Oxygen');
  .row {
    display: flex;
    flex-wrap: nowrap;
  }
  .nav-bar {
    display: flex;
    margin-bottom:0px;
  }
  h2 {
    color: darkslategray;
    font-family: "Bungee Shade", sans-serif;
    font-weight: 900;
  }
  h6 {
    color: darkslategray;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 900;
  }
  .flashpool {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  position: fixed;
  top: 20px;
  right: 20px;
  max-height: 400px;
  width: 260px;
  -webkit-perspective: 400px;
          perspective: 400px;
}

.flashpool .flash__message {
  width: 260px;
  -webkit-transition: all 500ms;
  -o-transition: all 500ms;
  transition: all 500ms;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Oxygen', sans-serif;
  font-size: 13px;
  line-height: 130%;
}

.flash-enter, .flash-leave-to {
  opacity: 0;
  -webkit-transform: rotateX(-30deg) scale(.88) translateY(-30px);
          transform: rotateX(-30deg) scale(.88) translateY(-30px);
}

.flash-leave-active {
  position: absolute;
}
</style>
