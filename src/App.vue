<template>
  <div id="app">
    <div class="container">
      <div class="row nav-bar">
        <div class="two columns">
          <h6>Modules</h6>
        </div>
        <div class="eight columns">
        </div>
        <div class="two columns" style="text-align:right">
          <font-awesome-icon :icon="['fas', 'user']" size="lg"/>
        </div>
      </div>
      <div class="row">
        <div class="two columns"></div>
        <div class="eight columns">
          <h2>Arithmetic</h2>
          <p>Solve the equation below.</p>
          <Equation />
        </div>
        <div class="two columns"></div>
      </div>
    </div>
  </div>
</template>

<style src="./skeleton.css"></style>
<script>
import Equation from './components/Equation'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faUserCircle } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'App',
  computed: {
    icon () {
      return faUserCircle
    }
  },
  components: {
    Equation,
    FontAwesomeIcon
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
  .row {
    display: flex;
  }
    .nav-bar {
    margin-bottom:20px;
  }
  h2,h6 {
    color: darkslateblue;
    font-weight: 900;
  }</style>
