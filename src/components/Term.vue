<template>
  <div class="Term">
    <div class="symbol">
      <h3>{{ term.symbol }}</h3>
    </div>
    <div class="coefficient">
      <h3> {{ term.coefficient }}<sup>{{ term.coExponent }}</sup></h3>
    </div>
    <div class="fraction">
      <H4>{{ term.numerator }}<sup>{{ term.numExponent }}</sup></H4>
      <hr>
      <H4>{{ term.denominator }}<sup>{{ term.demExponent }}</sup></H4>
    </div>
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
  display:flex;
}
.coefficient {
  width: 30%;
  display: flex;
}
.symbol {
  width: 30%;
  display: flex;
}
.fraction {
  width: 70%;
  display: initial;
}
</style>
