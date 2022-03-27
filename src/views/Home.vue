<template>
  <v-container>
    <h2>Home Page</h2>
    <ul>
      <li>
        <router-link to="/about">Go to About</router-link>
      </li>
    </ul>
    <video-player
      data-setup="{'controls':true}"
      class="vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied"
    >
    </video-player>
  </v-container>
</template>

<script>
import Vue from "vue";
import VueVideoPlayer from "vue-video-player-videojs-7";
import store from "@/store";

// require videojs style
import "video.js/dist/video-js.css";
// import 'vue-video-player/src/custom-theme.css'

Vue.use(
  VueVideoPlayer /* {
  options: global default options,
  events: global videojs events
} */
);
export default {
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "application/x-mpegurl",
            src: "http://157.245.155.41:8082/hls/sample1.mp4/index.m3u8",
          },
        ],
        poster: "/static/images/author.jpg",
      },
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },
    async onPlayerTimeupdate(player) {
      console.log(player.currentTime());
      let formData = new FormData();
      formData.append("username", store.state.username);
      formData.append("timestamp", player.currentTime());

      store.commit("setTimestamp", player.currentTime());
      await Vue.axios.post("/api/update", formData);
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log("example player 1 readied", player);
      player.currentTime(store.state.timestamp);
      // console.log('example 01: the player is readied', player)
    },
  },
};
</script>
