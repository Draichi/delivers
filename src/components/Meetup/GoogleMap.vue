<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
  export default {
    name: 'google-map',
    props: ['name', 'origem'],
    data: function () {
      return {
        mapName: this.name + '-map'
      }
    },
    mounted: function () {
      var directionsService = new google.maps.DirectionsService()
      var directionsDisplay = new google.maps.DirectionsRenderer()
      const element = document.getElementById(this.mapName)
      const map = new google.maps.Map(element)
      directionsDisplay.setMap(map)
      var request = {
        origin: this.origem,
        destination: '03733020',
        travelMode: 'DRIVING'
      }
      directionsService.route(request, function(result, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(result)
        } else {
          console.log(status)
        }
      })
    }
  }
</script>

<style scoped>
  .google-map {
    width: 100vw;
    height: 300px;
    margin: 0 auto;
    background: gray;
  }
</style>