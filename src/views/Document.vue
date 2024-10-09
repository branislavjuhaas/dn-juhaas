<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const db = getFirestore();

const route = useRoute();
const documentId = route.params.id;
const documentData = ref(null);

onMounted(async () => {
  const docRef = doc(db, "documents", documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    documentData.value = docSnap.data();
  } else {
    documentData.value = {
      content: "<h1>Document -> Not Found</h1>",
    };
  }
});
</script>

<template>
  <div
    id="document-content"
    v-if="documentData"
    v-html="documentData.content"
    class="flex flex-col overflow-y-auto scrollbar-hidden"></div>
</template>

<style scoped>
/* Document content v-html's h1 that capitalizes all words */
:deep(h1) {
  @apply text-5xl font-bold mt-4 mb-16 max-w-[50rem] uppercase text-center self-center;
}

:deep(p) {
  /* Document content v-html's p with proper paragraph spacing and justification */
  @apply text-justify my-4;
  font-variant-ligatures: no-common-ligatures;
}
</style>
