<template>
  <v-container>
    <h2>Home Page</h2>
    <ul>
      <li>
        <router-link to="/about">Go to About</router-link>
      </li>
    </ul>
    <div>
      <video-player :options="videoOptions" />
    </div>
  </v-container>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  name: "VideoExample",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: "http://localhost:8082/hls/sample1.mp4/index.m3u8",
            type: "application/x-mpegurl",
          },
        ],
      },
    };
  },
};
</script>
