<template>
  <div class="number-value">
    <term v-if="term" :term="term[0]" />
      <input type="radio" id="less-than" value="tess-than" v-model="selectedOperator">
      <label for="less-than">&lt;</label>
      <br>
      <input type="radio" id="greater-than" value="greater-than" v-model="selectedOperator">
      <label for="greater-than">&gt;</label>
      <br>
      <input type="radio" id="equal" value="equal" v-model="selectedOperator">
      <label for="equal">=</label>
    <term v-if="term" :term="term[1]" />
  </div>
</template>

<script>
import Term from './Term.vue'
import Operator from './Operator.vue' 

export default {
  name: 'NumberValue',
  components: {
      Term,
      Operator
  },
  data () {
      symbol: ['<', '>', '='],
      term: [
          {
          numerator: this.getRandomNumber(1, 10),
          denominator: this.getRandomNumber(2, 10),
          coefficient: this.getRandomNumber(1, 10),
          coExponent: this.getRandomNumber(1, 3),
//          numExponent: this.getRandomNumber(1, 3),
//          demExponent: this.getRandomNumber(1, 3) 
         },
          {
          numerator: this.getRandomNumber(1, 10),
          denominator: this.getRandomNumber(2, 10),
          coefficient: this.getRandomNumber(1, 10),
          coExponent: this.getRandomNumber(1, 3),
//          numExponent: this.getRandomNumber(1, 3),
//          demExponent: this.getRandomNumber(1, 3) 
          }         
      ]
  }
}
</script>

<style scoped>
.number-value {
  display: flex;
}
</style>
