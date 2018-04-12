<template>
  <div class="Operator">
    <h4>{{ symbol }}</h4>
  </div>
</template>

<script>
export default {
  name: 'Operator',
  props: {
    symbol: {
      type: String,
      default: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Operator {
  width:10%;
  text-align: center;
}
</style>
