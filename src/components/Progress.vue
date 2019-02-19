<template>
  <svg
    width="200"
    height="200">
    <polygraph :stats="stats"/>
  </svg>
  <!-- controls -->
  <div
    v-for="stat in stats"
    :key>
    <label>{{ stat.label }}</label>
    <input
      v-model="stat.value"
      type="range"
      min="0"
      max="100">
    <span>{{ stat.value }}</span>
    <button
      class="remove
      @click="
      remove(stat)"
      ">X</button>
  </div>
  <form id="add">
    <input
      name="newlabel"
      v-model="newLabel">
    <button @click="add">Add a Stat</button>
  </form>
  <pre id="raw">{{ stats }}</pre>

  <p style="font-size:12px">* input[type="range"] requires IE10 or above.</p>
</template>

<script>
import Polygraph from './Polygraph.vue'
// The raw data to observe
const stats = [
  {
 label: 'A',
value: 100
},
  {
 label: 'B',
value: 100
},
  {
 label: 'C',
value: 100
},
  {
 label: 'D',
value: 100
},
  {
 label: 'E',
value: 100
},
  {
 label: 'F',
value: 100
}
]

export default {
  name: 'Progress',
  components: { Polygraph },
  data () {

return {
    newLabel: '',
    stats
  };

},
  computed: {
    // A computed property for the polygon's points
    points () {

      const total = this.stats.length

return this.stats.map((stat, i) => {

        const point = valueToPoint(stat.value, i, total)

return `${point.x},${point.y}`

}).join(' ')

}
  },
  methods: {
    add (e) {

      e.preventDefault()
      if (!this.newLabel) {

return

 }
      this.stats.push({
        label: this.newLabel,
        value: 100
      })
      this.newLabel = ''

},
    remove (stat) {

      if (this.stats.length > 3) {

        this.stats.splice(this.stats.indexOf(stat), 1)

} else {


}

}
  }
}

</script>

<style>

</style>


