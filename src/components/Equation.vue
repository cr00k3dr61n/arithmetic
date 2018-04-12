<template>
  <div class="Equation">
      <Term v-if="term" :term="term[0]"/>
      <Operator symbol="+" />
      <Term v-if="term" :term="term[1]" />
      <Operator symbol="="/>
      <Answer :answer="answer" @keydown.enter="checkAnswer" v-on:click="checkAnswer" />
  </div>
</template>

<script>
import Term from './Term.vue'
import Operator from './Operator.vue'
import Answer from './Answer.vue'

let nextTermId = 0

export default {
  components: {
    Term,
    Operator,
    Answer
  },
  data () {
    return {
      answer: {
        numerator: '',
        denominator: ''
      },
      term: [
        {
          termid: nextTermId++,
          numerator: this.getRandomNumber(),
          denominator: this.getRandomNumber()
        },
        {
          termid: nextTermId++,
          numerator: this.getRandomNumber(),
          denominator: this.getRandomNumber()
        }
      ]
    }
  },
  methods: {
    getRandomNumber () {
      var randomNumberBetween1and10 = Math.floor(Math.random() * 10) + 1
      return randomNumberBetween1and10
    },
    getNewTerm () {
      this.term.numerator = this.getRandomNumber()
      this.term.denominator = this.getRandomNumber()
    },
  checkAnswer () {
      const trimmedAnswerNumerator = parseFloat(this.answer.numerator.trim())
      const trimmedAnswerDenominator = parseFloat(this.answer.denominator.trim())
      const trimmedAnswer = trimmedAnswerNumerator / trimmedAnswerDenominator
      if (Number.isNaN(trimmedAnswer)) {
        alert('Please enter a number.')
        }
      else {
        const termFloat1 = this.term[0].numerator / this.term[0].denominator
        const termFloat2 = this.term[1].numerator / this.term[1].denominator
        if (trimmedAnswer === (termFloat1 + termFloat2)) {
          alert('Correct!')
          }
        else {
          alert('Try again!')
          }
        this.answer.numerator = ''
        this.answer.denominator = ''
        this.term[0].numerator = this.getRandomNumber()
        this.term[0].denominator = this.getRandomNumber()
        this.term[1].numerator = this.getRandomNumber()
        this.term[1].denominator = this.getRandomNumber()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Equation {
  display:flex;
  flex-wrap: wrap
}
</style>
