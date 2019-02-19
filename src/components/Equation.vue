<template>
  <div class="Equation">
    <Term
      v-for="term in terms"
      :term="term"
      :key="term.index"/>
    <h4>=</h4>
  </div>
</template>

<script>
import Term from './Term.vue'
import Operator from './Operator.vue'

export default {
  name: 'Equation',
  components: {
    Term,
    Operator
  },
  props: {
    terms: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Equation {
  display:flex;
  flex-wrap: nowrap;
}
</style>
