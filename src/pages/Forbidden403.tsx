// Forbidden403.tsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const Forbidden403: React.FC = () => {
  useEffect(() => {
    const headlight = document.querySelector('#headlight');
    const chestlight = document.querySelector('#chestlight');
    const lc = document.querySelector('.leftclaw');
    const lcrp = document.querySelector('.leftclaw-rightpincer');
    const rc = document.querySelector('.rightclaw');
    const rcrp = document.querySelector('#rightclaw-rightpincer');
    const ra = document.querySelector('#rightarm path');
    const la = document.querySelector('#leftarm path');

    if (ra && rc && rcrp && headlight && chestlight && lc && lcrp && la) {
      gsap.to(ra, {
        duration: 1,
        repeatDelay: 3,
        attr: { d: 'M169.35,172.71c20 0, 40 0, 80 0' }
      });
      gsap.to(ra, {
        delay: 1,
        duration: 1,
        attr: { d: 'M169.35,172.71c0 0, 60 30, 55 -30' }
      });
      gsap.to(rc, {
        duration: 2,
        attr: { transform: 'rotate(-190, 207, 180) rotate(-20, 40, 80) translate(-60, 30)' }
      });
      gsap.to(rcrp, {
        delay: 2,
        duration: 0.25,
        repeat: -1,
        yoyo: true,
        attr: { transform: 'rotate(-20, 86.3, 21.38)' }
      });
      gsap.to(headlight, {
        duration: 1,
        repeat: -1,
        yoyo: true,
        attr: { fill: '#ff0000' }
      });
      gsap.to(chestlight, {
        duration: 1,
        repeat: -1,
        yoyo: true,
        attr: { fill: '#ff0000' }
      });
      gsap.to(lc, {
        duration: 2,
        attr: { transform: 'rotate(-190, 207, 180) rotate(-20, 40, 80) translate(-60, 30)' }
      });
      gsap.to(lcrp, {
        delay: 2,
        duration: 0.25,
        repeat: -1,
        yoyo: true,
        attr: { transform: 'rotate(20, 186.3,231.38)' }
      });
    }
  }, []);

  return (
    <div style={styles.wrapper}>
      <style>{pressStartFont + cssStyles}</style>
      <div style={styles.message}>
        <h1 style={styles.h1}>Intruder!</h1>
        <h2 style={styles.h2}>403: Forbidden</h2>
      </div>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
};

const pressStartFont = `
  @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
`;

const cssStyles = `
  body { margin: 0; padding: 0; }
  @keyframes errorBackground {
    from { background-color: #ffaaaa; }
    to { background-color: #aaaaff; }
  }
`;

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundImage: 'radial-gradient(ellipse at center, transparent 0%,#333333 100%)',
    animation: 'errorBackground linear 2s alternate infinite',
    overflow: 'hidden',
  },
  message: {
    position: 'fixed',
    top: '20px',
    padding: '5vmin',
    fontFamily: "'Press Start 2P', monospace",
    color: '#fff',
    textAlign: 'center',
    textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
  },
  h1: {
    fontSize: '10vmin',
    margin: '0 0 5vmin 0',
  },
  h2: {
    fontSize: '6vmin',
    margin: 0,
  },
};

const svgContent = `<!-- 🟡 Replace this with your actual full SVG code you already have -->`;

export default Forbidden403;
