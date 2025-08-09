import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const ImageReveal = () => {
  const navigate = useNavigate();

  const spotlightImagesRef = useRef(null);
  const maskContainerRef = useRef(null);
  const maskImageRef = useRef(null);
  const headlineRefs = useRef([]);

  const addHeadlineRef = (el) => {
    if (el && !headlineRefs.current.includes(el)) {
      headlineRefs.current.push(el);
    }
  };

  useEffect(() => {
    const spotlightImages = spotlightImagesRef.current;
    const maskContainer = maskContainerRef.current;
    const maskImage = maskImageRef.current;
    const headlineArray = headlineRefs.current;

    if (!spotlightImages || !maskContainer || !maskImage || headlineArray.length === 0) {
      return;
    }

    const total = headlineArray.length;
    const segment = 0.5 / total;

    // Set initial styles
    gsap.set(headlineArray, { opacity: 0, yPercent: 50, willChange: "transform, opacity" });
    gsap.set([spotlightImages, maskContainer, maskImage], { willChange: "transform, opacity, mask-size" });

    // Main ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: maskContainer.closest(".imagereveal_spotlight"),
      start: "top top",
      end: `+=${window.innerHeight * 7}px`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      markers: false,
      onUpdate: ({ progress: p }) => {
        // Batch DOM writes
        gsap.set(spotlightImages, {
          y: p < 0.5 ? `${5 + (-105 * p) / 0.5}%` : `-100%`,
        });

        headlineArray.forEach((el, i) => {
          const start = i * segment;
          const end = start + segment;
          if (p >= start && p < end) {
            const local = (p - start) / segment;
            const opacity = local < 0.3 ? local / 0.3 : local > 0.7 ? (1 - local) / 0.3 : 1;
            const yOffset = (1 - local) * 100 - 50;
            gsap.set(el, { opacity, yPercent: yOffset, pointerEvents: "auto" });
          } else {
            gsap.set(el, { opacity: 0, yPercent: 50, pointerEvents: "none" });
          }
        });

        const maskProgress = (p - 0.5) / 0.3;
        const clamped = Math.min(Math.max(maskProgress, 0), 1);
        const maskSize = `${clamped * 450}%`;
        const imageScale = 1.5 - clamped * 0.5;

        maskContainer.style.maskSize = maskSize;
        maskContainer.style.webkitMaskSize = maskSize;
        gsap.set(maskImage, { scale: imageScale });
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <section className="imagereveal_spotlight">
      <div className="textreveal_header textreveal_headline-sequence">
        <div className="imagereveal_text" ref={addHeadlineRef}>
          <h1>Why Community ? </h1>
          <p>
            Whether you are a seasoned expert or an emerging talent a growing
            network of thought leaders who challenge conventional thinking, A
            launchpad for ideas, collaborations, and support.
          </p>
        </div>
        <div className="imagereveal_text" ref={addHeadlineRef}>
          <h1>Why join LQ130.7</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            nobis blanditiis labore pariatur?
          </p>
        </div>
        <div className="imagereveal_text" ref={addHeadlineRef}>
          <h1>Where Frames Fade into3</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            nobis blanditiis labore pariatur?
          </p>
        </div>
      </div>

      {/* Spotlight Images */}
      <div className="imagereveal_spotlight-images" ref={spotlightImagesRef}>
       <div className="imagereveal_row">
          <div className="imagereveal_img">
            <img className="imagereveal_displayimage" src="/imageone.webp" alt="dr" />
          </div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage" src="/imgtwo.webp" alt="dr" /></div>
        </div>
        <div className="imagereveal_row">
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imagethree.webp" alt="dr" /></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imagefour.webp" alt="dr" /></div>
        </div>
        <div className="imagereveal_row">
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imagefive.webp" alt="dr" /></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"></div>
        </div>
        <div className="imagereveal_row">
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imagesix.webp" alt="dr" /></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imageseven.webp" alt="dr" /></div>
          <div className="imagereveal_img"></div>
        </div>
        <div className="imagereveal_row">
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imagenine.webp" alt="dr" /></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"></div>
        </div>
        <div className="imagereveal_row">
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imagenine.webp" alt="dr" /></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"></div>
        </div>
        <div className="imagereveal_row">
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imagenine.webp" alt="dr" /></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"></div>
        </div>
        <div className="imagereveal_row">
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage"  src="/imagenine.webp" alt="dr" /></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"></div>
        </div>
      </div>

      {/* Final Section */}
      <div className="imagereveal_mask-container" ref={maskContainerRef}>
        <div className="imagereveal_mask-img" ref={maskImageRef}>
          <img className="imagereveal_banner" src="/spotlightbanner.webp" alt="dr" />
        </div>
        <div className="finaltext_header">
          <h1 className="final_text">the last Frame hits hard</h1>
        </div>
      </div>
    </section>
  );
};

export default ImageReveal;
