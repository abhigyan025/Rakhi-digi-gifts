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
    text: "Our shared ability to discuss exes, crushes, random drama and absolutely nothing important deserves its own documentary.",
  },
];

function App() {
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
          delay: Math.random() * 0.5,
        },
      ]);
    }, 700);

    return () => clearInterval(interval);
  }, [opened]);

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
            animationDelay: `${heart.delay}s`,
          }}
        >
          ♥
        </span>
      ))}

      <section className={`hero ${opened ? "opened" : ""}`}>
        <div className="glow glow-one" />
        <div className="glow glow-two" />

        {!opened ? (
          <div className="intro">
            <p className="eyebrow">a very important digital delivery</p>

            <h1>
              Hey,
              <br />
              <span>Myra.</span>
            </h1>

            <p className="subtitle">
              I made you something.
              <br />
              Don't judge the presentation.
            </p>

            <button className="open-button" onClick={() => setOpened(true)}>
              Open your gift ✨
            </button>

            <p className="tiny-note">yes, you actually have to click it</p>
          </div>
        ) : (
          <div className="gift-content">
            <p className="eyebrow">delivery successful ✓</p>

            <h1>
              For <span>Myra.</span>
            </h1>

            <div className="card">
              <div className="card-decoration">✦</div>

              <h2>A tiny appreciation post</h2>

              <p>
                We've known each other for roughly a year-ish, which is
                simultaneously not that long and somehow enough time for an
                unreasonable amount of chaos.
              </p>

              <p>
                You're kind, jolly, chaotic, and somehow always perfectly
                capable of matching the vibe. And honestly, you've supported me
                through more things than you probably realise.
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
              To my <span>Myra Dih-Dih</span> 😭✌🏻
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

            <p>
              Stay exactly as wonderfully chaotic as you are.
            </p>

            <div className="letter-sign">
              Myra Dih-Dih 😭✌🏻
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
