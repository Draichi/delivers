<template>
  <div class="camera-modal">
    <video
      ref="video"
      id="video"
      class="camera-stream"
      autoplay
    ></video>
    <v-flex xs12 sm6>
      <div class="text-xs-center">
        <div>
          <v-btn
            color="green"
            fab
            large
            dark
            bottom
            fixed
            @click="capture"
          >
            <v-icon>camera</v-icon>
          </v-btn>
        </div>
      </div>
    </v-flex>
  </div>
</template>

<script>
export default {
  data () {
    return {
      video: {},
      mediaSream: null
    }
  },
  mounted () {
    navigator.mediaDevices.getUserMedia({video: true})
      .then(mediaSream => {
        this.$refs.video.srcObject = mediaSream
        this.mediaSream = mediaSream
        this.$refs.video.play()
      })
      .catch(err => console.error('getusermedia() error:', err))
  },
  destroyed () {
    const tracks = this.mediaSream.getTracks()
    tracks.map(track => track.stop())
  },
  methods: {
    capture () {
      const mediaSreamTrack = this.mediaSream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaSreamTrack)
      return imageCapture.takePhoto().then(blob => {
        this.$store.foto = blob
        console.log(this.$store.foto)
        this.$router.go(-1)
      })
    }
  }
}
</script>


<style scoped>
  .camera-stream {
    width: 100%;
  }
</style>
