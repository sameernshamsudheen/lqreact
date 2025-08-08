import { useState } from 'react'
import useScrollAnimation from './UseScrollAnimation'


function App() {
 useScrollAnimation()

  return (
    <section className="imagereveal_spotlight">
      <div className="textreveal_header textreveal_headline-sequence">
        <h1 className="imagereveal_text">Where Frames Fade into Fates</h1>
        <h1 className="imagereveal_text">Second Message</h1>
        <h1 className="imagereveal_text">Third Message</h1>
      </div>
      <div className="imagereveal_spotlight-images">
        <div className="imagereveal_row">
          <div className="imagereveal_img">
            <img className="imagereveal_displayimage" src="/imageone.webp" alt="dr" />
          </div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"></div>
          <div className="imagereveal_img"><img className="imagereveal_displayimage" src="/imagetwo.webp" alt="dr" /></div>
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
      <div className="imagereveal_mask-container">
        <div className="imagereveal_mask-img">
          <img className="imagereveal_banner" src="/spotlightbanner.jpeg" alt="dr" />
        </div>
       <div className="finaltext_header">
          <h1 className="final_text">the last Frame hits hard</h1>
        </div>
      </div> 
    </section>
  )
}

export default App
