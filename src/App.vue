<template>
  <div id="app">
    <div class="container">
      <div class="nav-bar">
        <div class="one-third column">
          <h6><font-awesome-icon
            :icon="['fas', 'bars']"
            size="lg"
            style="color:darkslategrey;padding:0 5px"/>Modules</h6>
        </div>
        <div class="one-third column"/>
        <div
          class="one-third column"
          style="text-align:right">
          <h6><font-awesome-icon
            :icon="['fas', 'user']"
            size="lg"
            style="color:darkslategrey;padding:0 5px"/>Profile</h6>
        </div>
      </div>
      <div class="row">
        <div class="one column">&nbsp;</div>
        <div class="ten columns">
          <h2>Arithmetic</h2>
          <p>Solve the equation below.</p>
          <button @click="newQuestion" >New Question</button>
          <Equation
            :terms="terms" />
          <Answer
            :answer="answer"
            @answer="checkAnswer($answer)"
            @keyup.enter="checkAnswer($answer)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./skeleton.css"></style>
<script>
/* eslint-disable */
import Answer from './components/Answer'
import Equation from './components/Equation'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faUserCircle, faBars } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'App',
  components: {
    Equation,
    Answer,
    FontAwesomeIcon
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
      operatorTypes: ['-', '+'],
// Number of operators should match number of terms, first operator must be either '+' or '-'
      hasFraction: true,
      hasCoefficient: true,
      hasCoExponent: true,
      terms: []
    }
  },
  computed: {
    icon () {

      // Fontawesome allows returning different icons
      // eslint-disable-next-line no-sequences
      return faUserCircle, faBars

    }
  },
  created() {
      for (var i = 0; i < this.numberTerms; i++) {
        this.terms[i] = this.newTerm()
      }
      return this.terms
  },
  methods: {
    randomInteger (from, to) {

      const randomNumber = Math.floor(Math.random() * to) + from

    return randomNumber

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
        this.terms[i] = this.newTerm()
      }
      return this.terms
  
    },
    checkAnswer ($answer) {

      switch (this.answerFormat) { // Integer, float, fraction, simplified, percent, factor, primes

      case 'integer':
        break;
      case 'float':
        break;
      case 'fraction':
        const trimmedNumerator = parseFloat(this.answer.numerator.trim());
        const trimmedDenominator = parseFloat(this.answer.denominator.trim());
        const trimmedCoefficient = parseFloat(this.answer.coefficient.trim());
        var trimmedAnswer = null;
        var termFloats = [];

        if (Number.isNaN(trimmedCoefficient)) {
          trimmedAnswer = trimmedNumerator / trimmedDenominator;        
        } else {
          trimmedAnswer = trimmedCoefficient + trimmedNumerator / trimmedDenominator;
        }
        if (Number.isNaN(trimmedAnswer)) {

          alert('Please enter a number.');
          this.answer.numerator = '';
          this.answer.denominator = '';
          this.answer.coefficient = '';
        
        } else { // Sum individual terms
            for (let i = 0; i < this.numberTerms; i++) {
              if (this.hasCoefficient && !this.hasFraction && !this.hascoExponent) {
              termFloats[this.terms[i].index] = this.terms[i].coefficient;          
              }
              if (this.hasCoefficient && this.hascoExponent && !this.hasFraction) {
                termFloats[this.terms[i].index] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent);          
              }
              if (this.hasFraction && !this.hasCoefficient && !this.hasCoExponent) {

                termFloats[this.terms[i].index] = this.terms[i].numerator / this.terms[i].denominator;
              }
              if (this.hasFraction && this.coefficient && this.hascoExponent) {
                termFloats[this.terms[i].index] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent) +
                this.terms[i].numerator / this.terms[i].denominator;                
              }     
            }         
        }
      const computedSum = []; // Ordered list of computations; mathematical operations

      for (let i = 0; i < this.numberTerms; i++) { // Symbols[0] before terms[0]; computed operations, left to right (no parentheses)

        switch (this.terms[i].symbol) {
          case '+':
            computedSum[this.terms[i].index] = termFloats[this.terms[i].index];
          break;
          case '-':
            computedSum[this.terms[i].index] = termFloats[this.terms[i].index] * -1;
          break;
          case '×':
            computedSum[this.terms[i].index] = computedSum[this.terms[i].index - 1] * termFloats[this.terms[i].index]; // Without parentheses, operations ordered from left to right
            computedSum[this.terms[i].index - 1] = 0; // Clear previous entry because combined
          break
          case '÷':
           computedSum[this.terms[i].index] = computedSum[this.terms[i].index - 1] / termFloats[this.terms[i].index];
           computedSum[this.terms[i].index - 1] = 0; // Clear previous entry because combined
          break    
        }        
      }
      // Can use sum(Array) because indexes represent ordered operations, and duplicated entries are deleted, i.e. = 0
      const solution = computedSum.reduce((a, b) => a + b, 0);
        if (trimmedAnswer === computedSum) {
          alert('Correct!');
          this.newQuestion();
        } else {
          alert('Try again!');  
        }
      this.answer.numerator = '';
      this.answer.denominator = '';
      this.answer.coefficient = '';
      break;
      case 'simplified':
      break;
      case 'percent':
      break;
      case 'factor':
      break;
      case 'primes':
      break;    
    } 
  }
}
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Bungee+Shade|Montserrat+Alternates');
  .row {
    display: flex;
    flex-wrap: nowrap;
  }
  .nav-bar {
    display: flex;
    margin-bottom:0px;
  }
  h2 {
    color: darkslategray;
    font-family: "Bungee Shade", sans-serif;
    font-weight: 900;
  }
  h6 {
    color: darkslategray;
    font-family: "Montserrat Alternates", sans-serif;
    font-weight: 900;
  }
</style>
