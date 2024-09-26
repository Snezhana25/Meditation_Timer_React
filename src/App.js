import React, { useState, useEffect, useRef } from 'react';
import oceanicDepths from './assets/744116__viramiller__oceanic-depths.mp3';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const oceanAudioRef = useRef(null);

  useEffect(() => {
    if (oceanAudioRef.current) {
      if (isActive) {
        oceanAudioRef.current.play().catch(error => {
          console.error('Audio playback error:', error);
        });
      } else {
        oceanAudioRef.current.pause();
      }
    }
  }, [isActive]);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
    if (oceanAudioRef) {
      oceanAudioRef.current.pause();
      oceanAudioRef.current.currentTime = 0;
    }
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
      <div className="app container">
        <h1 className="timer-display">{seconds}s</h1>
        <div className="control">
          <button className="timer-button" onClick={toggle}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="timer-button" onClick={reset}>
            Reset
          </button>
        </div>

        <audio ref={oceanAudioRef} controls loop>
          <source src={oceanicDepths} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
  );
}

export default App;
