// App.jsx
import React, { useState } from 'react';
import PixelBlast from './bg';
import './website.css';
import ImageGallery from './ImageGallery';

import start from './img/start.png'
import start_sel from './img/start_sel.png'

function App() {
	
	
  return (
  
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#1e1e2e',}}>
      <PixelBlast color="#cba6f7" pixelSize={3} variant="square" speed={1.5} patternScale={3} edgeFade={0.2} transparent={true} enableRipples={false} />

      {/* Your content layer stays down here */}
      <main style={{ position: 'absolute', zIndex: 1, color: 'white', top: 0, left: 0, }}>
	  <ImageGallery />
	
      </main>

    </div>
  );
}

export default App;