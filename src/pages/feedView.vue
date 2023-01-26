<template>
  <div class="max-w-[100%] max-h-[100vh] lg:max-w-[100vw]">
    <!-- top -->
    <div
      class="flex flex-col lg:flex-row items-center lg:gap-[20rem] max-w-[100vw] h-[180px] lg:h-[100px] mt-4 lg:mt-[0] lg:mb-0 border-b-[1px] border-[#9a9b9b]"
    >
      <div>
        <div class="text-[2.3rem] font-[600]">Dashboard</div>
      </div>

      <div
        class="flex flex-col lg:flex-row items-center justify-between w-[60%] h-[100px] mt-4 lg:mt-[0] lg:mb-0"
      >
        <div class="flex items-center gap-[1rem] mb-3 lg:mb-0 justify-between">
          <div>Feed</div>
          <div>Edit</div>
        </div>

        <div class="relative flex items-center justify-center mb-5 lg:mb-0">
          <svg-icon
            type="mdi"
            :path="search"
            class="text-[#4c9a6e] absolute top-3 left-3"
          ></svg-icon>
          <input
            type="text"
            v-model="searchTerm"
            class="bg-[#202322] h-12 pl-10 rounded-3xl text-white"
            placeholder="Search"
            @input="searchImages"
          />
        </div>
      </div>
    </div>

    <!-- gallery -->
    <div class="max-h-[80vh] overflow-y-auto mt-4">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="relative photo-grid__item"
          :style="{ 'grid-row-end': 'span ' + rowSpan(index) }"
        >
          <div
            class="rounded-md absolute top-2 right-2 bg-gray-400 py-[0.5rem] px-[1rem] text-xs"
          >
            {{ image?.sponsorship?.sponsor?.name }}
          </div>
          <img
            :src="image.urls.regular"
            :alt="image.description"
            class="object-cover w-full h-full"
          />

          <div
            class="bg-[#4f504b] opacity-80 absolute bottom-0 py-3 left-0 flex justify-between items-center w-full px-3"
          >
            <div class="flex gap-5">
              <div class="color-[green] border-[1px] border-[#4c9a6e]"></div>

              <div class="flex flex-col items-start gap-1">
                <p class="font-[800] text-sm">In the Home #{{ image.likes }}</p>
                <div class="flex justify-between items-center gap-3">
                  <div class="">
                    <img
                      :src="image.user.profile_image.small"
                      :alt="image.user.name"
                      class="object-cover w-[15px] h-[15px] rounded-full"
                    />
                  </div>
                  <div class="text-sm">{{ image.user.name }}</div>
                </div>
              </div>
            </div>
            <div>
              <svg-icon
                type="mdi"
                :path="arrowDown"
                class="text-[#4c9a6e]"
              ></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiTrayArrowDown, mdiMagnify } from "@mdi/js";

export default {
  name: "my-component",
  components: {
    SvgIcon,
  },
  data() {
    return {
      arrowDown: mdiTrayArrowDown,
      search: mdiMagnify,
      images: [],
      searchTerm: "",
      page: 1,
    };
  },
  created() {
    axios
      .get("https://api.unsplash.com/photos", {
        params: {
          client_id: "zXXrlORYdpBagUYyBKQVes8yLrbssQlqjoygK3BzLOs",
          per_page: 30,
          page: this.page,
        },
      })
      .then((response) => {
        this.images = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    searchImages() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.searchTerm.trim() === "") {
          this.created();
        } else {
          axios
            .get("https://api.unsplash.com/search/photos", {
              params: {
                query: this.searchTerm,
                client_id: "zXXrlORYdpBagUYyBKQVes8yLrbssQlqjoygK3BzLOs",
                per_page: 30,
                page: this.page,
              },
            })
            .then((response) => {
              this.images = response.data.results;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, 500);
    },

    rowSpan(index) {
      if (index % 2 === 0) {
        return 1;
      }
      return 2;
    },
  },
};
</script>

<style>
.grid {
  width: 100%;
}

.photo-grid__item {
  overflow: hidden;
}
</style>
