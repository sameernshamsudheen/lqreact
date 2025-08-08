import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const useScrollAnimation = () => {
  useEffect(() => {
    const lenisInstance = new Lenis({ smooth: true });
    lenisInstance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Cache DOM elements once
    const spotlightImages = document.querySelector(".imagereveal_spotlight-images");
    const maskContainer = document.querySelector(".imagereveal_mask-container");
    const maskImage = document.querySelector(".imagereveal_mask-img");
    const headlineEls = document.querySelectorAll(".textreveal_headline-sequence .imagereveal_text");

    if (!spotlightImages || !maskContainer || !maskImage || headlineEls.length === 0) return;

    const headlineArray = Array.from(headlineEls);
    const total = headlineArray.length;
    const segment = 0.5 / total;

    const setOpacity = (el, value) => gsap.set(el, { opacity: value });

    const onLoadHandler = () => {
      ScrollTrigger.create({
        trigger: ".imagereveal_spotlight",
        start: "top top",
        end: `+=${window.innerHeight * 7}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        markers: false, // Disable in production

        onUpdate: ({ progress }) => {
          const p = progress;

          // === 1. Spotlight Image Scroll
          gsap.set(spotlightImages, {
            y: p < 0.5 ? `${5 + (-105 * p) / 0.5}%` : `-100%`,
          });

          // === 2. Headline Sequence Fade
          for (let i = 0; i < total; i++) {
            const start = i * segment;
            const end = start + segment;

            if (p >= start && p < end) {
              const local = (p - start) / segment;
              const opacity = local < 0.3 ? local / 0.3 : local > 0.7 ? (1 - local) / 0.3 : 1;
              setOpacity(headlineArray[i], opacity);
            } else {
              setOpacity(headlineArray[i], 0);
            }
          }

          // === 3. Mask Animation
          const maskProgress = (p - 0.5) / 0.3;
          const clampedMaskProgress = Math.min(Math.max(maskProgress, 0), 1);
          const maskSize = `${clampedMaskProgress * 450}%`;
          const imageScale = 1.5 - clampedMaskProgress * 0.5;

          maskContainer.style.setProperty("mask-size", maskSize);
          maskContainer.style.setProperty("-webkit-mask-size", maskSize);
          gsap.set(maskImage, { scale: imageScale });

          // === 4. Final Header Word Animation (commented out unless SplitText is reintroduced)
        },
      });
    };

    if (document.readyState === "complete") {
      onLoadHandler();
    } else {
      window.addEventListener("load", onLoadHandler);
    }

    return () => {
      lenisInstance.destroy();
      window.removeEventListener("load", onLoadHandler);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
};

export default useScrollAnimation;
