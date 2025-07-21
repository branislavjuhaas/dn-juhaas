<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({
      statusCode: 500,
      statusMessage: "Unknown error",
    }),
  },
});

const message = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return {
        title: "Content Beyond Scope",
        subtitle:
          "This page seems to have taken a detour. Maybe check for typos?",
      };
    case 500:
      return {
        title: "Server Error Encountered",
        subtitle:
          "It seems the system hit an unexpected snag while handling your request.",
      };
    default:
      return {
        title: props.error.statusMessage || "Error",
        subtitle: "An unexpected error occurred.",
      };
  }
});

const goHomeAndReload = () => {
  window.location.href = "/";
  // If already on '/', force reload
  if (window.location.pathname === "/") {
    window.location.reload();
  }
};
</script>

<template>
  <div class="error-container">
    <main class="error-main">
      <div class="error-content-wrapper">
        <div class="error-content">
          <div class="error-message">
            <h1>{{ message.title }}</h1>
            <p>
              {{ message.subtitle }}
            </p>
          </div>
          <div class="error-home-link">
            <button class="reload-btn" @click="goHomeAndReload">
              <Icon name="ph:house-line" />
              Return Home
            </button>
          </div>
          <p class="error-status-code">
            {{ String(props.error.statusCode).replaceAll("0", "O") }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  width: 100%;
}
.error-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
}
.error-content-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  height: 100%;
  padding-top: 200px;
}
.error-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: relative;
}
.error-message {
  display: flex;
  flex-direction: column;
}
.error-home-link {
  width: 100%;
  max-width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 56px;
}
.reload-btn {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  text-decoration: none;
  transition: color 0.2s;
  padding: 0;
}
.reload-btn:hover {
  color: #496580; /* ocean color */
}
.error-status-code {
  position: absolute;
  font-weight: bold;
  bottom: -12.4rem;
  right: 0;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 7px;
  z-index: -10;
  font-size: 25rem;
  object-fit: cover;
  display: none;
}
@media (min-width: 768px) {
  .error-status-code {
    display: flex;
  }
}
@media (max-width: 767px) {
  .error-main,
  .error-content-wrapper,
  .error-content,
  .error-message,
  .error-home-link {
    align-items: center !important;
    text-align: center;
  }
  .error-message h1,
  .error-message p {
    text-align: center;
  }
}
</style>
