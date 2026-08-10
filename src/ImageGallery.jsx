import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // ⚡ NEW PORTAL IMPORT
import './website.css'; // css file
import start from './img/start.png'; import start_sel from './img/start_sel.png';
import main from './img/main.png';   import main_highlight from './img/main_highlight.png'; import main_sel from './img/main_sel.png';
import info from './img/info.png';   import info_highlight from './img/info_highlight.png'; import info_sel from './img/info_sel.png';
import fav from './img/fav.png';     import fav_highlight from './img/fav_highlight.png';   import fav_sel from './img/fav_sel.png';
import socials from './img/socials.png'; import socials_highlight from './img/socials_highlight.png'; import socials_sel from './img/socials_sel.png';
import taskbar from './img/taskbar.png'; import time from './img/time.png';
import logo from './img/logo.png';   import logo_unhighlight from './img/logo_unhighlight.png';
import mi from './img/mi.png';       import mi_unhighlight from './img/mi_unhighlight.png';
import error from './img/error.png'; import error_X_highlight from './img/error_X_highlight.png'; import warning from './snd/warning.mp3';
import pfp from './pfp.png';         import fs from './img/fs.png'; import fs_unhighlight from './img/fs_unhighlight.png';
import socials_paint from './img/socials_paint.png'; import socials_unhighlight from './img/socials_unhighlight.png';
import logo_X_sel from './img/logo_X_sel.png'; import logo_X_sel_unhighlight from './img/logo_X_sel_unhighlight.png';
import popup_img from './img/popup_img.png';
// russian stuff down here
import start_r from './img/ru/start_r.png'; import start_sel_r from './img/ru/start_sel_r.png';
import logo_r from './img/ru/logo_r.png'; import logo_unhighlight_r from './img/ru/logo_unhighlight_r.png';
import error_r from './img/ru/error_r.png'; import error_X_r from './img/ru/error_X_r.png';
import mi_r from './img/ru/mi_r.png'; import mi_unhighlight_r from './img/ru/mi_unhighlight_r.png';
import fav_r from './img/ru/fav_r.png'; import fav_unhighlight_r from './img/ru/fav_unhighlight_r.png';
import socials_paint_r from './img/ru/socials_paint_r.png'; import socials_unhighlight_r from './img/ru/socials_unhighlight_r.png';
import fav_highlight_r from './img/ru/fav_highlight_r.png'; import fav_sel_r from './img/ru/fav_sel_r.png'; import fav_taskbar_r from './img/ru/fav_taskbar_r.png';
import main_highlight_r from './img/ru/main_highlight_r.png'; import main_r from './img/ru/main_r.png'; import main_sel_r from './img/ru/main_sel_r.png';
import mi_highlight_r from './img/ru/mi_highlight_r.png'; import mi_taskbar_r from './img/ru/mi_taskbar_r.png'; import mi_sel_r from './img/ru/mi_sel_r.png';
import socials_highlight_r from './img/ru/socials_highlight_r.png'; import socials_r from './img/ru/socials_r.png'; import socials_sel_r from './img/ru/socials_sel_r.png';
import logo_X_sel_r from './img/ru/logo_X_sel.png'; import logo_X_sel_unhighlight_r from './img/ru/logo_X_sel_unhighlight.png';
// sounds
import navigate from './snd/navigate.mp3'; import glassbreak from './snd/glassbreak.mp3';

export default function ImageGallery() {
	
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  
const [currentTime, setCurrentTime] = useState("");

// clock
React.useEffect(() => {
  const updateClock = () => {
    const now = new Date();
    
    // extracts utc and makes it gmt+5
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const gmtPlus5Time = new Date(utcTime + (3600000 * 5)); // 5 hours in milliseconds
    
    const hours = gmtPlus5Time.getHours().toString().padStart(2, '0');
    const minutes = gmtPlus5Time.getMinutes().toString().padStart(2, '0');
    
    setCurrentTime(hours + ':' + minutes);
  };

  updateClock();
  const timer = setInterval(updateClock, 1000); // refresh every second
  return () => clearInterval(timer);
}, []);

  
  const [isHovered, setIsHovered] = useState(false);
  const [hovers, setHovers] = useState({ main: false, info: false, music: false, socials: false });
  const [isHoveringX, setIsHoveringX] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [activePage, setActivePage] = useState("main");
  const [selectedTab, setSelectedTab] = useState("main");
  const [isLeaving, setIsLeaving] = useState(false);
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);
  const [isFlagHovered, setIsFlagHovered] = useState(false);
  const [startBtnImg, setStartBtnImg] = useState(start);
  const [currentLogo, setCurrentLogo] = useState(logo);
  const [isUsFlagHovered, setIsUsFlagHovered] = useState(false);
  const [titlePage, setTitlePage] = useState("main");
  const [isHoveringLogoX, setIsHoveringLogoX] = useState(false);
const [showClickAlert, setShowClickAlert] = useState(false);
const [alertOpacity, setAlertOpacity] = useState(0);
const [isCooldownActive, setIsCooldownActive] = useState(false);

  

  // 🌟 1. Safe variable declaration (Placed AFTER state is created!)
  const isRu = startBtnImg === start_r;

  // 🌟 2. The Tab Namer Hook (Safely tracking your changes!)
  React.useEffect(() => {
    const titles = isRu 
      ? { main: 'главная страница', info: 'инфа', music: 'любимые песни', socials: 'соц. сети' }
      : { main: 'main page', info: 'info', music: 'fav songs', socials: 'socials' };
    
    document.title = titles[activePage] || 'flushys-website';
  }, [activePage, isRu]);

  const switchPage = (t) => {
    // 🚀 Instantly blocks layout and sound execution spam
    if (t !== selectedTab) {
      new Audio(navigate).play().catch(() => {});
      
      setSelectedTab(t);
      if (["main", "info", "music", "socials"].includes(activePage)) {
        setIsLeaving(true); 
        setTimeout(() => { setActivePage(t); setIsLeaving(false); }, 500);
      } else { 
        setActivePage(t); 
      }
    }
  };

  const bSt = { height: '30px', cursor: 'pointer', backgroundSize: '100% 100%', backgroundColor: 'transparent', flexShrink: 0, display: 'block' };
  const txSt = { marginTop: '20px', color: '#fff', fontSize: '24px', backgroundColor: 'rgba(0,0,0,0.15)', padding: '10px 20px', borderRadius: '6px', backdropFilter: 'blur(2px)', pointerEvents: 'auto', textShadow: '2px 2px 0px #000', textAlign: 'center' };
  const cls = isLeaving ? "logo-exit" : "logo-enter", txtCls = isLeaving ? "text-exit" : "text-enter";

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '30px', zIndex: 1, backgroundImage: `url(${taskbar})`, backgroundSize: '100% 100%', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '30px', zIndex: 9999, display: 'flex', justifyContent: 'space-between', overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', flexShrink: 0, pointerEvents: 'auto', position: 'relative', zIndex: 10, height: '30px' }}>
          <div style={{ ...bSt, width: '106px', backgroundImage: 'url(' + (isHovered ? (startBtnImg === start_r ? start_sel_r : start_sel) : startBtnImg) + ')' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => { new Audio(warning).play(); setShowStartMenu(!showStartMenu); }} />
        </div>
        <div style={{ display: 'flex', flexGrow: 1, overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none', pointerEvents: 'auto', height: '30px', position: 'relative', zIndex: 1, marginLeft: '-14px', paddingLeft: '14px' }}>
          {[["main", main, main_highlight, main_sel, main_r, main_highlight_r, main_sel_r], ["info", info, info_highlight, info_sel, mi_taskbar_r, mi_highlight_r, mi_sel_r], ["music", fav, fav_highlight, fav_sel, fav_taskbar_r, fav_highlight_r, fav_sel_r], ["socials", socials, socials_highlight, socials_sel, socials_r, socials_highlight_r, socials_sel_r]].map(([p, n, h, s, nr, hr, sr]) => (<div key={p} style={{ ...bSt, width: '160px', backgroundImage: 'url(' + (showStartMenu ? (startBtnImg === start_r ? nr : n) : (selectedTab === p ? (startBtnImg === start_r ? sr : s) : (hovers[p] ? (startBtnImg === start_r ? hr : h) : (startBtnImg === start_r ? nr : n)))) + ')', cursor: showStartMenu ? "pointer" : (selectedTab === p ? "default" : "pointer") }} onMouseEnter={() => setHovers(v => ({ ...v, [p]: true }))} onMouseLeave={() => setHovers(v => ({ ...v, [p]: false }))} onClick={() => !showStartMenu && switchPage(p)} />))}
        </div>

        {/* time on the top right */}
        <div style={{ display: 'flex', flexShrink: 0, pointerEvents: 'auto', position: 'relative', zIndex: 10, height: '30px' }}>
          <div style={{ 
            width: '129px', 
            height: '30px', 
            backgroundSize: '100% 100%', 
            backgroundImage: `url(${time})`,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              right: '3px',
              top: '0px',
              width: '64px',
              height: '30px',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span className="xp-clock-text">
                {currentTime}
              </span>
            </div>
          </div>
        </div>

      </div>


      {showStartMenu && (
        <div onClick={() => setShowStartMenu(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 8000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block', pointerEvents: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <img src={isHoveringX ? (startBtnImg === start_r ? error_X_r : error_X_highlight) : (startBtnImg === start_r ? error_r : error)} alt="Alert" style={{ maxWidth: '90vw', maxHeight: '90vh', display: 'block' }} />
            
            {/* X button zone */}
            <div 
              onMouseEnter={() => setIsHoveringX(true)} 
              onMouseLeave={() => setIsHoveringX(false)} 
              onClick={() => setShowStartMenu(false)} 
              style={startBtnImg === start_r ? {
                position: 'absolute', top: '5%', right: '2.7%', width: '10%', height: '15%', cursor: 'pointer', zIndex: 10
              } : {
                position: 'absolute', top: '5%', right: '2.7%', width: '10%', height: '15%', cursor: 'pointer', zIndex: 10
              }} 
            />
            
            {/* OK button zone */}
            <div 
              onClick={() => setShowStartMenu(false)} 
              style={startBtnImg === start_r ? {
                position: 'absolute', bottom: '12%', left: '33%', width: '36%', height: '17%', cursor: 'pointer', zIndex: 10
              } : {
                position: 'absolute', bottom: '12%', left: '31%', width: '38%', height: '17%', cursor: 'pointer', zIndex: 10
              }} 
            />
          </div>
        </div>
      )}

      {/* main page */}
      {activePage === "main" && (
        <div style={{ position: 'fixed', top: '-20px', left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '60px', pointerEvents: 'auto', overflowY: 'auto', gap: '6px', }}>
          
          {/* logo */}
          {/* Interactive Logo Container with X Button Map */}
<div style={{ position: 'relative', display: 'inline-block' }}>
<img 
  src={(() => {
    // 1. If Start Menu is open (Window is Unhighlighted / Inactive)
    if (showStartMenu) {
      if (isHoveringLogoX) {
        return startBtnImg === start_r ? logo_X_sel_unhighlight_r : logo_X_sel_unhighlight;
      }
      return currentLogo === logo_r ? logo_unhighlight_r : logo_unhighlight;
    }
    
    // 2. If Window is Active / Highlighted
    if (isHoveringLogoX) {
      return startBtnImg === start_r ? logo_X_sel_r : logo_X_sel;
    }
    return currentLogo;
  })()} 
  alt="Logo" 
  className={cls} 
  style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} 
/>

{/* X Button Target Coordinates Mapping Zone */}
<div
  onMouseEnter={() => setIsHoveringLogoX(true)}
  onMouseLeave={() => setIsHoveringLogoX(false)}
onClick={() => {
  // COOLDOWN GATEKEEPER: If the button is on cooldown, block spam clicks instantly
  if (isCooldownActive) return;

  // 1. Activate the cooldown lock immediately
  setIsCooldownActive(true);

  // ⚡ ONLY PLAY GLASSBREAK: The old "new Audio(warning).play()" beep line has been removed from here

  // Your randomized pitch glass break audio code
  const sound = new Audio(glassbreak);
  const randomPitch = Math.random() * (3.0 - 0.2) + 0.2;
  sound.preservesPitch = false; 
  sound.playbackRate = randomPitch; 
  sound.play().catch((err) => console.log("Audio failed:", err));

  // Your full-screen visual triggers
  setAlertOpacity(1);
  setTimeout(() => {
    setAlertOpacity(0);
  }, 300);

  // 2. Automatically lift the cooldown lock after exactly 1.5 seconds (1500ms)
  setTimeout(() => {
    setIsCooldownActive(false);
  }, 1500);
}}
  style={{
    position: 'absolute',
    top: '2%', 
    right: '1.5%',
    width: '4%',
    height: '4.5%',
    cursor: 'pointer',
    zIndex: 1010,
    pointerEvents: 'auto'
  }}
/>

{/* Click Popup Animation Layer (Portaled directly to the HTML Body) */}
{createPortal(
  <img
    src={popup_img}
    alt="Popup Alert"
    style={{
      position: 'fixed',    
      top: 0,               
      left: 0,              
      width: '100vw',
      height: '100vh',
      transform: 'none',    
      pointerEvents: 'none',             
      transition: alertOpacity === 1 ? 'none' : 'opacity 1s linear, visibility 1s linear', 
      opacity: alertOpacity,             
      visibility: alertOpacity === 0 ? 'hidden' : 'visible', 
      zIndex: 999999,       // Now this z-index is relative to the entire body!
      objectFit: 'fill',
	  objectPosition: 'center',
    }}
  />,
  document.body // <-- Tells React to physically move the element outside your App layout
)}
</div>
          

          <div className={txtCls} style={txSt}>
            <div style={{ display: 'inline-flex', alignItems: 'center', margin: 0, padding: 0 }}>
              <a className="social-link ru-text" data-tooltip="русский язык" style={{ width: '64px', height: '43px', transition: 'none' }}>
                <svg xmlns="http://w3.org" viewBox="0 0 9 6" onMouseEnter={() => setIsFlagHovered(true)} onMouseLeave={() => setIsFlagHovered(false)} onClick={() => { setStartBtnImg(start_r); setCurrentLogo(logo_r); }} style={{ width: '100%', height: '100%', display: 'block', transform: isFlagHovered ? 'scale(1.25)' : 'scale(1)', transition: 'transform 0.35s ease-in-out', cursor: 'pointer' }}><rect fill="#ffffff" width="9" height="2" y="0"/><rect fill="#0039A6" width="9" height="2" y="2"/><rect fill="#D52B1E" width="9" height="2" y="4"/></svg>
              </a>
              
              <div style={{ width: '16px', flexShrink: 0 }} />
              
              <a className="social-link" data-tooltip="english" style={{ width: '64px', height: '34px', transition: 'none' }}>
                <svg xmlns="http://w3.org" viewBox="0 0 74 39" onMouseEnter={() => setIsUsFlagHovered(true)} onMouseLeave={() => setIsUsFlagHovered(false)} onClick={() => { setStartBtnImg(start); setCurrentLogo(logo); }} style={{ width: '100%', height: '100%', display: 'block', transform: isUsFlagHovered ? 'scale(1.25)' : 'scale(1)', transition: 'transform 0.35s ease-in-out', cursor: 'pointer' }}><rect width="74" height="39" fill="#b22234"/><path d="M0,3h74M0,9h74M0,15h74M0,21h74M0,27h74M0,33h74" stroke="#fff" stroke-width="3"/><rect width="32" height="21" fill="#3c3b6e"/><path d="M2,2h28M2,5h28M2,8h28M2,11h28M2,14h28M2,17h28M2,20h28" stroke="#fff" stroke-dasharray="1 3" stroke-width="1.5"/></svg>
              </a>
            </div>
          </div>
		  
		  {/* mobile text */}
          <div className={txtCls + " mobile-only"} style={txSt}>
            <b>i see youre on mobile. scroll through the tabs on top to navigate the site!</b>
          </div>

          {/* biography */}
          <div className={txtCls + (startBtnImg === start_r ? " ru-text" : "")} style={txSt}>
            {startBtnImg === start_r ? (
              <>16-летний живущий в интернете умник, увлекающийся I.T. и зависимый от инкрементальных игр<br />
			  аватарка -  <a href={pfp} target="_blank" rel="noreferrer">ваксвел из мира денди</a>; <b>оригинал <a href="https://x.com/GlitchyDaFlower/status/2085906718446215423" target="_blank" rel="noreferrer">здесь</a></b><br/><b>достижения:</b><br />топ <b>20к</b> роблокс оббиист, <b>гд</b> хардэст - forgotten metropolis, <b>gci</b> - super ultra mega loop 1, <b>eut</b> - for the worthy<br /><a href="https://docs.google.com/spreadsheets/d/1hNKy5fBAEspdHAdJAL8b2HZCkP_eO-6zkkWQ0sMLrt0/edit?usp=sharing" target="_blank" rel="noreferrer">мои прохождения в etoh</a><br/>
			  </>
            ) : (
              <>16 year old chronically online russian nerd, tech lover and incremental game addict<br />
			  pfp is <a href={pfp} target="_blank" rel="noreferrer">waxwell from dandys world</a>; <b>source is <a href="https://x.com/GlitchyDaFlower/status/2085906718446215423" target="_blank" rel="noreferrer">here</a></b> <br/>
			  <b>achievements:</b><br />top <b>20k</b> roblox obbyist, <b>gd</b> hardest - forgotten metropolis, <b>gci</b> - super ultra mega loop 1, <b>eut</b> - for the worthy<br /><a href="https://docs.google.com/spreadsheets/d/1hNKy5fBAEspdHAdJAL8b2HZCkP_eO-6zkkWQ0sMLrt0/edit?usp=sharing" target="_blank" rel="noreferrer">my etoh completions</a></>
            )}
          </div>

        </div>
      )}

      <div style={{ position: 'fixed', top: '0px', left: '20px', right: '20px', bottom: '20px', zIndex: 5000, color: "white", overflowY: 'auto', pointerEvents: 'none', paddingTop: '40px' }}>
        {activePage === "info" && (
          <div className="info-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', pointerEvents: 'auto' }}>
            <img src={showStartMenu ? (startBtnImg === start_r ? mi_unhighlight_r : mi_unhighlight) : (startBtnImg === start_r ? mi_r : mi)} alt="About" className={cls} style={{ maxWidth: '100%', objectFit: 'contain' }} />
            <div className={txtCls + (startBtnImg === start_r ? " ru-text" : "")} style={txSt}>
              {startBtnImg === start_r ? (
                <>
                  <p style={{ color: '#f38ba8', fontFamily: 'inherit' }}>• я довольно часто использовал ии для создания этого сайта, так как абсолютно НИЧЕГО не знаю о vite/react/итд. все скриншоты, которые вы видите, были сделаны мной на настоящей виртуальной машине с windows xp! <i>(только не думайте что я фанат ии)</i></p>
                  <p>• время на панели задач вверху справа — это мое <b>текущее реальное время!</b></p>
                  <p>• если вы используете vencord - включите <b>USRBG</b>, <b>Decor</b> и <b>3y3 profile encoding</b>, когда находитесь на моем профиле</p>
                  <p>• мои любимые игры — <a href="https://www.roblox.com/games/9292879820/Grass-Cutting-Incremental" target="_blank" rel="noreferrer">gci</a>, <a href="https://www.roblox.com/games/119011107416066/Tower-Game" target="_blank" rel="noreferrer">tower game</a> и <a href="https://www.roblox.com/games/15873244701/The-Eternal-Abyss" target="_blank" rel="noreferrer">tea</a> <i>(все они на роблоксе)</i></p>
                  <p>• мой любимый цвет — <span style={{ color: '#cba6f7', fontFamily: 'inherit', fontSize: 'inherit' }}>фиолетовый</span></p>
                  <p>• я ленивый перфекционист. меня вдохновляет что-то, из-за чего мне хочется над чем-то поработать, но когда я начинаю, я легко сдаюсь и мне это не нравится</p>
				  <p>• <b>не закрывай окно с логотипом на первой странице, вроде что-то плохое произойдёт</b></p>
                </>
              ) : (
                <>
                  <p style={{ color: '#f38ba8', fontFamily: 'inherit' }}>• i used ai quite a bit to make this website, since i dont know ANYTHING about vite/react/etc. all of the screenshots you see were made by me on a real windows xp virtual machine! <i>(though please dont think that im an ai bro)</i></p>
                  <p>• the time on the taskbar on the top right is my <b>current real time!</b></p>
                  <p>• if you use vencord - use <b>USRBG</b>, <b>Decor</b> and <b>3y3 profile encoding</b> when being on my profile</p>
                  <p>• my favorite games are <a href="https://www.roblox.com/games/9292879820/Grass-Cutting-Incremental" target="_blank" rel="noreferrer">gci</a>, <a href="https://www.roblox.com/games/119011107416066/Tower-Game" target="_blank" rel="noreferrer">tower game</a> & <a href="https://www.roblox.com/games/15873244701/The-Eternal-Abyss" target="_blank" rel="noreferrer">tea</a> <i>(all of them are on roblox)</i></p>
                  <p>• my favorite color is <span style={{ color: '#cba6f7', fontFamily: 'inherit', fontSize: 'inherit' }}>purple</span></p>
                  <p>• im a lazy perfectionist. sometimes i want to work on something, but when i do i give up easily</p>
				  <p>• <b>dont close the logo on the main page, i've heard something bad happens when you do that</b></p>
                </>
              )}
            </div>
          </div>
        )}
		  
        {activePage === "music" && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', pointerEvents: 'auto' }}>
            <img src={showStartMenu ? (startBtnImg === start_r ? fav_unhighlight_r : fs_unhighlight) : (startBtnImg === start_r ? fav_r : fs)} alt="Tracks" className={cls} style={{ maxWidth: '100%', objectFit: 'contain' }} />
            <div className={txtCls + (startBtnImg === start_r ? " ru-text" : "")} style={txSt}>
              {startBtnImg === start_r ? (
                <>
                  <p>мне оч нравится atmospheric dnb/breakcore (я хз) | <b>последнее обновление: 10.08.2026 (ДД.ММ.ГГГГ)</b></p>
                  <p>• cynthoni - <a href="https://www.youtube.com/watch?v=V7aatTu-WdM" target="_blank" rel="noreferrer">dancing dots</a> и <a href="https://www.youtube.com/watch?v=EtMD50c0wh0" target="_blank" rel="noreferrer">enshittification</a></p>
				  <p>• usedcvnt - <a href="https://www.youtube.com/watch?v=UBYKjhdO2mk" target="_blank" rel="noreferrer">it's 2am, i can't sleep</a></p>
				  <p>• yax03 - <a href="https://www.youtube.com/watch?v=SI2FtGanh6w" target="_blank" rel="noreferrer">down</a></p>
				  <p>• waqs - <a href="https://www.youtube.com/watch?v=3rvgIQxOIaQ" target="_blank" rel="noreferrer">readth</a></p>
                  <br />
                  <p>мне также нравится спокойная музыка:</p>
                  <p>• us golf 95 - <a href="https://www.youtube.com/watch?v=ffU10HOlJGY" target="_blank" rel="noreferrer">broadcast</a></p>
                  <p>• windows96 - <a href="https://windows96.bandcamp.com/album/how-to-see-through-walls" target="_blank" rel="noreferrer">near death experience, spirals, new midsts acid,</a> <a href="https://windows96.bandcamp.com/album/empty-hiding-world" target="_blank" rel="noreferrer">the fool</a></p>
                </>
              ) : (
                <>
                  <p>i enjoy atmospheric dnb/breakcore (idk) | <b>last updated: 10.08.2026 (DD.MM.YYYY)</b></p>
                  <p>• cynthoni - <a href="https://www.youtube.com/watch?v=V7aatTu-WdM" target="_blank" rel="noreferrer">dancing dots</a> & <a href="https://www.youtube.com/watch?v=EtMD50c0wh0" target="_blank" rel="noreferrer">enshittification</a></p>
				  <p>• usedcvnt - <a href="https://www.youtube.com/watch?v=UBYKjhdO2mk" target="_blank" rel="noreferrer">it's 2am, i can't sleep</a></p>
				  <p>• yax03 - <a href="https://www.youtube.com/watch?v=SI2FtGanh6w" target="_blank" rel="noreferrer">down</a></p>
				  <p>• waqs - <a href="https://www.youtube.com/watch?v=3rvgIQxOIaQ" target="_blank" rel="noreferrer">readth</a></p>
                  <br />
                  <p>i also enjoy calm music:</p>
                  <p>• us golf 95 - <a href="https://www.youtube.com/watch?v=ffU10HOlJGY" target="_blank" rel="noreferrer">broadcast</a></p>
                  <p>• windows96 - <a href="https://windows96.bandcamp.com/album/how-to-see-through-walls" target="_blank" rel="noreferrer">near death experience, spirals, new midsts acid,</a> <a href="https://windows96.bandcamp.com/album/empty-hiding-world" target="_blank" rel="noreferrer">the fool</a></p>
                </>
              )}
            </div>
          </div>
        )}

        {activePage === "socials" && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', pointerEvents: 'auto', marginTop: '10px' }}>
            <img src={showStartMenu ? (startBtnImg === start_r ? socials_unhighlight_r : socials_unhighlight) : (startBtnImg === start_r ? socials_paint_r : socials_paint)} alt="Tracks" className={cls} style={{ maxWidth: '100%', objectFit: 'contain' }} />
            <div className={txtCls + (startBtnImg === start_r ? " ru-text" : "")} style={txSt}>
              {startBtnImg === start_r ? (
                <p style={{ paddingBottom: '5px', margin: 0 }}>если я вас не знаю, то скорее всего <b>я вам не отвечу</b> <i style={{ fontSize: '14px' }}>(хотя кто знает)</i></p>
              ) : (
                <p style={{ paddingBottom: '5px', margin: 0 }}>if i dont know you, chances are that <b>i probably wont respond to you</b> <i style={{ fontSize: '14px' }}>(but who knows)</i></p>
              )}
              
  
<div style={{ display: 'flex', gap: '45px', justifyContent: 'center', paddingTop: '10px' }}>
  
{/* discord */}
<div 
  className="social-link" 
  data-tooltip="@flush3r"
  onMouseEnter={() => setIsDiscordHovered(true)}
  onMouseLeave={() => setIsDiscordHovered(false)}
  style={{
    width: '40px',
    height: '40px',
    display: 'inline-block',
    position: 'relative'
  }}
>
  <svg 
    viewBox="0 0 24 24" 
    style={{ 
      width: '100%', 
      height: '100%', 
      fill: isDiscordHovered ? '#cba6f7' : '#fff', 
      filter: 'drop-shadow(2px 2px 0px #000000)',
      transform: isDiscordHovered ? 'scale(1.5)' : 'scale(1)',
      transition: 'transform 0.35s ease-in-out, fill 0.35s ease-in-out'
    }}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
</div>

  {/* twitter */}
  <a href="https://twitter.com/@flushrrr" target="_blank" rel="noreferrer" className="social-link" data-tooltip="@flushrrr">
    <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: '#fff', filter: 'drop-shadow(2px 2px 0px #000000)' }}>
      <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z"/>
    </svg>
  </a>

  {/* youtube */}
  <a href="https://youtube.com/@flush3rt" target="_blank" rel="noreferrer" className="social-link" style={{ marginLeft: '0px' }} data-tooltip="@flush3rt">
    <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', fill: '#fff', filter: 'drop-shadow(2px 2px 0px #000000)' }}>
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </a>

</div>


            </div>
          </div>
        )}

      </div>
    </>
  );
}