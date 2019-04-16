<template>
  <div>
    <h2>Arithmetic</h2>
    <p>Solve the equation below.</p>
    <button @click="arithmetic.newQuestion()" >New Question</button>
    <Equation
      :terms="terms" />
    <Answer
      :answer="answer"
      @answer="arithmetic.checkAnswer($answer)"
      @keyup.enter="arithmetic.checkAnswer($answer)" />
    <flash-message
      transition-name="flash"
      class="flashpool"/>
  </div>
</template>
<script>
import Answer from './../components/Answer.vue'
import Equation from './../components/Equation.vue'
import * as arithmetic from './../assets/js/arithmetic.js'

export default {
  components: {
    Equation,
    Answer
  },
  data () {

    return {
      answer: {
        coefficient: '',
        numerator: '',
        denominator: ''
      },
// Integer, float, fraction, simplified, percent, factor, primes
      answerFormat: 'fraction',
      numberTerms: 2,
      operatorTypes: [
'-',
'+'
],
    // Number of operators should match number of terms, first operator must be either '+' or '-'
      hasFraction: true,
      hasCoefficient: true,
      hasCoExponent: false,
      terms: [],
      attempts: []
    }

},
  computed () {

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < this.numberTerms; index++) {

      this.terms[index] = this.newTerm()

}

},
  methods: {}
}
</script>
