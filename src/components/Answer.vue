<template>
  <div class="Answer">
    <div class="coefficient">
      <input
        v-model="answer.coefficient"
        type="text"
        class="input"
        @input="listeners">
    </div>
    <div class="fraction">
      <input
        v-model="answer.numerator"
        type="text"
        class="input"
        @input="listeners">
      <hr>
      <input
        v-model="answer.denominator"
        type="text"
        class="input"
        @input="listeners">
    </div>
    <button
      :check-answer="checkAnswer"
      @click="$emit('answer', answer)" >
      <font-awesome-icon
        :icon="['fa', 'check']"
        size="lg"
        style="color:darkslategrey;" /></button>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'Answer',
  components: { FontAwesomeIcon },
  inheritAttrs: true,
  props: {
    answer: {
      type: Object,
      default: null
    },
    // Integer, float, fraction, simplified, percent, factor, primes
    answerFormat: {
      type: String,
      default: 'fraction'
    },
    checkAnswer: {
      type: Function,
      default: null
    }
  },
  computed: {
    icon () {

      return faCheck

  }
  },
  methods: {
    listeners () {

      return {
        // Pass all component listeners directly to input
        ...this.$listeners,
        // Override input listener to work with v-model
        input: (event) => vm.$emit('input', event.target.value)
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Answer {
    width: 45%;
    display: flex;
    flex-wrap: nowrap;
  }
  .input {
    width: 60%;
    border: 1px solid darkslategrey;
  }
  .coefficient {
    width: 50%;
  }
  .fraction {
    width: 50%;
  }
</style>
