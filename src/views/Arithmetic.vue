<template>
  <div>
    <h2>Arithmetic</h2>
    <p>Solve the equation below.</p>
    <button @click="newQuestion()" >New Question</button>
    <Equation
      :terms="terms" />
    <flash-message
      transition-name="flash"
      class="flashpool"/>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import Equation from './../components/Equation'
import { mapState } from 'vuex'

export default {
  components: {
    Equation
  },
  computed: mapState([
    'answer',
    'answerFormat',
    'numberTerms',
    'operatorTypes',
    'hasFraction',
    'hasCoefficient',
    'hasCoExponent',
    'terms',
    'attempts'
  ]),
  created () {

    for (let index = 0; index < this.numberTerms; index += 1) {

      this.terms[index] = this.newTerm()

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
        Vue.set(this.terms, i, this.newTerm())
      }
      return this.terms

    }
    
  }
}
</script>
<style>
</style>
