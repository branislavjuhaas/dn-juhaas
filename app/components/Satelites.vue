<script setup lang="ts">
import { computed } from "vue";

export interface BadgeItem {
  title: string;
  icon?: string;
}

interface Props {
  items?: BadgeItem[];
  avatarSrc?: string;
  avatarAlt?: string;
  maxArc?: number;
  maxStep?: number;
  radius?: number;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [
    { title: "Full-Stack & Cloud Dev", icon: "i-ph-cloud-check" },
    { title: "Academic Weapon", icon: "i-ph-exam" },
    { title: "Endurance Cyclist", icon: "i-ph-mountains" },
    { title: "Non-Profit Lead", icon: "i-ph-handshake" },
    { title: "'24 Debate Champion", icon: "i-ph-medal" },
  ],
  avatarSrc: "/assets/avatars/branislav-juhas.jpg",
  avatarAlt: "Branislav Juhás",
  maxArc: 110,
  maxStep: 70,
  radius: 140,
});

const DEG_TO_RAD = Math.PI / 180;

const getSideMetrics = (count: number, maxArc: number, maxStep: number) => {
  if (count <= 1) return { step: 0, span: 0 };
  const step = Math.min(maxArc / (count - 1), maxStep);
  return { step, span: (count - 1) * step };
};

const itemsWithPositions = computed(() => {
  const list = props.items;
  const total = list.length;
  if (!total) return [];

  const leftCount = Math.ceil(total / 2);
  const rightCount = total - leftCount;

  const leftMetrics = getSideMetrics(leftCount, props.maxArc, props.maxStep);
  const rightMetrics = getSideMetrics(rightCount, props.maxArc, props.maxStep);

  return list.map((item, index) => {
    const isLeft = index < leftCount;
    let angle: number;

    if (isLeft) {
      angle = leftCount === 1 ? 180 : 180 - leftMetrics.span / 2 + index * leftMetrics.step;
    } else {
      const rightIndex = index - leftCount;
      angle = rightCount === 1 ? 0 : rightMetrics.span / 2 - rightIndex * rightMetrics.step;
    }

    const rad = angle * DEG_TO_RAD;
    const x = Math.cos(rad) * props.radius;
    const y = Math.sin(rad) * props.radius;

    const absX = Math.round(Math.abs(x));
    const absY = Math.round(Math.abs(y));

    const style: Record<string, string> = {
      [x < 0 ? "right" : "left"]: `calc(50% + ${absX}px)`,
    };

    if (absY < 15) {
      style.top = "50%";
      style.transform = "translateY(-50%)";
    } else if (y > 0) {
      style.bottom = `calc(50% + ${absY}px)`;
    } else {
      style.top = `calc(50% + ${absY}px)`;
    }

    return {
      ...item,
      style,
    };
  });
});
</script>

<template>
  <div class="relative flex items-center justify-center max-xl:mt-16">
    <div class="p-4 sm:p-2.5 border-2 border-default rounded-full flex items-center justify-center">
      <UAvatar
        :src="avatarSrc"
        :alt="avatarAlt"
        class="size-80 sm:size-52 rounded-full object-cover"
      />
    </div>

    <UBadge
      v-for="item in itemsWithPositions"
      :key="item.title"
      color="neutral"
      variant="outline"
      size="lg"
      :icon="item.icon"
      :label="item.title"
      class="absolute max-sm:hidden"
      :style="item.style"
    />
  </div>
</template>
