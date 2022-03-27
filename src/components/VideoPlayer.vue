<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js vjs-theme-city vjs-fluid"
      @timeupdate="onPlayerTimeupdate($event)"
      @ready="playerReadied"
    ></video>
  </div>
</template>

<script>
import store from "@/store";
import Vue from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// City
import "@videojs/themes/dist/city/index.css";

// Fantasy
import "@videojs/themes/dist/fantasy/index.css";

// Forest
import "@videojs/themes/dist/forest/index.css";

// Sea
import "@videojs/themes/dist/sea/index.css";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    async onPlayerTimeupdate(player) {
      console.log(player.currentTime());
      let formData = new FormData();
      formData.append("username", store.state.username);
      formData.append("timestamp", player.currentTime());

      store.commit("setTimestamp", player.currentTime());
      await Vue.axios.post("/api/update", formData);
    },
    playerReadied(player) {
      // seek to 10s
      console.log("example player 1 readied", player);
      player.currentTime(store.state.timestamp);
      // console.log('example 01: the player is readied', player)
    },
  },
};
</script>
