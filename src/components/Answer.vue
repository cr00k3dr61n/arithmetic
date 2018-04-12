<template>
<div class="Answer">
  <input type="text" class="input" v-model="answer.numerator">
  <hr>
  <input type="text" class="input" v-model="answer.denominator">
  <button v-on="listeners"><font-awesome-icon :icon="['fa', 'check']" size="lg" style="color:darkslategrey;padding:0 5px" /></button>
</div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'Answer',
  props: {
    answer: {
      type: Object
    }
  },
  computed: {
    icon () {
      return faCheck
    },
    listeners () {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event.target.value)
      }
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Answer {
    width: 30%;
  }
  .input {
    width:45px;
    border: 1px solid darkslategrey;
  }
</style>
