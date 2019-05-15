<template>
  <div class="Equation">
    <Term
      v-for="term in terms"
      :term="term"
      :key="term.index"/>
    <h4>=&nbsp;&nbsp;</h4>
    <Answer
      :answer="answer"
      @answer="checkAnswer($answer)"
      @keyup.enter="checkAnswer($answer)" />
  </div>
</template>

<script>
/* eslint-disable */
import Term from './Term.vue'
import Answer from './Answer.vue'
import { mapState } from 'vuex'
import Vue from 'vue'
import store from '../store'

export default {
  name: 'Equation',
  components: { 
    Term,
    Answer
  },
  props: {
    terms: {
      type: Array,
      required: true
    }
  },
  computed: mapState([
    'question',
    'answer',
    'answerFormat',
    'numberTerms',
    'operatorTypes',
    'hasFraction',
    'hasCoefficient',
    'hasCoExponent',
    'attempts',
    'terms'
  ]),
  methods: {
    randomInteger (from, to) {

      const randomNumber = Math.floor(Math.random() * to) + from

    return randomNumber

    },
    checkAnswer () {

      const termNum = parseInt(this.answer.numerator.trim());
      const termDenom = parseInt(this.answer.denominator.trim());
      const termCoeff = parseInt(this.answer.coefficient.trim());
      const ansValue = termCoeff + (Math.round((termNum / termDenom)*100)/100);

    // Increment attempts
      this.attempts += 1 

      console.log('The user\'s answer float is: ' + ansValue)
    // Check answer values
      if (Number.isNaN(ansValue)) {

        const nanWarning = this.flash('Please enter a number.', 'warning', { timeout: 5000 });

        this.answer.numerator = '';
        this.answer.denominator = '';
        this.answer.coefficient = '';
      
      }

      const termVals = [];

      for (let i = 0; i < this.numberTerms; i++) {

        if (this.hasCoefficient && !this.hasFraction && !this.hascoExponent) {

          termVals[i] = this.terms[i].coefficient;
        
        }
        if (this.hasCoefficient && this.hascoExponent && !this.hasFraction) {

          termVals[i] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent);
        
        }
        if (this.hasFraction && this.hasCoefficient && !this.hasCoExponent) {

          termVals[i] = this.terms[i].coefficient + this.terms[i].numerator / this.terms[i].denominator;
        
        }
        if (this.hasFraction && this.coefficient && this.hascoExponent) {

          termVals[i] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent) +
          this.terms[i].numerator / this.terms[i].denominator;
        
        }
      
      }
      console.log(`The term floats are: ${  termVals}`)
      const computedSum = []; // Ordered list of computations

      for (let i = 0; i < this.numberTerms; i++) { // Symbols[0] before terms[0]; computed operations, left to right (no parentheses)

        switch (this.terms[i].symbol) {

          case '+':
            computedSum[i] = termVals[i];
          break;
          case '-':
            computedSum[i] = termVals[i] * -1;
          break;
        
        }
      
      }
      // Can use sum(Array) because indexes represent ordered operations, and duplicated entries are deleted, i.e. = 0
      const solution = Math.round(computedSum.reduce((a, b) => a + b, 0) * 100) / 100;

      console.log(`The computed sum is:${  solution}`)
      if (ansValue === solution) {

        const successMessage = this.flash('Correct!', 'success', { timeout: 7500 });

        this.newQuestion();
        this.answer.numerator = '';
        this.answer.denominator = '';
        this.answer.coefficient = '';
        const question = { terms: this.terms, attempts: this.attempts }
        store.commit('addQuestion', question)
      
      } else {

        const errorMessage = this.flash('Try again!', 'error', { timeout: 5000 });

        this.attempts.append(answer);
      
      }
    
    },
    reduceTerms () {

      for (let i = 0; i < this.numberTerms; i++) {

        if (this.hasCoefficient && !this.hasFraction && !this.hascoExponent) {

          termVals[this.terms[i].index] = this.terms[i].coefficient;
        
        }
        if (this.hasCoefficient && this.hascoExponent && !this.hasFraction) {

          termVals[this.terms[i].index] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent);
        
        }
        if (this.hasFraction && !this.hasCoefficient && !this.hasCoExponent) {

          termVals[this.terms[i].index] = this.terms[i].numerator / this.terms[i].denominator;
        
        }
        if (this.hasFraction && this.coefficient && this.hascoExponent) {

          termVals[this.terms[i].index] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent) +
          this.terms[i].numerator / this.terms[i].denominator;
        
        }
      
      }
    
    },
    // Append sign to term float
   signValue () {

      for (let i = 0; i < this.numberTerms; i++) { // Symbols[0] before terms[0]; computed operations, left to right (no parentheses)

        switch (this.terms[i].symbol) {

          case '+':
            computedSum[this.terms[i].index] = termVals[this.terms[i].index];
          break;
          case '-':
            computedSum[this.terms[i].index] = termVals[this.terms[i].index] * -1;
          break;
          case '×':
            computedSum[this.terms[i].index] = computedSum[this.terms[i].index - 1] * termVals[this.terms[i].index]; // Without parentheses, operations ordered from left to right
            computedSum[this.terms[i].index - 1] = 0; // Clear previous entry because combined
          break
          case '÷':
            computedSum[this.terms[i].index] = computedSum[this.terms[i].index - 1] / termVals[this.terms[i].index];
            computedSum[this.terms[i].index - 1] = 0; // Clear previous entry because combined
          break
        
        }
      
      }
    
    },
    newTerm () {

    // Const below should be passed as data ()
      const term = {}
      const minNum = 1
      const minDenom = 2
      const maxNum = 4
      const maxExp = 3

      if (this.hasFraction) {

        term.numerator = this.randomInteger(minNum, maxNum)
        term.denominator = this.randomInteger(minDenom, maxNum)

      }
      if (this.hasCoefficient) {

        term.coefficient = this.randomInteger(minNum, maxNum)

      }
      if (this.hascoExponent) {

        term.coExponent = this.randomInteger(minNum, maxExp)

      }
      // We want this to be recalculated to random value as well
      term.symbol = this.operatorTypes[this.randomInteger(0, this.operatorTypes.length)]

    return term

    },
    newQuestion () {
      for (var i = 0; i < this.numberTerms; i++) {
        Vue.set(this.terms, i, this.newTerm())
      }
      return this.terms

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Equation {
  display:flex;
  flex-wrap: wrap;
}
</style>
