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
import * as firebase from 'firebase'

export default {
  data () {
    return {
      video: {},
      canvas: {},
      captures: [],
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
        firebase.storage().ref().child(`images/picture-${new Date().getTime()}`).put(blob).then(res => {
          console.log(res)
        })
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
