<template>
  <svg
    width="200"
    height="200">
    <polygraph :points="points"/>
  </svg>
</template>

<script>
import Polygraph from './Polygraph.vue'
// The raw data to observe
const points = [
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
  name: 'Perimeter',
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
  }
}
</script>

<style scoped>

</style>
