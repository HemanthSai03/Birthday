import React, { useState, useRef } from 'react';
import './App.css';



function App() {
  const [phase, setPhase] = useState('hero'); // hero, slider, celebrate, letter, cake_celebration
  const [celebStep, setCelebStep] = useState(0); // 0: initial, 1: lights, 2: music, 3: balloons
  const [cakeStep, setCakeStep] = useState(0);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [tripChoice, setTripChoice] = useState('');
  const [appRating, setAppRating] = useState(100);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [showLock, setShowLock] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const audioRef = useRef(null);

  const handleCelebAction = () => {
    if (celebStep === 0) {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log(e));
      }
      setCelebStep(0.5); // Fireworks playing, waiting...
      setTimeout(() => {
        setCelebStep(1); // Show Balloons button
      }, 5500);
    } else if (celebStep === 1) {
      setCelebStep(2); // Balloons
    } else if (celebStep === 2) {
      setPhase('letter');
      setTimeout(() => {
        setIsCurtainOpen(true);
      }, 500);
    }
  };

  const renderBalloons = () => {
    if (celebStep < 2) return null;
    return (
      <div className="balloons-container">
        {[...Array(15)].map((_, i) => {
          const colors = ['#D4AF37', '#C87961', '#E8C396', '#B86B5D', '#EAE6D5', '#F6F4E8', '#B89B72'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div key={i} className="floating-balloon" style={{
              left: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              backgroundColor: randomColor
            }}></div>
          )
        })}
      </div>
    );
  };

  const renderFireworks = () => {
    if (celebStep < 0.5 || phase !== 'celebrate') return null;
    return (
      <div className="fireworks-container">
        <div className="rocket rocket-1"></div>
        <div className="rocket rocket-2"></div>
        <div className="rocket rocket-3"></div>

        {/* Explosion Sparks */}
        {[...Array(15)].map((_, i) => (
          <div key={`s1-${i}`} className="spark" style={{
            '--tx': `${(Math.random() - 0.5) * 250}px`,
            '--ty': `${(Math.random() - 0.5) * 250}px`,
            left: '25%', top: '35%',
            animationDelay: '1.4s'
          }}></div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`s2-${i}`} className="spark" style={{
            '--tx': `${(Math.random() - 0.5) * 300}px`,
            '--ty': `${(Math.random() - 0.5) * 300}px`,
            left: '50%', top: '35%',
            animationDelay: '2.0s'
          }}></div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div key={`s3-${i}`} className="spark" style={{
            '--tx': `${(Math.random() - 0.5) * 250}px`,
            '--ty': `${(Math.random() - 0.5) * 250}px`,
            left: '75%', top: '35%',
            animationDelay: '2.1s'
          }}></div>
        ))}

        <div className="ignited-name">
          <h1 style={{ margin: 0 }}>
            <span className="ignited-hb">Happy Birthday</span>
            <br />
            <span className="ignited-jashu">JASHU</span>
          </h1>
          <div className="hanging-photos-container">
            <div className="hanging-photo photo-1">
              <div className="thread"></div>
              <div className="pin"></div>
              <img src="/jashu.jpg" alt="Jashu 1" className="jashu-image-frame" />
            </div>
            <div className="hanging-photo photo-2">
              <div className="thread"></div>
              <div className="pin"></div>
              <img src="/jashu2.jpg" alt="Jashu 2" className="jashu-image-frame" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`app-container phase-${phase} celeb-${celebStep}`}>
      {/* Background elements */}
      <div className="starfield"></div>
      {renderFireworks()}
      {renderBalloons()}

      {/* Audio */}
      <audio id="birthday-audio" loop ref={audioRef}>
        <source src="/song/Jhol Ringtone Download Female Voice.mp3" type="audio/mpeg" />
      </audio>

      {/* Main Content Area */}
      <div className="content-wrapper">

        {/* HERO PHASE */}
        {phase === 'hero' && (
          <div className="view-section fade-in">
            <div className="hero-text-container">
              <h1 className="glowing-title">Happy Birthday, <br /><span>My Love</span></h1>
              <p className="subtitle">A Cinematic Journey Created Just For You</p>
            </div>
            <button className="elegant-btn mt-10" onClick={() => setPhase('slider')}>
              Open Your Gift
            </button>
          </div>
        )}

        {/* CINEMATIC TEXT SEQUENCE PHASE */}
        {phase === 'slider' && (
          <div className="view-section fade-in">
            <div className="cinematic-text-container">
              {!showLock ? (
                <>
                  <h2 className="cinematic-text text-1">It's Your Special Day...</h2>
                  <h2 className="cinematic-text text-2">Have a look at it Jashu...</h2>
                  <h2 className="cinematic-text text-3">Ready for your surprise?</h2>

                  <button
                    className="elegant-btn let-go-btn"
                    onClick={() => setShowLock(true)}
                  >
                    Let's Go!
                  </button>
                </>
              ) : (
                <div className="glass-card fade-in" style={{ zIndex: 20 }}>
                  <h3 style={{ color: '#33302E', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Unlock the Surprise
                  </h3>
                  <p style={{ color: '#6B655F', marginBottom: '1.5rem', fontSize: 'clamp(0.85rem, 3vw, 1rem)', fontStyle: 'italic' }}>
                    Hint: Write the code in python to get you current age
                  </p>
                  <input
                    type="text"
                    placeholder="Enter password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError('');
                    }}
                    className="password-input"
                  />
                  {passwordError && (
                    <p style={{ color: '#C87961', marginTop: '0.8rem', fontSize: '0.9rem', fontWeight: 500 }}>{passwordError}</p>
                  )}
                  <button
                    className="elegant-btn mt-8"
                    onClick={() => {
                      if (passwordInput.trim().toLowerCase() === 'print("23 years")') {
                        setPhase('celebrate');
                      } else {
                        setPasswordError('Incorrect password! Try again.');
                      }
                    }}
                  >
                    Unlock
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CELEBRATE PHASE */}
        {phase === 'celebrate' && (
          <div className="view-section fade-in">
            {celebStep !== 0.5 && (
              <div className="glass-card celebrate-card fade-in">
                <h2 className="celebrate-hint">
                  {celebStep === 0 && (
                    <span className="stage-set-text">
                      <span className="sparkle">✨</span> The Stage is Set... <span className="sparkle"></span>
                    </span>
                  )}
                  {celebStep === 1 && "Let the colors fly!"}
                  {celebStep === 2 && "Almost there..."}
                </h2>
                <button className="elegant-btn action-btn mt-8" onClick={handleCelebAction}>
                  {celebStep === 0 && "💡 Turn On Lights"}
                  {celebStep === 1 && "🎈 Fly Balloons"}
                  {celebStep === 2 && "✨ Show The Message"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* CURTAINS */}
        {phase === 'letter' && (
          <div className={`curtain-stage ${isCurtainOpen ? 'open' : ''}`}>
            <div className="curtain-panel curtain-left"></div>
            <div className="curtain-panel curtain-right"></div>
          </div>
        )}

        {/* LETTER PHASE */}
        {phase === 'letter' && (
          <div className="view-section fade-in">
            <div className="envelope-container open">
              <div className="letter-paper">
                <h2 className="letter-title">Hi dear</h2>
                <div className="letter-body">
                  <p>Happy birthday my dear Jashu papa, have a lovely life with me nana😘.. Nana I love you more more more nana like nijamgane my love on you is increasing day by day for example okappudu naku nii medha vunna love ni explain cheyagalige vadni kani eppudu there no way in this world to explain my love on you, it’s all because of you only kanna, you are really really soo good, loyal with me…</p>
                  <p className="mt-4">Mundhu niku cheppevadni gurthu vundha naku nen ante chala istam nikanna ani but eppudu naku nuv antene istam chala chala nakanna… Pakka manam Pelli cheskundham nana mii dad ni edho okati cheppi oppidham anthalopala manchi job techukunta nana 😊😊</p>
                  <p className="mt-4">Once again love you more more more, Erojuki aithey em gift plan cheyalekuna once nuv naa degara vunte pakka manchi manchi kotha kothavi plan chestha let’s celebrate in very very best way, not only on this special day yeppudu aithey nak nuv yekkuva mudhu vachesthavo appudu manchi manchiga plan chedham💃💃 Jui Jui …</p>
                  <p className="mt-4">Once again Happy birthday ra naa chitti thalli all my love is for you only</p>
                </div>
                <div className="signature">Itlu nii chinni babu(Jui Jui)</div>
                <div style={{ textAlign: 'center' }}>
                  <button className="elegant-btn mt-8" onClick={() => setPhase('cake_celebration')}>
                    Let's Celebrate 🎉
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CAKE CELEBRATION PHASE */}
        {phase === 'cake_celebration' && (
          <div className="view-section fade-in" style={{ zIndex: 60 }}>
            <div className="glass-card celebrate-card fade-in" style={{ maxWidth: '700px', width: '90%' }}>
              {cakeStep === 0 && (
                <div className="anime-convo-container fade-in">
                  <div className="thought-bubble-wrapper">
                    <div className="thought-bubble server-bubble">
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, margin: 0, fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>Hi Jashu, Many more happy returns of the day! 🎉</p>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="elegant-btn mt-4" onClick={() => setCakeStep(1)} style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', width: 'auto' }}>Next</button>
                      </div>
                    </div>
                  </div>
                  <img src="/hemanth_avatar.png" alt="Hemanth" className="full-anime-char" />
                </div>
              )}
              {cakeStep === 1 && (
                <div className="anime-convo-container fade-in">
                  <div className="thought-bubble-wrapper">
                    <div className="thought-bubble server-bubble">
                      <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, margin: 0, fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>I love you ❤️</p>
                      <div className="options-container mt-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%' }}>
                        <button className="elegant-btn" onClick={() => setCakeStep(2)} style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', flex: 1 }}>Yes</button>
                        <button className="elegant-btn outline-btn" onClick={() => setShowAccessDenied(true)} style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', flex: 1 }}>No</button>
                      </div>
                    </div>
                  </div>
                  <img src="/hemanth_avatar.png" alt="Hemanth" className="full-anime-char" />
                </div>
              )}

              {showAccessDenied && (
                <div className="access-denied-overlay fade-in">
                  <div className="glass-card error-card">
                    <h3 style={{ color: '#B86B5D', marginBottom: '1rem' }}>⚠️ ACCESS DENIED</h3>
                    <p style={{ color: '#33302E', fontWeight: 500 }}>System was detected you are already my valentine ❤️</p>
                    <button className="elegant-btn mt-4" onClick={() => setShowAccessDenied(false)} style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Close</button>
                  </div>
                </div>
              )}
              {cakeStep === 2 && (
                <div className="cake-cutting-scene fade-in">
                  <h2 className="glowing-title" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginBottom: '1.5rem' }}>
                    {isCakeCut ? "Yay! Happy Birthday! 🎉" : "Time to Make a Wish..."}
                  </h2>
                  
                  {!isCakeCut && (
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <button className="elegant-btn" onClick={() => setIsCakeCut(true)}>
                        🎂 Cut The Cake
                      </button>
                    </div>
                  )}

                  <div className="table-scene">
                    <div className="person hemanth">
                      <img src="/hemanth_avatar.png" alt="Hemanth" className="avatar-circle server-avatar" />
                      <p style={{ fontWeight: 'bold', color: '#6B655F', margin: 0 }}>Hemanth</p>
                    </div>

                    <div className="cake-table">
                      <div className={`cake-wrapper ${isCakeCut ? 'is-cut' : ''}`}>
                        {/* Tier 3 (Top) */}
                        <div className="cake-tier tier-3">
                           <div className={`candle ${isCakeCut ? 'off' : ''}`}>
                             {!isCakeCut && <div className="flame"></div>}
                           </div>
                           <div className="cake-piece piece-left"></div>
                           <div className="cake-piece piece-right"></div>
                        </div>
                        {/* Tier 2 (Middle) */}
                        <div className="cake-tier tier-2">
                           <div className="cake-piece piece-left"></div>
                           <div className="cake-piece piece-right"></div>
                        </div>
                        {/* Tier 1 (Bottom) */}
                        <div className="cake-tier tier-1">
                           <div className="cake-piece piece-left"></div>
                           <div className="cake-piece piece-right"></div>
                        </div>
                        <div className="knife"></div>
                      </div>
                      <div className="table-top"></div>
                      <div className="table-leg"></div>
                    </div>

                    <div className="person jashu">
                      <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Jocelyn&backgroundColor=ffdfbf&mouth=smile" alt="Jashu" className="avatar-circle jashu-avatar" />
                      <p style={{ fontWeight: 'bold', color: '#6B655F', margin: 0 }}>Jashu</p>
                      <div className="knife"></div>
                    </div>
                  </div>
                  {isCakeCut && (
                    <div className="fade-in mt-10">
                      <button className="elegant-btn" onClick={() => setPhase('gift')}>
                        See Your Gift 🎁
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* GIFT PHASE */}
        {phase === 'gift' && (
          <div className="view-section fade-in">
            {!isGiftOpened ? (
              <div className="gift-box-container" onClick={() => setIsGiftOpened(true)}>
                <div className="gift-box">
                  <div className="gift-box-lid"></div>
                  <div className="gift-box-body"></div>
                  <div className="gift-box-ribbon"></div>
                </div>
                <h2 className="mt-8 glowing-title" style={{ fontSize: '1.5rem' }}>Click to Open!</h2>
              </div>
            ) : (
              <div className="gift-opened-container fade-in">
                <div className="message-paper fade-in">
                  <p>Avunu jashu nenem gift ivvaledhu kadha niku inka, Okay the gift is I will marry you for sure asala vadhalanu life long yeppatiki, and I wont go to other girls matter also, I will be loyal forever and endever, eppudu kuda loyal ey le, donga umma ideas vasthai malli niku anduke cheppa..</p>
                </div>
                <button className="elegant-btn mt-10" onClick={() => setPhase('trip')}>
                  Next Step ✨
                </button>
              </div>
            )}
          </div>
        )}

        {/* TRIP PHASE */}
        {phase === 'trip' && (
          <div className="view-section fade-in">
            <div className="glass-card trip-card">
              <h2 className="letter-title" style={{ textAlign: 'center', fontSize: 'clamp(1.4rem, 5vw, 2.2rem)' }}>Where do we go to next trip?</h2>
              {!tripChoice ? (
                <div className="trip-options mt-8">
                  <button className="elegant-btn outline-btn m-2" onClick={() => setTripChoice('Kerala')}>Kerala 🌴</button>
                  <button className="elegant-btn outline-btn m-2" onClick={() => setTripChoice('Goa')}>Goa 🌊</button>
                </div>
              ) : (
                <div className="trip-result fade-in mt-8">
                  <h3 style={{ color: '#C87961' }}>{tripChoice} - Noted! ✅</h3>
                  <button className="elegant-btn mt-8" onClick={() => setPhase('rating')}>
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RATING PHASE */}
        {phase === 'rating' && (
          <div className="view-section fade-in">
            <div className="glass-card rating-card">
              <h2 className="letter-title" style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}>Rate this application</h2>
              <div className="rating-container mt-10">
                <div className="rating-value">{appRating}%</div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={appRating} 
                  onChange={(e) => setAppRating(e.target.value)}
                  className="rating-slider"
                />
                <div className="slider-labels">
                  <span>1</span>
                  <span>100</span>
                </div>
              </div>
              <button className="elegant-btn mt-10" onClick={() => setPhase('kavitha')}>
                Next 💖
              </button>
            </div>
          </div>
        )}

        {/* KAVITHA PHASE */}
        {phase === 'kavitha' && (
          <div className="view-section fade-in">
            <div className="glass-card kavitha-card">
              <h2 className="letter-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}>Chinni Kavitha For You... ❤️</h2>
              <div className="kavitha-content">
                <div className="kavitha-line fade-in" style={{ animationDelay: '0.5s' }}>
                  <p>Intlo vuntundhi Mancham 🛏️</p>
                  <p>Nuvve naa Orapancham 🌍</p>
                </div>
                <div className="kavitha-line fade-in" style={{ animationDelay: '1.5s' }}>
                  <p>kakinada lo famous kurmani</p>
                  <p>Nuvve naa life ki Rani 👑</p>
                </div>
                <div className="kavitha-line fade-in" style={{ animationDelay: '2.5s' }}>
                  <p>Rathri kuttindhi nannu Dhoma 🦟</p>
                  <p>nii paina podhu naku prema ❤️</p>
                </div>
                <div className="kavitha-line fade-in" style={{ animationDelay: '3.5s' }}>
                  <p>Garden lo vuntundhi floweruu 🌸</p>
                  <p>Nuvve naa lover-uu ❤️</p>
                </div>
                <div className="kavitha-line fade-in" style={{ animationDelay: '4.5s' }}>
                  <p>Ammailu vestharu muggu</p>
                  <p>Ninnu chusthe vastundhi naku siggu 😊</p>
                </div>
              </div>
              <button className="elegant-btn mt-10" onClick={() => setShowFinalModal(true)}>
                Finish with Love 💖
              </button>
            </div>
          </div>
        )}

        {/* FINAL MODAL SURPRISE */}
        {showFinalModal && (
          <div className="final-modal-overlay fade-in">
            <div className="final-modal-card">
              <div className="final-image-container">
                <img src="/final_couple.jpg" alt="Final Surprise" className="final-couple-img" />
              </div>
              <h2 className="glowing-title mt-8" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: '#33302E' }}>
                Happy Birthday Jashu!
              </h2>
              <p className="final-love-text">I love you forever! ❤️</p>
              <button className="elegant-btn mt-10" onClick={() => {
                setShowFinalModal(false);
                setPhase('hero');
                setCelebStep(0);
                setCakeStep(0);
                setIsCakeCut(false);
                setIsGiftOpened(false);
                setTripChoice('');
              }}>
                Close with a Smile 😊
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
