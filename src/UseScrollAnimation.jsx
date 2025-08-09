import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const useScrollAnimation = () => {
  useLayoutEffect(() => {
    // ✅ Smooth scrolling with GSAP
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    const spotlightImages = document.querySelector(".imagereveal_spotlight-images");
    const maskContainer = document.querySelector(".imagereveal_mask-container");
    const maskImage = document.querySelector(".imagereveal_mask-img");
    const headlineEls = document.querySelectorAll(".textreveal_headline-sequence .imagereveal_text");

    if (!spotlightImages || !maskContainer || !maskImage || headlineEls.length === 0) return;

    const headlineArray = Array.from(headlineEls);
    const total = headlineArray.length;
    const segment = 0.5 / total;

    gsap.set(headlineArray, {
      opacity: 0,
      yPercent: 50,
      willChange: "transform, opacity",
      force3D: true,
      pointerEvents: "none",
    });

    gsap.set([spotlightImages, maskContainer, maskImage], {
      willChange: "transform, opacity, mask-size",
      force3D: true,
    });

    const onLoadHandler = () => {
      ScrollTrigger.create({
        trigger: ".imagereveal_spotlight",
        start: "top top",
        end: `+=${window.innerHeight * 7}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        markers: true,

        onUpdate: ({ progress: p }) => {
          // 1. Spotlight vertical scroll
          gsap.set(spotlightImages, {
            y: p < 0.5 ? `${5 + (-105 * p) / 0.5}%` : `-100%`,
            force3D: true,
          });

          // 2. Headline transitions
          for (let i = 0; i < total; i++) {
            const start = i * segment;
            const end = start + segment;

            if (p >= start && p < end) {
              const local = (p - start) / segment;
              const opacity =
                local < 0.3
                  ? local / 0.3
                  : local > 0.7
                  ? (1 - local) / 0.3
                  : 1;
              const yOffset = (1 - local) * 100 - 50;

              gsap.set(headlineArray[i], {
                opacity,
                yPercent: yOffset,
                pointerEvents: "auto",
                force3D: true,
              });
            } else {
              gsap.set(headlineArray[i], {
                opacity: 0,
                yPercent: 50,
                pointerEvents: "none",
                force3D: true,
              });
            }
          }

          // 3. Mask reveal & image scale
          const maskProgress = (p - 0.5) / 0.3;
          const clampedMaskProgress = Math.min(Math.max(maskProgress, 0), 1);
          const maskSize = `${clampedMaskProgress * 450}%`;
          const imageScale = 1.5 - clampedMaskProgress * 0.5;

          maskContainer.style.setProperty("mask-size", maskSize);
          maskContainer.style.setProperty("-webkit-mask-size", maskSize);

          gsap.set(maskImage, {
            scale: imageScale,
            force3D: true,
          });
        },
      });
    };

    if (document.readyState === "complete") {
      onLoadHandler();
    } else {
      window.addEventListener("load", onLoadHandler);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ScrollSmoother.get()?.kill();
      window.removeEventListener("load", onLoadHandler);
    };
  }, []);
};

export default useScrollAnimation;
