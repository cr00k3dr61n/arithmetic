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
          <button @click="newQuestion()" >New Question</button>
          <Equation
            :terms="terms" />
          <Answer
            :answer="answer"
            @answer="checkAnswer($answer)"
            @keyup.enter="checkAnswer($answer)" />
          <flash-message
            transition-name="flash"
            class="flashpool"/>
        </div>
        <div class="one column">&nbsp;</div>
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
import store from './store' // Do we still need this import if store is registered on vm instance?

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
      hasCoExponent: false,
      terms: [],
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
    checkAnswer () {

      const termNum = parseInt(this.answer.numerator.trim());
      const termDenom = parseInt(this.answer.denominator.trim());
      const termCoeff = parseInt(this.answer.coefficient.trim());
      const ansValue = termCoeff + (termNum / termDenom);

      console.log("The user's answer float is: " + ansValue)
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
          termVals[i] = this.terms[i].coefficient + (this.terms[i].numerator / this.terms[i].denominator);
        }
        if (this.hasFraction && this.coefficient && this.hascoExponent) {
          termVals[i] = math.pow(this.terms[i].coefficient, this.terms[i].coExponent) +
          this.terms[i].numerator / this.terms[i].denominator;
        }
      }
      console.log('The term floats are: ' + termVals)
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
      const solution = Math.round(computedSum.reduce((a, b) => a + b, 0)*100)/100;
      console.log( 'The computed sum is:' + solution)
      if (ansValue === solution) {
        const successMessage = this.flash('Correct!', 'success', { timeout: 7500 });
        this.newQuestion();
      } else {
        const errorMessage = this.flash('Try again!', 'error', { timeout: 5000 });  
      }
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Bungee+Shade|Montserrat+Alternates|Oxygen');
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
  .flashpool {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  position: fixed;
  top: 20px;
  right: 20px;
  max-height: 400px;
  width: 260px;
  -webkit-perspective: 400px;
          perspective: 400px;
}

.flashpool .flash__message {
  width: 260px;
  -webkit-transition: all 500ms;
  -o-transition: all 500ms;
  transition: all 500ms;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-family: 'Oxygen', sans-serif;
  font-size: 13px;
  line-height: 130%;
}

.flash-enter, .flash-leave-to {
  opacity: 0;
  -webkit-transform: rotateX(-30deg) scale(.88) translateY(-30px);
          transform: rotateX(-30deg) scale(.88) translateY(-30px);
}

.flash-leave-active {
  position: absolute;
}
</style>
