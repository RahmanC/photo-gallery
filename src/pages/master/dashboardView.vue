<template>
  <div class="max-w-screen h-screen flex flex-1 text-[#e9e9e9] bg-[#171918]">
    <!-- sidebar -->
    <div class="w-[20%] h-full border-r-[1px] border-[#9a9b9b] px-[2.5rem]">
      <div
        class="h-[100px] border-b-[1px] border-[#9a9b9b] pt-[1.5rem] pb-[1.5rem] flex items-center justify-between"
      >
        <div>STGallery</div>
        <svg-icon type="mdi" :path="path" class="text-[#12542c]"></svg-icon>
      </div>

      <div
        class="border-b-[1px] border-[#9a9b9b] pt-[1.5rem] pb-[1.5rem] flex flex-col"
      >
        <div class="flex items-center justify-around mb-[1rem]">
          <svg-icon type="mdi" :path="dashboard" class="text-[#fff]"></svg-icon>
          <div>Dashboard</div>
          <svg-icon type="mdi" :path="up" class="text-[#12542c]"></svg-icon>
        </div>

        <!-- sub menu -->
        <div
          class="flex items-center justify-start ml-[40%] mb-[0.6rem] text-sm"
        >
          <svg-icon
            type="mdi"
            :path="feed"
            class="text-[#fff] text-xs mr-5"
          ></svg-icon>
          <div>Feed</div>
        </div>

        <div
          class="flex items-center justify-start ml-[40%] mb-[0.6rem] text-sm"
        >
          <svg-icon
            type="mdi"
            :path="edit"
            class="text-[#fff] text-xs mr-5"
          ></svg-icon>
          <div>Edit</div>
        </div>

        <div
          class="flex items-center justify-start ml-[40%] mb-[0.6rem] text-sm"
        >
          <svg-icon
            type="mdi"
            :path="search"
            class="text-[#fff] text-xs mr-5"
          ></svg-icon>
          <div>Search</div>
        </div>
      </div>

      <div class="flex items-center justify-around mb-[1rem] mt-[1.5rem]">
        <svg-icon type="mdi" :path="dashboard" class="text-[#fff]"></svg-icon>
        <div class="text-start mr-[20px]">Explore</div>
        <div></div>
      </div>

      <div class="flex items-center justify-around mb-[1rem] mt-[1.5rem]">
        <svg-icon type="mdi" :path="dashboard" class="text-[#fff]"></svg-icon>
        <div>Bookmark</div>
        <div></div>
      </div>

      <div class="flex items-center justify-around mb-[1rem] mt-[1.5rem]">
        <svg-icon type="mdi" :path="dashboard" class="text-[#fff]"></svg-icon>
        <div>Downloads</div>
        <div></div>
      </div>

      <div class="flex items-center justify-around mb-[1rem] mt-[1.5rem]">
        <svg-icon type="mdi" :path="dashboard" class="text-[#fff]"></svg-icon>
        <div>Notification</div>
        <div></div>
      </div>
      <!-- <div class="h-[calc(100vh-50px)] "> menu</div> -->
    </div>

    <!-- main -->
    <div class="w-full max-h-[90vh] p-[2rem]">
      <!-- header -->
      <div class="flex items-center justify-between h-[100px] border-b-[1px] border-[#9a9b9b]">

        <div class="text-[2.3rem] font-[600]">Dashboard</div>
        <div class="flex items-center gap-[1rem] justify-between">
          <div>Feed</div>
          <div>Edit</div>
        </div>
        <div class="">
          <div class="relative flex items-center justify-center">
            <input type="text" v-model="searchTerm" class="bg-white h-12 px-4 rounded-lg" placeholder="Search for photos..." @keyup.enter="searchImages" />
            <button class="absolute right-0 top-0 mt-2 mr-2" @click="search">Search</button>
          </div>
        </div>

      </div>

      <!-- gallery -->
      <div class="max-h-[80vh] overflow-y-auto">
        <div class="grid grid-rows-4 lg:grid-cols-4 gap-4">
      <div
        v-for="(image, index) in images"
        :key="image.id"
        :class="`relative h-64 lg:h-auto sm:row-span-1 lg:row-span-${getRowSpan(index)}`"
      >
        <img
          :src="image.urls.regular"
          :alt="image.description"
          class="object-cover w-full h-full"
        />

        <div class="bg-[##50514c] absolute bottom-5 h-[25px] left-0 flex justify-between items-center w-full px-3">
          <div>line</div>

          <div>
            <p>In the Home</p>
            <div>
              <div>author</div>
              <div>name</div>
            </div>
          </div>

          <div>icon</div>
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
import {
  mdiArrowLeft,
  mdiViewDashboardOutline,
  mdiChevronUp,
  mdiChevronDown,
  mdiMagnify,
  mdiSquareEditOutline,
  mdiRss,
} from "@mdi/js";

export default {
  name: "my-component",
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiArrowLeft,
      dashboard: mdiViewDashboardOutline,
      up: mdiChevronUp,
      down: mdiChevronDown,
      search: mdiMagnify,
      edit: mdiSquareEditOutline,
      feed: mdiRss,
      images: [],
      searchTerm: ""
    };
  },
  created() {
    axios
      .get("https://api.unsplash.com/photos", {
        params: {
          client_id: "zXXrlORYdpBagUYyBKQVes8yLrbssQlqjoygK3BzLOs",
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
      axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: this.searchTerm,
          client_id: 'zXXrlORYdpBagUYyBKQVes8yLrbssQlqjoygK3BzLOs'
        }
      })
      .then(response => {
        this.images = response.data.results
      })
      .catch(error => {
        console.log(error)
      })
    },
    getRowSpan(index) {
      if (index % 3 === 0) return 3;
      if (index % 2 === 0) return 2;
      return 1;
    }
  }
};
</script>

<style>
.grid {
  width: 100%;
}
</style>
