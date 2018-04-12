<template>
  <div id="app">
    <div class="container">
      <div class="row nav-bar">
        <div class="one-third column">
          <h6><font-awesome-icon :icon="['fas', 'bars']" size="lg" style="color:darkslategrey;padding:0 5px"/>Modules</h6>
        </div>
        <div class="one-third column">
        </div>
        <div class="one-third column" style="text-align:right">
          <h6><font-awesome-icon :icon="['fas', 'user']" size="lg" style="color:darkslategrey;padding:0 5px"/>Profile</h6>
        </div>
      </div>
      <div class="row">
        <div class="three columns">&nbsp;</div>
        <div class="nine columns">
          <h2>Arithmetic</h2>
          <p>Solve the equation below.</p>
          <Equation />
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./skeleton.css"></style>
<script>
import Equation from './components/Equation'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faUserCircle, faBars } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'App',
  computed: {
    icon () {
      return (faUserCircle, faBars)
    }
  },
  components: {
    Equation,
    FontAwesomeIcon
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Bungee+Shade|Montserrat+Alternates');
  .row {
    display: flex;
  }
  .nav-bar {
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
</style>
