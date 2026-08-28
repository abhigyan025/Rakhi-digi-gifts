import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const MYRA_PHOTO =
  "https://cdn.phototourl.com/free/2026-08-28-068472b3-038b-44ff-85c6-79f21555f6b2.jpg";

const memories = [
  {
    title: "The chaos",
    text: "Somehow our conversations always manage to go from normal to completely unhinged in approximately 0.7 seconds.",
  },
  {
    title: "The support",
    text: "You've been there for me more times than I can properly count, and you've supported me through some genuinely emotional moments.",
  },
  {
    title: "The nonsense",
    text: "From exes and crushes to random gossip, roasting each other and absolute nonsense, there has genuinely never been a shortage of chaos.",
  },
];

function isMyra(name) {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, " ");

  return normalized === "myra" || normalized === "myra atul";
}

function App() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [opened, setOpened] = useState(false);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  const [hearts, setHearts] = useState([]);

  const myraMode = isMyra(name);

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

        {/* NAME ENTRY */}
        {!started && (
          <div className="intro">
            <p className="eyebrow">
              a very important digital delivery
            </p>

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
        )}

        {/* GREETING */}
        {started && !opened && (
          <div className="intro">
            <p className="eyebrow">
              delivery successful ✓
            </p>

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

            <button
              className="open-button"
              onClick={() => setOpened(true)}
            >
              Open your gift ✨
            </button>

            <p className="tiny-note">
              yes, you actually have to click it
            </p>
          </div>
        )}

        {/* MYRA */}
        {opened && myraMode && (
          <div className="gift-content">
            <p className="eyebrow">
              this one's for you ✓
            </p>

            <div className="recipient-photo">
              <img
                src={MYRA_PHOTO}
                alt="The gift recipient"
              />
            </div>

            <h1 className="recipient-title">
              For <span>Myra Dih-Dih</span>
              <br />
              <small>😋✌🏻</small>
            </h1>

            <div className="card">
              <div className="card-decoration">
                ✦
              </div>

              <h2>
                For Myra Dih-Dih 😋✌🏻
              </h2>

              <p>
                Okay, so somehow it’s already been a year-ish of
                knowing you, which is honestly both surprising and
                concerning. In that time, you’ve somehow managed to
                be chalant, kind, annoying, comforting, and an
                absolutely reliable partner in whatever random
                nonsense we happen to be discussing that day.
              </p>

              <p>
                From our completely unnecessary discussions about
                exes and crushes to random gossip, roasting each
                other, sending stupid stuff, and just talking
                absolute nonsense, there has genuinely never been a
                shortage of chaos. And somehow, that’s exactly what
                makes our friendship so fun.
              </p>

              <p>
                But jokes aside, I really do appreciate you. You’ve
                supported me through some genuinely emotional
                moments, and you’ve been there for me a hell of a lot
                more times than you probably realise. I might not
                always say it properly, because obviously being
                sincere for more than twelve seconds would destroy
                my reputation, but it actually means a lot to me.
              </p>

              <p>
                So yeah, this is basically a ridiculously elaborate
                way of saying: thank you for being you, thank you
                for putting up with me, and thank you for making the
                past year considerably more chaotic and considerably
                better.
              </p>

              <p>
                Stay annoying. Stay kind. Stay chalant. And please
                never become normal because that would be deeply
                disappointing.
              </p>

              <div className="signature">
                <span>Anyway...</span>
                <strong>✦</strong>
              </div>

              <div className="letter-sign">
                Bilautaji Ki Unofficial Malkin!!! 😋✌🏻
              </div>
            </div>

            <div className="actions">
              <button onClick={() => setShowLetter(true)}>
                There's more 👀
              </button>

              <button
                className="secondary"
                onClick={nextMemory}
              >
                Random memory
              </button>
            </div>

            <div className="memory-card">
              <span>
                {memories[memoryIndex].title}
              </span>

              <p>
                {memories[memoryIndex].text}
              </p>
            </div>
          </div>
        )}

        {/* EVERYONE ELSE */}
        {opened && !myraMode && (
          <div className="gift-content">
            <p className="eyebrow">
              oh... 💔
            </p>

            <h1>
              Aww,
              <br />
              <span>{name}.</span>
            </h1>

            <div className="card">
              <div className="card-decoration">
                ✦
              </div>

              <h2>
                Wait... 😭
              </h2>

              <p>
                Aww 💔 I'm sorry, I guess I forgot to include you
                in this one.
              </p>

              <p>
                Still, I hope you have an absolutely wonderful
                Rakhi and a day full of happiness, laughter and
                good vibes.
              </p>

              <p>
                <strong>
                  Happiest Rakhi to you! ❤️
                </strong>
              </p>

              <div className="signature">
                <span>maybe next time 😭</span>
                <strong>✦</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* EXTRA MYRA LETTER */}
      {showLetter && myraMode && (
        <div
          className="modal-backdrop"
          onClick={() => setShowLetter(false)}
        >
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

            <p className="eyebrow">
              one last thing
            </p>

            <h2>
              To my <span>Myra Dih-Dih</span> 😭✌🏻
            </h2>

            <p>
              Okay, fine. One slightly more sincere moment.
            </p>

            <p>
              I genuinely appreciate having you around. For the
              laughs, the chaos, the conversations, the support,
              and all the completely unnecessary nonsense in
              between.
            </p>

            <p>
              Now close this before this gets embarrassing. 😭
            </p>

            <div className="letter-sign">
              Myra Dih-Dih 😋✌🏻
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
