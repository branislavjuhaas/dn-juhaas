import { ref, onMounted, onUnmounted } from "vue";
import type { ITitle } from "./useTitles";

export const useTitleAnimator = (
  titleSubtitlePairs: ITitle[],
  randomLoad = false,
  randomDeLoad = false,
) => {
  const animatedTitle = ref(titleSubtitlePairs[0].title);
  const animatedSubtitle = ref(titleSubtitlePairs[0].subtitle);
  const iterationRange = { min: 1, max: 5 };

  const shuffledPairs = [...titleSubtitlePairs];
  for (let i = shuffledPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPairs[i], shuffledPairs[j]] = [shuffledPairs[j], shuffledPairs[i]];
  }

  let pairIndex = shuffledPairs.findIndex(
    (p) => p.title === titleSubtitlePairs[0].title,
  );
  if (pairIndex === -1) {
    pairIndex = 0;
  }

  let currentTitle = titleSubtitlePairs[0].title;
  let revealedChars = currentTitle.length;
  let iterationCount = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  const animationSpeed = 75;
  const pauseBetweenTitles = 3000;
  const subtitleTransitionDuration = 650; // ms

  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!&+:<>?~";

  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const getRandomCharForPos = (pos: number) => {
    let char = getRandomChar();
    while (char === currentTitle[pos]) {
      char = getRandomChar();
    }
    return char;
  };

  const animate = () => {
    if (revealedChars === 0 && iterationCount === 0) {
      currentTitle = shuffledPairs[pairIndex].title;
      animatedTitle.value = Array.from(
        { length: currentTitle.length },
        (_, i) => getRandomCharForPos(i),
      ).join("");
    }

    if (revealedChars < currentTitle.length) {
      const randomIterations =
        Math.floor(
          Math.random() * (iterationRange.max - iterationRange.min + 1),
        ) + iterationRange.min;
      if (iterationCount < randomIterations) {
        let tempTitle = "";
        if (randomLoad) {
          const revealedIndices = new Set<number>();
          while (revealedIndices.size < revealedChars) {
            revealedIndices.add(
              Math.floor(Math.random() * currentTitle.length),
            );
          }
          for (let i = 0; i < currentTitle.length; i++) {
            if (revealedIndices.has(i)) {
              tempTitle += currentTitle[i];
            } else {
              tempTitle += getRandomCharForPos(i);
            }
          }
        } else {
          tempTitle =
            currentTitle.substring(0, revealedChars) +
            Array.from(
              { length: currentTitle.length - revealedChars },
              (_, i) => getRandomCharForPos(revealedChars + i),
            ).join("");
        }
        animatedTitle.value = tempTitle;
        iterationCount++;
      } else {
        revealedChars++;
        iterationCount = 0;
        let tempTitle = "";
        if (randomLoad) {
          const revealedIndices = new Set<number>();
          while (revealedIndices.size < revealedChars) {
            revealedIndices.add(
              Math.floor(Math.random() * currentTitle.length),
            );
          }
          for (let i = 0; i < currentTitle.length; i++) {
            if (revealedIndices.has(i)) {
              tempTitle += currentTitle[i];
            } else {
              tempTitle += getRandomCharForPos(i);
            }
          }
        } else {
          tempTitle =
            currentTitle.substring(0, revealedChars) +
            Array.from(
              { length: currentTitle.length - revealedChars },
              (_, i) => getRandomCharForPos(revealedChars + i),
            ).join("");
        }
        animatedTitle.value = tempTitle;
      }

      const remainingChars = currentTitle.length - revealedChars;
      const avgIterations = (iterationRange.min + iterationRange.max) / 2;
      const estimatedTimeRemaining =
        remainingChars * avgIterations * animationSpeed;

      if (
        estimatedTimeRemaining <= subtitleTransitionDuration &&
        animatedSubtitle.value !== shuffledPairs[pairIndex].subtitle
      ) {
        animatedSubtitle.value = shuffledPairs[pairIndex].subtitle;
      }

      timeoutId = setTimeout(animate, animationSpeed);
    } else {
      animatedTitle.value = currentTitle;
      animatedSubtitle.value = shuffledPairs[pairIndex].subtitle;
      timeoutId = setTimeout(deAnimate, pauseBetweenTitles);
    }
  };

  const deAnimate = () => {
    if (revealedChars > 0) {
      const randomIterations =
        Math.floor(
          Math.random() * (iterationRange.max - iterationRange.min + 1),
        ) + iterationRange.min;
      if (iterationCount < randomIterations) {
        let tempTitle = "";
        if (randomDeLoad) {
          const revealedIndices = new Set<number>();
          while (revealedIndices.size < revealedChars) {
            revealedIndices.add(
              Math.floor(Math.random() * currentTitle.length),
            );
          }
          for (let i = 0; i < currentTitle.length; i++) {
            if (revealedIndices.has(i)) {
              tempTitle += currentTitle[i];
            } else {
              tempTitle += getRandomCharForPos(i);
            }
          }
        } else {
          tempTitle =
            currentTitle.substring(0, revealedChars) +
            Array.from(
              { length: currentTitle.length - revealedChars },
              (_, i) => getRandomCharForPos(revealedChars + i),
            ).join("");
        }
        animatedTitle.value = tempTitle;
        iterationCount++;
      } else {
        revealedChars--;
        iterationCount = 0;
        let tempTitle = "";
        if (randomDeLoad) {
          const revealedIndices = new Set<number>();
          while (revealedIndices.size < revealedChars) {
            revealedIndices.add(
              Math.floor(Math.random() * currentTitle.length),
            );
          }
          for (let i = 0; i < currentTitle.length; i++) {
            if (revealedIndices.has(i)) {
              tempTitle += currentTitle[i];
            } else {
              tempTitle += getRandomCharForPos(i);
            }
          }
        } else {
          tempTitle =
            currentTitle.substring(0, revealedChars) +
            Array.from(
              { length: currentTitle.length - revealedChars },
              (_, i) => getRandomCharForPos(revealedChars + i),
            ).join("");
        }
        animatedTitle.value = tempTitle;
      }
      timeoutId = setTimeout(deAnimate, animationSpeed);
    } else {
      revealedChars = 0;
      pairIndex = (pairIndex + 1) % shuffledPairs.length;
      animate();
    }
  };

  onMounted(() => {
    timeoutId = setTimeout(deAnimate, pauseBetweenTitles);
  });

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return {
    animatedTitle,
    animatedSubtitle,
  };
};
