<template>
  <div class="Term" v-bind:id="term.id">
    <H4>{{ term.numerator }}</H4>
    <hr>
    <H4>{{ term.denominator }}</H4>
  </div>
</template>

<script>
export default {
  name: 'Term',
  props: {
    term: {
      type: Object,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Term {
  width:25%;
  text-align: center;
}
</style>
