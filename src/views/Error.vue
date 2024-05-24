<script setup>
// get the error from the props
const props = defineProps(["code"]);

// set the error message based on the error code
let message = "";
let description = "";
switch (props.code) {
  case 404:
    message = "Page not found";
    description = "The page you are looking for does not exist yet.";
    break;
  case 500:
    message = "Internal server error";
    break;
  default:
    message = "An error occurred";
}
</script>

<template>
  <div>
    <h1 class="text-5xl font-bold">{{ code }} -> {{ message }}</h1>
    <p class="text-xl mt-2">{{ description }}</p>
  </div>
</template>

<style scoped></style>
