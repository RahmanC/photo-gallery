<template>
  <div class="max-w-[100%] h-screen flex flex-1 text-[#e9e9e9] bg-[#171918]">
    <!-- sidebar -->
    <div
      class="hambuger-menu z-20 flex flex-col justify-between w-[80%] lg:w-[300px] h-full border-r-[1px] border-[#9a9b9b] px-[2.5rem]"
      v-show="showSide"
    >
      <!-- top -->
      <div class="">
        <div
          class="h-[100px] border-b-[1px] border-[#9a9b9b] pt-[1.5rem] pb-[1.5rem] flex items-center justify-between"
        >
          <div>STGallery</div>
          <svg-icon type="mdi" :path="path" class="text-[#4c9a6e]"></svg-icon>
        </div>
        <!-- v-show="isMobile" -->

        <div
          class="border-b-[1px] border-[#9a9b9b] pt-[1.5rem] pb-[1.5rem] flex flex-col"
          @click="showSubMenu"
        >
          <div class="flex items-center justify-around mb-[1rem]">
            <svg-icon
              type="mdi"
              :path="dashboard"
              class="text-[#fff]"
            ></svg-icon>
            <div>Dashboard</div>
            <svg-icon
              type="mdi"
              :path="up"
              class="text-[#4c9a6e]"
              v-if="submenu"
            ></svg-icon>
            <svg-icon
              type="mdi"
              :path="down"
              class="text-[#4c9a6e]"
              v-else
            ></svg-icon>
          </div>

          <!-- sub menu -->
          <div v-show="submenu">
            <router-link
              to="/feed"
              class="flex items-center justify-start ml-[40%] mb-[0.6rem] text-sm hover:bg-white active:bg-white hover:text-black rounded mx-[0.5rem]"
            >
              <svg-icon
                type="mdi"
                :path="feed"
                class="text-xs mr-5 hover:bg-white active:bg-white hover:text-black"
              ></svg-icon>
              <div>Feed</div>
            </router-link>

            <router-link
              to="/edit"
              class="flex items-center justify-start ml-[40%] mb-[0.6rem] text-sm hover:bg-white active:bg-white hover:text-black rounded mx-[0.5rem]"
            >
              <svg-icon type="mdi" :path="edit" class="text-xs mr-5"></svg-icon>
              <div>Edit</div>
            </router-link>

            <router-link
              to="/"
              class="flex items-center justify-start ml-[40%] mb-[0.6rem] text-sm hover:bg-white active:bg-white hover:text-black rounded mx-[0.5rem]"
            >
              <svg-icon
                type="mdi"
                :path="search"
                class="text-xs mr-5"
              ></svg-icon>
              <div>Search</div>
            </router-link>
          </div>
        </div>

        <router-link
          to="#"
          class="flex items-center justify-around mb-[1rem] mt-[1.5rem] hover:bg-white active:bg-white hover:text-black rounded"
        >
          <svg-icon type="mdi" :path="dashboard" class=""></svg-icon>
          <div class="text-start mr-[20px]">Explore</div>
          <div></div>
        </router-link>

        <router-link
          to="#"
          class="flex items-center justify-around mb-[1rem] mt-[1.5rem] hover:bg-white active:bg-white hover:text-black rounded"
        >
          <svg-icon type="mdi" :path="dashboard" class=""></svg-icon>
          <div>Bookmark</div>
          <div></div>
        </router-link>

        <router-link
          to="#"
          class="flex items-center justify-around mb-[1rem] mt-[1.5rem] hover:bg-white active:bg-white hover:text-black rounded"
        >
          <svg-icon type="mdi" :path="dashboard" class=""></svg-icon>
          <div>Downloads</div>
          <div></div>
        </router-link>

        <router-link
          to="#"
          class="flex items-center justify-around mb-[1rem] mt-[1.5rem] hover:bg-white active:bg-white hover:text-black rounded"
        >
          <svg-icon type="mdi" :path="dashboard" class=""></svg-icon>
          <div>Notification</div>
          <div class="py-[2px] px-[5px] bg-[#4c9a6e] rounded-md text-[0.6rem]">
            +9
          </div>
        </router-link>
        <!-- <div class="h-[calc(100vh-50px)] "> menu</div> -->
      </div>

      <!-- bottom -->
      <div class="border-b-[1px] border-[#9a9b9b] mb-3">
        <router-link
          to="#"
          class="flex items-center justify-around mb-[1rem] mt-[1.5rem] hover:bg-white active:bg-white hover:text-black rounded"
        >
          <svg-icon type="mdi" :path="dashboard" class=""></svg-icon>
          <div>Settings</div>
          <div></div>
        </router-link>

        <router-link
          to="#"
          class="flex items-center justify-around mb-[1rem] mt-[1.5rem] hover:bg-white active:bg-white hover:text-black rounded"
        >
          <svg-icon type="mdi" :path="dashboard" class=""></svg-icon>
          <div>Help</div>
          <div></div>
        </router-link>
      </div>

      <div class="flex mb-7 items-center justify-between">
        <div>
          <img
            :src="user"
            :alt="'user'"
            class="object-cover w-[50px] h-[50px] rounded-full"
          />
        </div>
        <div class="flex justify-between flex-col">
          <div class="text-md font-semibold">Brooklyn</div>
          <div class="flex items-center">
            <svg-icon type="mdi" :path="dot" class="text-[#4c9a6e]"></svg-icon>
            <div class="text-sm text-[#4c9a6e]">Account Pro</div>
          </div>
        </div>
      </div>
    </div>

    <!-- main -->
    <div class="lg:w-full max-h-[90vh] p-[2rem]">
      <svg-icon
        type="mdi"
        :path="menu"
        class="text-[#4c9a6e] cursor-pointer"
        v-show="isMobile"
        @click="toggleSidebar"
      ></svg-icon>
      <!-- main -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiArrowLeft,
  mdiViewDashboardOutline,
  mdiChevronUp,
  mdiChevronDown,
  mdiMagnify,
  mdiSquareEditOutline,
  mdiRss,
  mdiMenu,
  mdiCircleSmall,
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
      menu: mdiMenu,
      dot: mdiCircleSmall,
      submenu: false,
      showSide: true,
      isMobile: false,
      user: require("@/assets/images/user.png"),
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    toggleSidebar() {
      this.showSide = !this.showSide;
    },
    showSubMenu() {
      this.submenu = !this.submenu;
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 600;
    },
  },
};
</script>

<style>
.grid {
  width: 100%;
}
</style>
