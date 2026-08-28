import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const memories = [
  {
    title: "The chaos",
    text: "Somehow our conversations always manage to go from normal to completely unhinged in approximately 0.7 seconds.",
  },
  {
    title: "The support",
    text: "You've been there for me more times than I can properly count, and I genuinely don't think I say thank you enough.",
  },
  {
    title: "The nonsense",
    text: "Our shared ability to discuss everything and absolutely nothing important deserves its own documentary.",
  },
];

function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [opened, setOpened] = useState(false);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!opened) return;

    const interval = setInterval(() => {
      const id = Date.now();

      setHearts((current) => [
        ...current.slice(-14),
        {
          id,
          left: Math.random() * 100,
          duration: 4 + Math.random() * 3,
        },
      ]);
    }, 700);

    return () => clearInterval(interval);
  }, [opened]);

  const continueToGift = () => {
    const cleanName = name.trim();

    if (!cleanName) return;

    setName(cleanName);
    setStarted(true);
  };

  const nextMemory = () => {
    setMemoryIndex((current) => (current + 1) % memories.length);
  };

  return (
    <main className="app">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          ♥
        </span>
      ))}

      <section className="hero">
        <div className="glow glow-one" />
        <div className="glow glow-two" />

        {!started ? (
          <div className="intro">
            <p className="eyebrow">a very important digital delivery</p>

            <h1>
              A little
              <br />
              <span>something.</span>
            </h1>

            <p className="subtitle">
              Before we begin...
              <br />
              who is this gift for?
            </p>

            <form
              className="name-form"
              onSubmit={(event) => {
                event.preventDefault();
                continueToGift();
              }}
            >
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name..."
                maxLength={30}
                autoComplete="off"
                aria-label="Your name"
              />

              <button type="submit" className="open-button">
                Continue ✨
              </button>
            </form>

            <p className="tiny-note">
              yes, this is important. don't overthink it.
            </p>
          </div>
        ) : !opened ? (
          <div className="intro">
            <p className="eyebrow">delivery successful ✓</p>

            <h1>
              Hey,
              <br />
              <span>{name}.</span>
            </h1>

            <p className="subtitle">
              Someone made this for you.
              <br />
              Don't judge the presentation.
            </p>

            <button className="open-button" onClick={() => setOpened(true)}>
              Open your gift ✨
            </button>

            <p className="tiny-note">
              yes, you actually have to click it
            </p>
          </div>
        ) : (
          <div className="gift-content">
            <p className="eyebrow">this one's for you ✓</p>

            <h1>
              For <span>{name}.</span>
            </h1>

            <div className="card">
              <div className="card-decoration">✦</div>

              <h2>A tiny appreciation post</h2>

              <p>
                We've probably known each other long enough for a completely
                unreasonable amount of chaos.
              </p>

              <p>
                You're kind, hilarious, chaotic, and somehow always capable of
                matching the vibe. And honestly, you've probably helped me
                through more things than you realise.
              </p>

              <p>
                So here's your extremely unnecessary but completely deserved
                digital gift.
              </p>

              <div className="signature">
                <span>from your favourite idiot</span>
                <strong>✦</strong>
              </div>
            </div>

            <div className="actions">
              <button onClick={() => setShowLetter(true)}>
                There's more 👀
              </button>

              <button className="secondary" onClick={nextMemory}>
                Random memory
              </button>
            </div>

            <div className="memory-card">
              <span>{memories[memoryIndex].title}</span>
              <p>{memories[memoryIndex].text}</p>
            </div>
          </div>
        )}
      </section>

      {showLetter && (
        <div className="modal-backdrop" onClick={() => setShowLetter(false)}>
          <div
            className="letter"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setShowLetter(false)}
              aria-label="Close"
            >
              ×
            </button>

            <p className="eyebrow">one last thing</p>

            <h2>
              To my <span>{name}</span> 😭✌🏻
            </h2>

            <p>
              I could make this extremely emotional, but then we'd both have
              to acknowledge feelings, and frankly I don't think either of us
              is prepared for that level of responsibility.
            </p>

            <p>
              Just know that I genuinely appreciate you. For the laughs, the
              chaos, the conversations, the support, and all the random
              nonsense in between.
            </p>

            <p>Stay exactly as wonderfully chaotic as you are.</p>

            <div className="letter-sign">
              {name} 😭✌🏻
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
