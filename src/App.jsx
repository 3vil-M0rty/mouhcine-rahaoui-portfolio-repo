
import Canvas from './Canvas/Canvas.jsx'
import Gallery from './Gallery/Gallery.jsx';
import Journey from './Journey/Journey.jsx';
import React, { useEffect } from 'react';
import { changePNGs } from './CustomJS/morph.js';

import './App.css'
import THREEDGallery from './3DGallery/3DGallery.jsx';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      changePNGs('first', 'second', 'sect2');
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const isDesktop = window.innerWidth > 768;
  return (
    <>
      {isDesktop && <Canvas canvasID={0} />}
      {/* <MouseTrail /> */}
      <div className="profile">
        <div className='Mouhcine' id='sect1'>
          <img src="../src/assets/artworks/me.jpg" alt="" className="profile-pic" />
          <div className='profile-title' id='title'>
            <img className='profile-title-pic' id='first' src="../src/assets/artworks/first.png" alt="" />
            <img className='profile-title-pic' id='second' style={{ display: 'none' }} src="../src/assets/artworks/second.png" alt="" />
          </div>

          <section className='profile-section-one'></section>
          <div className="sec-2-container">
            <section className='profile-section-two'>
              <div className="bg-sec-2"></div>
              <p>
                Mouhcine Rahaoui, born in 1990 in Jerada, Morocco, lives and works in Marrakech. I graduated from the Tetouan School of Fine Arts in 2017. My work delves into the history and experiences of miners in Jerada, capturing the harsh reality of a town where survival often means risking one’s life in the mines. Inspired by the legend of a Belgian forest ranger who discovered coal following a black rabbit in the late 1920s, I explore the fragile balance between life and death in the mining industry. Through reproductions, installations, and ready-mades featuring miners’ tools, my art immerses viewers in the stark aesthetics of the worker, highlighting the often tragic fate sealed by the mine.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Gallery slideDirection="left"/>
      <Journey />
      {/* <THREEDGallery/> */}
      {/* <div className="ParentContainer">
        <div className="CardsContainer">
          <Card source="../src/assets/artworks/artwork1.jpg" alt="L'mina" cardName="L'mina" cardYear={2024} id={1} />
          <Card source="../src/assets/artworks/artwork7.jpg" alt="L'mina" cardName="L'mina" cardYear={2022} id={2} />
          <Card source="../src/assets/artworks/artwork3.jpg" alt="L'mina" cardName="L'mina" cardYear={2020} id={3} />
          <Card source="../src/assets/artworks/artwork5.jpg" alt="L'mina" cardName="L'mina" cardYear={2020} id={4} />
          <Card source="../src/assets/artworks/artwork2.jpg" alt="L'mina" cardName="L'mina" cardYear={2024} id={5} />
          <Card source="../src/assets/artworks/artwork6.jpg" alt="L'mina" cardName="L'mina" cardYear={2022} id={6} />
          <Card source="../src/assets/artworks/artwork2.jpg" alt="L'mina" cardName="L'mina" cardYear={2020} id={7} />
        </div>
      </div> */}
    </>
  )
}

export default App
