/* eslint-disable */
<template>
  <div class="polygraph">
    <!-- template for the axis label component. -->
    <script type="text/x-template" 
id="axis-label-template">
      <text :x="point.x" :y="point.y">{{ stat.label }}</text>
    </script>
    <!-- template for the polygraph component. -->
    <script type="text/x-template" 
id="polygraph-template">
      <g>
      <polygon :points="points"></polygon>
      <circle cx="100" cy="100" r="80"></circle>
      <axis-label
      v-for="(stat, index) in stats"
      :stat="stat"
      :index="index"
      :total="stats.length">
      </axis-label>
      </g>
    </script>
  </div>
</template>

<script>
  export default {
    name: 'Polygraph', 
    components: {
      // a sub component for the labels
      'axis-label': {
        props: {
          stat: Object,
          index: Number,
          total: Number
        },
        template: '#axis-label-template',
        computed: {
          point: function () {
            return valueToPoint(
              +this.stat.value + 10,
              this.index,
              this.total
            )
          }
        }
      }
    },
    props: ['stats'],
    template: '#polygraph-template',
  }
  // Math helper...
  function valueToPoint (value, index, total) {

    let x = 0
    let y = -value * 0.8
    let angle = Math.PI * 2 / total * index
    let cos = Math.cos(angle)
    let sin = Math.sin(angle)
    let tx = x * cos - y * sin + 100
    let ty = x * sin + y * cos + 100

    
return {
      x: tx,
      y: ty
    }
  
}
</script>

<style scoped>
  body {
      font-family: Helvetica Neue, Arial, sans-serif;
  }

  polygon {
      fill: #42b983;
      opacity: .75;
  }

  circle {
      fill: transparent;
      stroke: #999;
  }

  text {
      font-family: Helvetica Neue, Arial, sans-serif;
      font-size: 10px;
      fill: #666;
  }

  label {
      display: inline-block;
      margin-left: 10px;
      width: 20px;
  }

  #raw {
      position: absolute;
      top: 0;
      left: 300px;
  }
</style>
