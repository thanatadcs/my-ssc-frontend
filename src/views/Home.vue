<template>
  <v-container>
    <h2>Home Page</h2>
    <ul>
      <li>
        <router-link to="/about">Go to About</router-link>
      </li>
    </ul>
    <div class="player">
      <video-player
        class="vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @ready="playerReadied"
        @statechanged="playerStateChanged($event)"
      >
        >
      </video-player>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import VueVideoPlayer from "vue-video-player";
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
      // videojs options
      playerOptions: {
        start: 5,
        height: "360",
        autoplay: true,
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: "http://localhost:8082/hls/sample1.mp4/index.m3u8",
          },
        ],
      },
    };
  },

  name: "Home",

  components: {},

  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      console.log("player ended!", player);
    },
    onPlayerLoadeddata(player) {
      console.log("player Loadeddata!", player);
    },
    onPlayerWaiting(player) {
      console.log("player Waiting!", player);
    },
    onPlayerPlaying(player) {
      console.log("player Playing!", player);
    },
    async onPlayerTimeupdate(player) {
      console.log(player.currentTime());
      let formData = new FormData();
      formData.append("username", store.state.username);
      formData.append("timestamp", player.currentTime());

      store.commit("setTimestamp", player.currentTime());
      await Vue.axios.post("/api/update", formData);
    },
    onPlayerCanplay(player) {
      console.log("player Canplay!", player);
    },
    onPlayerCanplaythrough(player) {
      console.log("player Canplaythrough!", player);
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
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
