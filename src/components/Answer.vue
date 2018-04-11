<template>
<div class="Answer">
  <input type="text" class="input" :value="value" v-on="listeners">
  <button @click="$emit('checkAnswer',equation.answer)">Check Answer</button>
</div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners () {
      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: event => this.$emit('input', event.target.value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Answer {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
  }
  .input {
    width:100%;
    border: 1px solid darkslategrey;
  }
</style>
