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

    const spotlightImages = document.querySelector(".imagereveal_spotlight-images");
    const maskContainer = document.querySelector(".imagereveal_mask-container");
    const maskImage = document.querySelector(".imagereveal_mask-img");
    const headlineEls = document.querySelectorAll(".textreveal_headline-sequence .imagereveal_text");

    if (!spotlightImages || !maskContainer || !maskImage || !headlineEls.length) return;

    const onLoadHandler = () => {
      ScrollTrigger.create({
        trigger: ".imagereveal_spotlight",
        start: "top top",
        end: `+=${window.innerHeight * 7}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        markers: true,

        onUpdate: ({ progress }) => {
          // === 1. Spotlight Image Scroll (0.00 to 0.50)
          if (progress < 0.5) {
            const y = 5 + (-105) * (progress / 0.5);
            gsap.set(spotlightImages, { y: `${y}%` });
          } else {
            gsap.set(spotlightImages, { y: `-100%` });
          }

          // === 2. Headline Sequence Fade (0.00 to 0.50)
          const total = headlineEls.length;
          const segment = 0.5 / total;

          headlineEls.forEach((el, i) => {
            const start = i * segment;
            const end = start + segment;

            if (progress >= start && progress < end) {
              const local = (progress - start) / segment;
              let opacity = 1;

              if (local < 0.3) opacity = local / 0.3;
              else if (local > 0.7) opacity = (1 - local) / 0.3;

              gsap.set(el, { opacity });
            } else {
              gsap.set(el, { opacity: 0 });
            }
          });

          // === 3. Mask Animation (0.50 to 0.80)
          if (progress > 0.5 && progress < 0.8) {
            const maskProgress = (progress - 0.5) / 0.3;
            const maskSize = `${maskProgress * 450}%`;
            const imageScale = 1.5 - maskProgress * 0.5;

            maskContainer.style.setProperty("mask-size", maskSize);
            maskContainer.style.setProperty("-webkit-mask-size", maskSize);
            gsap.set(maskImage, { scale: imageScale });
          } else {
            const maskSize = progress <= 0.5 ? "0%" : "450%";
            const imageScale = progress <= 0.5 ? 1.5 : 1;

            maskContainer.style.setProperty("mask-size", maskSize);
            maskContainer.style.setProperty("-webkit-mask-size", maskSize);
            gsap.set(maskImage, { scale: imageScale });
          }

          // === 4. Final Header Word Animation (0.80 to 1.00)
          // Uncomment if you reintroduce SplitText
          /*
          if (headerSplit && headerSplit.words.length > 0) {
            if (progress > 0.8 && progress < 1.0) {
              const textProgress = (progress - 0.8) / 0.2;
              headerSplit.words.forEach((word, index) => {
                const wordReveal = index / headerSplit.words.length;
                gsap.set(word, {
                  opacity: textProgress > wordReveal ? 1 : 0,
                });
              });
            } else {
              const opacity = progress >= 1.0 ? 1 : 0;
              gsap.set(headerSplit.words, { opacity });
            }
          }
          */
        },
      });
    };

    window.addEventListener("load", onLoadHandler);

    return () => {
      lenisInstance.destroy();
      window.removeEventListener("load", onLoadHandler);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
};

export default useScrollAnimation;
