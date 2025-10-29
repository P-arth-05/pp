import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const YuleBallPromposal = () => {
  const [section, setSection] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showMusicControl, setShowMusicControl] = useState(false);
  const [snitchPos, setSnitchPos] = useState({ x: 50, y: 50 });
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const startMusic = () => {
    if (!audioRef.current) {
      // Replace 'song.mp3' with your actual file path
      audioRef.current = new Audio('/song.mp3');
      audioRef.current.loop = true;
    }
    audioRef.current.play();
    setMusicPlaying(true);
    setShowMusicControl(true);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    }
  };

  const moveSnitchAway = () => {
    const newX = Math.random() * 80 + 10;
    const newY = Math.random() * 80 + 10;
    setSnitchPos({ x: newX, y: newY });
  };



  // Enhanced Confetti effect
  useEffect(() => {
    if (section === 7 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const confetti = [];
      const confettiCount = 400; // Increased from 150
      const colors = ['#FFD700', '#FFA500', '#FF6347', '#98FB98', '#87CEEB', '#C39A1C', '#641E1E', '#EFEEE9'];

      for (let i = 0; i < confettiCount; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 6 + 3, // Increased size
          d: Math.random() * confettiCount,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10 - 10,
          tiltAngleIncremental: Math.random() * 0.07 + 0.05,
          tiltAngle: 0,
          shape: Math.random() > 0.5 ? 'rect' : 'circle' // Added shapes
        });
      }

      let animationId;
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((c, i) => {
          ctx.save();
          ctx.translate(c.x + c.tilt, c.y + c.tilt);
          ctx.rotate(c.tiltAngle);
          
          if (c.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, c.r, 0, Math.PI * 2);
            ctx.fillStyle = c.color;
            ctx.fill();
          } else {
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.r, -c.r, c.r * 2, c.r * 2);
          }
          
          ctx.restore();

          c.tiltAngle += c.tiltAngleIncremental;
          c.y += (Math.cos(c.d) + 4 + c.r / 2) / 2; // Increased fall speed
          c.x += Math.sin(c.d) * 1.5; // Added horizontal drift
          c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;

          if (c.y > canvas.height) {
            confetti[i] = {
              x: Math.random() * canvas.width,
              y: -20,
              r: Math.random() * 6 + 3,
              d: Math.random() * confettiCount,
              color: colors[Math.floor(Math.random() * colors.length)],
              tilt: Math.random() * 10 - 10,
              tiltAngleIncremental: Math.random() * 0.07 + 0.05,
              tiltAngle: 0,
              shape: Math.random() > 0.5 ? 'rect' : 'circle'
            };
          }
        });

        animationId = requestAnimationFrame(draw);
      };

      draw();
      return () => cancelAnimationFrame(animationId);
    }
  }, [section]);

  // Section 1: Owl Post with custom animation
  useEffect(() => {
    if (section === 1) {
      const timer = setTimeout(() => {
        setSection(1.5);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [section]);

  const OwlPost = () => (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#091820' }}>
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              backgroundColor: '#EFEEE9',
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Owl flying from right to left */}
        <div className="absolute animate-owl-fly">
          <img 
            src="owl.png" 
            alt="Owl" 
            className="w-33 h-33 object-contain"
            style={{ filter: 'drop-shadow(0 0 20px rgba(239, 238, 233, 0.3))' }}
          />
        </div>
        {/* Letter spinning and enlarging */}
        <div className="absolute animate-letter-appear">
          <img 
            src="letter.png" 
            alt="Letter" 
            className="w-25 h-25 object-contain"
          />
        </div>
      </div>
      <style>{`
        @keyframes owl-fly {
          0% { transform: translateX(100vw); opacity: 1; }
          50% { transform: translateX(-20vw); opacity: 1; }
          100% { transform: translateX(-100vw); opacity: 0; }
        }
        @keyframes letter-appear {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          40% { transform: scale(0) rotate(0deg); opacity: 0; }
          60% { transform: scale(0.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 1; }
        }
        .animate-owl-fly {
          animation: owl-fly 3s ease-in-out forwards;
        }
        .animate-letter-appear {
          animation: letter-appear 4s ease-out forwards;
        }
        
      `}</style>
    </div>
  );

  // Section 1.5: Fullscreen Transition Video
  const TransitionVideo = () => (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: '#000' }}>
      <video
        src="/transition-video.mp4" // <-- **** REPLACE THIS WITH YOUR VIDEO PATH ****
        autoPlay
        muted // Muted is required for autoplay in most browsers
        className="min-h-screen w-full object-cover"
        onEnded={() => {
          setSection(2); // Go to Section 2 when video finishes
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
  // Section 2: Acceptance Letter
  const AcceptanceLetter = () => (
    <div 
      className="min-h-screen flex flex-col items-center justify-end p-8" 
      style={{ backgroundImage: 'url("/letter-bg.png")' }}
    >
      {/* Changes made to the className:
        1. Added `flex-col`: This makes the main flex axis vertical.
        2. `items-center` now handles *horizontal* centering.
        3. Changed `justify-center` to `justify-end`: This pushes the content to the *bottom* of the vertical axis.
      */}

      <div className="max-w-2xl w-full p-12 rounded relative" style={{}}>
        {/* ... (Your h1 and button code remains exactly the same) ... */}
        <h1 className="text-5xl font-serif text-center mb-8 italic" style={{ color: '#FFFFFF' }}>
          An urgent letter has arrived for you.
        </h1>
        <div className="text-center">
          <button
            onClick={() => {
              setSection(3);
              startMusic();
            }}
            className="px-8 py-4 rounded-full text-xl font-serif hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#641E1E', color: '#EFEEE9' }}
          >
            Unseal the Letter
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-down {
          from {
            transform: translateY(200%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 1s ease-out forwards;
        }
      `}</style>
    </div>
  );

  // Section 3: Music Trivia (replacing lyric challenge)
  const MusicTrivia = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [showWrong, setShowWrong] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);

    // Replace these with your actual music trivia questions
    const questions = [
      {
        question: "We start easy here, what song is this? 'tujhse mera deen dharam hai, mujhse teri khudaai'",
        options: ["Yeh tune kya kiya", "Mera yaar", "Bulleya", "Tum hi ho"],
        correct: 2
      },
      {
        question: "Pattharan de vich jeeven phool ugde - now sing the rest of the lyrics to this song",
        options: ["Wrong", "Approved", "Dissapointed", "ok bye"],
        correct: 1
      },
      {
        question: "What's the title of this song? '☀️ ➡️ ♨️ 🌕 ➡️ 🔥'",
        options: ["Jia Jale Jaan Jale", "Yeh Chand Sa Roshan Chehra", "Chand Sifarish", "Suraj hua maddham"],
        correct: 3
      }
    ];

    const handleAnswer = (idx) => {
      if (idx === questions[currentQ].correct) {
        setShowCorrect(true);
        setTimeout(() => {
          setShowCorrect(false);
          if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
          } else {
            setSection(4);
          }
        }, 1500);
      } else {
        setShowWrong(true);
        setTimeout(() => setShowWrong(false), 1500);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: '#091820' }}>
        {showMusicControl && (
          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 p-3 rounded-full hover:opacity-80 transition-all z-50"
            style={{ backgroundColor: '#641E1E', color: '#EFEEE9' }}
          >
            {musicPlaying ? <Volume2 /> : <VolumeX />}
          </button>
        )}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl animate-pulse"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                color: '#EFEEE9'
              }}
            >
              ⭐
            </div>
          ))}
        </div>
        
        {showWrong && (
          <div className="fixed inset-0 flex items-center justify-center z-50 animate-pulse">
            <h1 className="text-9xl font-bold" style={{ color: '#dc2626', textShadow: '0 0 30px rgba(220, 38, 38, 0.8)' }}>
              HAWWWW
            </h1>
          </div>
        )}
        
        {showCorrect && (
          <div className="fixed inset-0 flex items-center justify-center z-50 animate-pulse">
            <h1 className="text-8xl font-bold" style={{ color: '#22c55e', textShadow: '0 0 30px rgba(34, 197, 94, 0.8)' }}>
              YAAYAYYYAYY
            </h1>
          </div>
        )}
        
        <div className="max-w-3xl text-center z-10">
          <h1 className="text-5xl font-serif mb-6" style={{ color: '#717679' }}>
            Musical Memories - Question {currentQ + 1} of {questions.length}
          </h1>
          <div className="p-8 rounded-lg mb-8" style={{ backgroundColor: 'rgba(100, 30, 30, 0.3)' }}>
            <p className="text-3xl font-serif" style={{ color: '#EFEEE9' }}>
              {questions[currentQ].question}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {questions[currentQ].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="py-4 px-6 rounded-full text-xl font-serif transition-all hover:opacity-80"
                style={{
                  backgroundColor: '#641E1E',
                  color: '#EFEEE9'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Section 4: Train Journey (Updated Marauder's Map)
  const TrainJourney = () => (
    <div className="min-h-screen p-8 relative overflow-hidden" style={{ backgroundColor: '#091820' }}>
      {showMusicControl && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 p-3 rounded-full hover:opacity-80 transition-all z-50"
          style={{ backgroundColor: '#641E1E', color: '#EFEEE9' }}
        >
          {musicPlaying ? <Volume2 /> : <VolumeX />}
        </button>
      )}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif text-center mb-8" style={{ color: '#717679' }}>
          Our Journey Together 
        </h1>
        <p className="text-2xl text-center mb-12 italic" style={{ color: '#EFEEE9' }}>
          ...has been more fun than any movie. It's not about the destination, it's about the person you're traveling with. And I wouldn't want to be on this journey with anyone else.
          <br></br>mujhe jo photos milti gayi aur cute lagi maine voh yahan add kar di hai aur maine end mei khud ko rok diya aur daalne se coz bohot zyada hojati  
          <br></br>"mujhe tumhare sath har jagah jana hai, chahe wo duniya ke kone ho ya tumhare dil ke kone" ~ vscode
        </p>
        
        {/* Train with photo bogeys */}
        <div className="relative py-12">
          <div className="flex items-center space-x-4 overflow-x-auto pb-8 animate-slide-in">
            {/* Engine */}
            <div className="flex-shrink-0 w-32 h-32 rounded-lg flex items-center justify-center text-6xl" style={{ backgroundColor: '#641E1E' }}>
              🚂
            </div>
            
            {/* Bogey 1 - Replace with your photos */}
            <div className="flex-shrink-0 w-64 h-64 rounded-lg border-4 overflow-hidden" style={{ borderColor: '#C39A1C', backgroundColor: '#1a2830' }}>
              <div className="w-full h-3/4 bg-gray-700 flex items-center justify-center">
                {/* Replace src with your photo */}
                <div className="text-center" style={{ color: '#717679' }}>
                  <img src="photo1.png" alt="Photo 1" className="w-full h-full object-cover" /><br/>  
                </div>
              </div>
              <div className="p-2 text-center" style={{ color: '#EFEEE9' }}>
                The Sad Suhani All Nighter
              </div>
            </div>

            {/* Bogey 2 */}
            <div className="flex-shrink-0 w-64 h-64 rounded-lg border-4 overflow-hidden" style={{ borderColor: '#C39A1C', backgroundColor: '#1a2830' }}>
              <div className="w-full h-3/4 bg-gray-700 flex items-center justify-center">
                <div className="text-center" style={{ color: '#717679' }}>
                  <img src="photo2.png" alt="Photo 2" className="w-full h-full object-cover" /><br/>
                </div>
              </div>
              <div className="p-2 text-center" style={{ color: '#EFEEE9' }}>
                The Tired Suhani All Nighter
              </div>
            </div>

            {/* Bogey 3 */}
            <div className="flex-shrink-0 w-64 h-64 rounded-lg border-4 overflow-hidden" style={{ borderColor: '#C39A1C', backgroundColor: '#1a2830' }}>
              <div className="w-full h-3/4 bg-gray-700 flex items-center justify-center">
                <div className="text-center" style={{ color: '#717679' }}>
                  <img src="photo3.png" alt="Photo 3" className="w-full h-full object-cover" /><br/>
                </div>
              </div>
              <div className="p-2 text-center" style={{ color: '#EFEEE9' }}>
                Random Night Selfie #1
              </div>
            </div>

            {/* Bogey 4 */} 
            <div className="flex-shrink-0 w-64 h-64 rounded-lg border-4 overflow-hidden" style={{ borderColor: '#C39A1C', backgroundColor: '#1a2830' }}>
              <div className="w-full h-3/4 bg-gray-700 flex items-center justify-center">
                <div className="text-center" style={{ color: '#717679' }}>
                  <img src="photo5.png" alt="Photo 5" className="w-full h-full object-cover" /><br/>  
                </div>  
              </div>  
              <div className="p-2 text-center" style={{ color: '#EFEEE9' }}>  
                Random Night Selfie #2
              </div>  
            </div> 

            {/* Bogey 5 */}
            <div className="flex-shrink-0 w-64 h-64 rounded-lg border-4 overflow-hidden" style={{ borderColor: '#C39A1C', backgroundColor: '#1a2830' }}>  
              <div className="w-full h-3/4 bg-gray-700 flex items-center justify-center">
                <div className="text-center" style={{ color: '#717679' }}>
                  <img src="photo4.png" alt="Photo 4" className="w-full h-full object-cover" /><br/>  
                </div>  
              </div>  
              <div className="p-2 text-center" style={{ color: '#EFEEE9' }}>  
                The Calm Before The Storm
              </div>  
            </div>  


            {/* Bogey 6 */}
             <div className="flex-shrink-0 w-64 h-64 rounded-lg border-4 overflow-hidden" style={{ borderColor: '#C39A1C', backgroundColor: '#1a2830' }}>
              <div className="w-full h-3/4 bg-gray-700 flex items-center justify-center">
                <div className="text-center" style={{ color: '#717679' }}>
                  <video src="video1.mp4" autoPlay loop muted className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-2 text-center" style={{ color: '#EFEEE9' }}>
                Random Night Video 
              </div>
            </div>

            {/* Bogey 7 */}
            <div className="flex-shrink-0 w-64 h-64 rounded-lg border-4 overflow-hidden" style={{ borderColor: '#C39A1C', backgroundColor: '#1a2830' }}>
              <div className="w-full h-3/4 bg-gray-700 flex items-center justify-center">
                <div className="text-center" style={{ color: '#717679' }}>
                  <video src="video2.mp4" autoPlay loop muted className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-2 text-center" style={{ color: '#EFEEE9' }}>
                A Cutie Spotted In A Cute Hoodie
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setSection(5)}
            className="px-8 py-4 rounded-full text-2xl font-serif hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#C39A1C', color: '#091820' }}
          >
            Ready for an assessment?
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );

  // Section 5: Relationship Quiz (3 questions)
  const RelationshipQuiz = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [showWrong, setShowWrong] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);

    // REPLACE THESE WITH YOUR ACTUAL RELATIONSHIP QUESTIONS
    const questions = [
      {
        question: "Where did we first meet?",
        options: ["In the amphi", "at cnd", "in D217", "in dh"],
        correct: 0
      },
      {
        question: "What do I mean by S1 S2 ?",
        options: ["Shells in an atom", "Random variables", "'Suhani starts squirming and scolding Parth'", "You clearly know what, Stop it"],
        correct: 2
      },
      {
        question: "Who is Parth's favourite actress among the following?",
        options: ["Sydney Sweeney", "Alexandra Daddario", "Genelia D'souza", "Shraddha Kapoor"],
        correct: 3
      },
      {
        question: "What's my favorite thing about you?",
        options: ["Your smile", "Your eyes", "Your kamar", "Your ass"],
        correct: 1
      },
      {
        question: "How many days did Parth wait before finally asking you out?",
        options: ["2 days", "5 days", "10 days", "15 days"],
        correct: 0
      },
      {
        question: "How many attempts did it take me to finally kiss you?",
        options: ["1", "2", "3", "4"],
        correct: 2
      },
      {
        question: "When did we go on our first date together?",
        options: ["14th june 2023", "12st July 2025", "8th July 2025", "8th June 2025"],
        correct: 2
      }
    ];

    const handleAnswer = (idx) => {
      if (idx === questions[currentQ].correct) {
        setShowCorrect(true);
        setTimeout(() => {
          setShowCorrect(false);
          if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
          } else {
            setSection(6);
          }
        }, 1500);
      } else {
        setShowWrong(true);
        setTimeout(() => setShowWrong(false), 1500);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#091820' }}>
        {showMusicControl && (
          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 p-3 rounded-full hover:opacity-80 transition-all z-50"
            style={{ backgroundColor: '#641E1E', color: '#EFEEE9' }}
          >
            {musicPlaying ? <Volume2 /> : <VolumeX />}
          </button>
        )}

        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl animate-pulse"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                color: '#EFEEE9'
              }}
            >
              ⭐
            </div>
          ))}
        </div>
        
        {showWrong && (
          <div className="fixed inset-0 flex items-center justify-center z-50 animate-pulse">
            <h1 className="text-9xl font-bold" style={{ color: '#dc2626', textShadow: '0 0 30px rgba(220, 38, 38, 0.8)' }}>
              HAWWWW
            </h1>
          </div>
        )}
        
        {showCorrect && (
          <div className="fixed inset-0 flex items-center justify-center z-50 animate-pulse">
            <h1 className="text-8xl font-bold" style={{ color: '#22c55e', textShadow: '0 0 30px rgba(34, 197, 94, 0.8)' }}>
              YAAYAYYYAYYY
            </h1>
          </div>
        )}
        
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-serif mb-6" style={{ color: '#717679' }}>
            Do You Remember? - Question {currentQ + 1} of {questions.length}
          </h1>
          <div className="p-8 rounded-lg mb-8" style={{ backgroundColor: 'rgba(100, 30, 30, 0.3)' }}>
            <p className="text-2xl font-serif" style={{ color: '#EFEEE9' }}>
              {questions[currentQ].question}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {questions[currentQ].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="py-6 px-8 rounded-full text-xl font-serif transition-all transform hover:scale-105"
                style={{
                  backgroundColor: '#641E1E',
                  color: '#EFEEE9'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Section 6: The Golden Snitch Question
  const GoldenSnitch = () => {
    const [hearts, setHearts] = useState([]);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setHearts(prev => [...prev, {
          id: Math.random(),
          x: Math.random() * 100,
          delay: Math.random() * 2
        }]);
      }, 300);
      
      return () => clearInterval(interval);
    }, []);

    return (
      <div 
        className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden " 
        style={{ 
          backgroundImage: 'url("/question-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(9, 24, 32, 0.85)' }} />
        
        {showMusicControl && (
          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 p-3 rounded-full hover:opacity-80 transition-all z-50"
            style={{ backgroundColor: '#641E1E', color: '#EFEEE9' }}
          >
            {musicPlaying ? <Volume2 /> : <VolumeX />}
          </button>
        )}
        
        {/* Floating hearts animation */}
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-6xl pointer-events-none"
            style={{
              left: `${heart.x}%`,
              bottom: '-100px',
              animation: 'float-up 6s ease-in forwards',
              animationDelay: `${heart.delay}s`,
              opacity: 0.6,
              color: '#C39A1C'
            }}
          >
            💛
          </div>
        ))}
        
        {/* Magical particles */}
        <div className="absolute inset-0 opacity-30 z-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse text-4xl"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                color: '#EFEEE9'
              }}
            >
              ✨
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl text-center z-10 relative">
          {/* Glowing title effect */}
          <div className="mb-8 relative">
            <h1 className="text-5xl font-serif italic" style={{ 
              color: '#C39A1C',
              textShadow: '0 0 20px rgba(195, 154, 28, 0.8), 0 0 40px rgba(195, 154, 28, 0.5)'
            }}>
              I've faced a thousand spells, but this is the most daunting...
            </h1>
          </div>
          
          <p className="text-3xl mb-12 italic" style={{ color: '#EFEEE9', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            Like a seeker chasing the most important prize...
          </p>
          
          {/* Main question box with glow */}
          <div 
            className="p-16 rounded-2xl mb-12 relative"
            style={{ 
              boxShadow: '0 0 50px rgba(195, 154, 28, 0.3), inset 0 0 30px rgba(0,0,0,0.5)',
              border: '2px solid #C39A1C'
            }}
          >
            <p className="text-6xl font-serif mb-12" style={{ 
              color: '#EFEEE9',
              textShadow: '0 0 15px rgba(195, 154, 28, 0.6)'
            }}>
              Will you go to the<br />
              <span style={{ color: '#C39A1C', fontSize: '4rem' }}>Yule Ball</span><br />
              (Prom) with me?
            </p>
            
            <div className="space-y-8 relative min-h-[200px]">
              {/* YES Button with pulse animation */}
              <button
                onClick={() => setSection(7)}
                className="w-full py-8 px-12 rounded-full text-4xl font-serif transition-all transform hover:scale-110 animate-pulse-slow shadow-2xl"
                style={{ 
                  backgroundColor: '#C39A1C', 
                  color: '#091820',
                  boxShadow: '0 0 30px rgba(195, 154, 28, 0.8), 0 10px 40px rgba(0,0,0,0.5)',
                  fontWeight: 'bold'
                }}
              >
                YES! 💛
              </button>
              
              {/* Uncatchable NO button */}
              <button
                onMouseEnter={moveSnitchAway}
                className="py-8 px-12 rounded-full text-4xl font-serif transition-all transform hover:scale-110 shadow-2xl"
                style={{
                  position: 'absolute',
                  left: `${snitchPos.x}%`,
                  top: `${snitchPos.y}%`,
                  backgroundColor: '#641E1E',
                  color: '#EFEEE9',
                  transition: 'all 0.3s ease',
                  opacity: 0.8
                }}
              >
                🏅 No...
              </button>
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes float-up {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-120vh) scale(1.5); opacity: 0; }
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  };

  // Section 7: Great Hall Celebration (Improved)
  const GreatHall = () => (
    <div 
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/prom.png)', // Add your prom.png here
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(9, 24, 32, 0.5)' }} />
      
      {showMusicControl && (
        <button
          onClick={toggleMusic}
          className="fixed top-4 right-4 p-3 rounded-full hover:opacity-80 transition-all z-50"
          style={{ backgroundColor: '#641E1E', color: '#EFEEE9' }}
        >
          {musicPlaying ? <Volume2 /> : <VolumeX />}
        </button>
      )}
      
      <div className="text-center z-10 max-w-4xl">
        <h1 className="text-7xl font-serif mb-8 animate-pulse" style={{ color: '#C39A1C' }}>
          100 POINTS TO HUFFLEPUFF!
        </h1>
        <p className="text-4xl font-serif mb-6" style={{ color: '#EFEEE9' }}>
          It's a date!
        </p>
        <p className="text-3xl mb-12" style={{ color: '#EFEEE9' }}>
          Get your dress robes ready for the most magical night!
        </p>
        <button
          onClick={() => setSection(8)}
          className="px-12 py-6 rounded-full text-2xl font-serif hover:opacity-90 transition-all transform hover:scale-105 shadow-2xl"
          style={{ backgroundColor: '#C39A1C', color: '#091820' }}
        >
          View Credits
        </button>
      </div>
    </div>
  );

  // Section 8: Movie Credits (NEW)
const Credits = () => {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
        {showMusicControl && (
          <button
            onClick={toggleMusic}
            className="fixed top-4 right-4 p-3 rounded-full hover:opacity-80 transition-all z-50"
            style={{ backgroundColor: '#641E1E', color: '#EFEEE9' }}
          >
            {musicPlaying ? <Volume2 /> : <VolumeX />}
          </button>
        )}
        
        <div className="credits-scroll">
          <div className="credits-content text-center">
            <div className="h-screen" />
            
            {/* Opening Title */}
            <div className="mb-32">
              <h1 className="text-8xl font-serif mb-8" style={{ color: '#C39A1C', textShadow: '0 0 30px rgba(195, 154, 28, 0.6)' }}>
                A Love Story
              </h1>
              <p className="text-3xl italic" style={{ color: '#EFEEE9', opacity: 0.8 }}>
                Presented in collaboration with fate
              </p>
            </div>

            {/* Main Cast */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>STARRING</p>
              <p className="text-6xl font-serif mb-4" style={{ color: '#EFEEE9' }}>Parth</p>
              <p className="text-3xl mb-12" style={{ color: '#C39A1C' }}>as The Hopeful Romantic</p>
              
              <p className="text-6xl font-serif mb-4 mt-16" style={{ color: '#EFEEE9' }}>Suhani</p>
              <p className="text-3xl" style={{ color: '#C39A1C' }}>as The One Who Makes Everything Magical</p>
            </div>

            {/* Extended Cast */}
            <div className="mb-24">
              <p className="text-4xl mb-12 tracking-widest" style={{ color: '#717679' }}>WITH</p>
              <p className="text-3xl mb-3" style={{ color: '#EFEEE9' }}>Parth as The Nervous Asker</p>
              <p className="text-3xl mb-3" style={{ color: '#EFEEE9' }}>Parth as The Hopeful Dreamer</p>
              <p className="text-3xl mb-3" style={{ color: '#EFEEE9' }}>Parth as The Prom Planner</p>
              <p className="text-3xl mb-3" style={{ color: '#EFEEE9' }}>Parth as The Guy Who Can't Believe This</p>
            </div>

            {/* Production Credits - MASSIVE LIST */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>PRODUCTION TEAM</p>
              
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Executive Producer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Co-Executive Producer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Producer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Co-Producer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Line Producer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Associate Producer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Direction */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>DIRECTION</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Director</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Assistant Director</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Second Unit Director</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Creative Director</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Writing */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>WRITING</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Written by</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Story by</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Screenplay by</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Script Supervisor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Dialogue Coach</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Cinematography */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>CINEMATOGRAPHY</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Director of Photography</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Camera Operator</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Steadicam Operator</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Focus Puller</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Lighting Director</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Gaffer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Best Boy</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Grip</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Art Department */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>ART DEPARTMENT</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Production Designer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Art Director</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Set Designer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Set Decorator</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Props Master</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Construction Coordinator</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Costume & Makeup */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>COSTUME & MAKEUP</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Costume Designer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Wardrobe Supervisor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Makeup Artist</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Hair Stylist</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Special Effects Makeup</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Sound Department */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>SOUND DEPARTMENT</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Sound Designer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Sound Mixer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Boom Operator</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Sound Editor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Foley Artist</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Re-Recording Mixer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Music Department */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>MUSIC</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Music Composer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Music Supervisor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Orchestrator</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Conductor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Music Editor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Post-Production */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>POST-PRODUCTION</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Film Editor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Assistant Editor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Colorist</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Visual Effects Supervisor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>VFX Coordinator</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Compositor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Rotoscope Artist</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Matte Painter</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Special Effects */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>SPECIAL EFFECTS</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Special Effects Supervisor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Pyrotechnics</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Animatronics</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Model Maker</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Stunts */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>STUNTS</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Stunt Coordinator</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Stunt Double</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Fight Choreographer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Casting */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>CASTING</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Casting Director</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Extras Casting</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Location & Transportation */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>LOCATION & TRANSPORTATION</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Location Manager</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Location Scout</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Transportation Captain</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Driver</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Catering & Craft Services */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>CATERING</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Craft Services</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Caterer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Publicity & Marketing */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>PUBLICITY & MARKETING</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Publicist</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Marketing Director</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Social Media Manager</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Poster Designer</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Trailer Editor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Legal & Finance */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>LEGAL & FINANCE</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Production Accountant</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Payroll</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Legal Counsel</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Insurance</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Additional Crew */}
            <div className="mb-24">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>ADDITIONAL CREW</p>
              <div className="space-y-8 max-w-4xl mx-auto">
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Production Assistant</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Script Supervisor</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Continuity</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Stand-In</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Video Assist</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Data Wrangler</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>DIT (Digital Imaging Technician)</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Medic</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
                <div><p className="text-2xl" style={{ color: '#C39A1C' }}>Security</p><p className="text-3xl" style={{ color: '#EFEEE9' }}>Parth</p></div>
              </div>
            </div>

            {/* Special Thanks */}
            <div className="mb-32">
              <p className="text-5xl mb-12 tracking-widest" style={{ color: '#717679' }}>SPECIAL THANKS</p>
              <div className="space-y-6 max-w-3xl mx-auto">
                <p className="text-2xl" style={{ color: '#EFEEE9' }}>J.K. Rowling for creating the magical universe</p>
                <p className="text-2xl" style={{ color: '#EFEEE9' }}>Every moment we've shared together</p>
                <p className="text-2xl" style={{ color: '#EFEEE9' }}>Every laugh, every memory, every adventure</p>
                <p className="text-2xl" style={{ color: '#EFEEE9' }}>The courage it took to ask this question</p>
                <p className="text-2xl" style={{ color: '#EFEEE9' }}>And most importantly... YOU</p>
              </div>
            </div>

            {/* Final Message */}
            <div className="mb-32">
              <p className="text-4xl mb-8 italic" style={{ color: '#717679' }}>
                "Made with love, magic, and a lot of courage"
              </p>
              <p className="text-3xl mb-4" style={{ color: '#EFEEE9' }}>
                A Parth Production
              </p>
            </div>

            {/* Grand Finale */}
            <div className="mb-32">
              <p className="text-8xl font-serif mb-12" style={{ color: '#C39A1C', textShadow: '0 0 40px rgba(195, 154, 28, 0.8)' }}>
                To Be Continued...
              </p>
              <p className="text-5xl mt-8" style={{ color: '#EFEEE9' }}>
                At Prom 2025
              </p>
              <p className="text-3xl mt-12 italic" style={{ color: '#717679' }}>
                The Adventure of a Lifetime Awaits
              </p>
            </div>

            {/* End padding */}
            <div className="h-screen" />
          </div>
        </div>
        
        <style>{`
          @keyframes scroll-credits {
            0% { transform: translateY(100vh); }
            100% { transform: translateY(-100%); }
          }
          .credits-scroll {
            height: 100vh;
            overflow: hidden;
          }
          .credits-content {
            animation: scroll-credits 90s linear infinite;
          }
        `}</style>
      </div>
    );
  }


  // Render current section
  if (section === 1) return <OwlPost />;
  if (section === 1.5) return <TransitionVideo />;
  if (section === 2) return <AcceptanceLetter />;
  if (section === 3) return <MusicTrivia />;
  if (section === 4) return <TrainJourney />;
  if (section === 5) return <RelationshipQuiz />;
  if (section === 6) return <GoldenSnitch />;
  if (section === 7) return <GreatHall />;
  if (section === 8) return <Credits />;

  return null;
};

export default YuleBallPromposal;