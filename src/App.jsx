import { useState, useRef } from 'react'
import './App.css'

const flowers = [
{
name: 'ROSE',
scientific: 'Rosa',
family: 'Rosaceae',
color: 'CRIMSON',
season: 'SPRING — SUMMER',
image: `${import.meta.env.BASE_URL}images/Rose_Blossom_Closeup.jpg`,
message: 'I love you.',
},
{
name: 'ORCHID',
scientific: 'Orchidaceae',
family: 'Orchidaceae',
color: 'VIOLET',
season: 'YEAR-ROUND',
image: `${import.meta.env.BASE_URL}images/Ban_Ki-Moon_Orchid_Flower.jpg`,
message: 'You are rare and refined.',
},
{
name: 'DAISY',
scientific: 'Bellis perennis',
family: 'Asteraceae',
color: 'WHITE',
season: 'SPRING — AUTUMN',
image: `${import.meta.env.BASE_URL}images/Pâquerette_(Bellis_perennis).jpg`,
message: 'My intentions are sincere.',
},
{
name: 'LOTUS',
scientific: 'Nelumbo nucifera',
family: 'Nelumbonaceae',
color: 'PALE PINK',
season: 'SUMMER',
image: `${import.meta.env.BASE_URL}images/Nelumno_nucifera_open_flower.jpg`,
message: 'Let the past be forgotten.',
},
]

function App() {
const [search, setSearch] = useState('')

const [cipherRotation, setCipherRotation] = useState(0)
const draggingCipher = useRef(false)

const startCipherDrag = (event) => {
  draggingCipher.current = true
  event.currentTarget.setPointerCapture(event.pointerId)
}

const moveCipherDrag = (event) => {
  if (!draggingCipher.current) return

  const disk = event.currentTarget.getBoundingClientRect()

  const centerX = disk.left + disk.width / 2
  const centerY = disk.top + disk.height / 2

  const angle =
    Math.atan2(event.clientY - centerY, event.clientX - centerX) *
    (180 / Math.PI)

  setCipherRotation(angle)
}

const endCipherDrag = () => {
  draggingCipher.current = false
}

const rotateCipher = (amount) => {
  setCipherRotation((current) => current + amount)
}

const filteredFlowers = flowers.filter((flower) =>
`${flower.name} ${flower.scientific} ${flower.family}`
.toLowerCase()
.includes(search.toLowerCase())
)

return ( <div className="site">

  <header className="header">

  <div className="header-left">
    <a href="#top" className="logo">221B</a>

<span className="header-divider"></span>

<span className="header-label">
  ARCHIVAL SYSTEM / 001
</span>

  </div>

  <nav className="header-nav">
    <a href="#databases">DATABASES</a>
    <a href="#archive">FLOWERS</a>
    <a href="#mrt">MRT</a>
    <a href="#cipher">CIPHER</a>
    <a href="#morse">MORSE</a>
  </nav>

  <div className="status">
    <span className="status-dot"></span>
    ARCHIVE ONLINE
  </div>

</header>


  <main>

    <section className="hero">
      <div className="hero-label">
        221B / ARCHIVAL SYSTEM
      </div>

      <h1>
        THE
        <br />
        <em>ARCHIVE.</em>
      </h1>

      <p className="hero-text">
        A collection of databases documenting objects, organisms,
        systems, symbols, and methods of communication.
      </p>

      <div className="hero-line"></div>

      <div className="hero-meta">
        <span>ARCHIVE STATUS</span>
        <strong>ACTIVE</strong>
      </div>

      <div className="hero-meta">
        <span>DATABASES</span>
        <strong>04</strong>
      </div>
    </section>

    <section className="databases" id="databases">

  <div className="section-heading">
    <span>01 / DATABASES</span>
    <span>ARCHIVE INDEX</span>
  </div>

  <div className="database-grid">

<a className="database-card" href="#archive">
  <span className="database-number">DATABASE / 001</span>

  <h2>BOTANICAL</h2>

  <p>
    Flowers, their histories, characteristics,
    symbolism, and intended messages.
  </p>

  <span className="database-status">
    ACTIVE / 004 RECORDS
  </span>

  <span className="database-arrow">↗</span>
</a>

<a className="database-card" href="#mrt">
  <span className="database-number">DATABASE / 002</span>

  <h2>SINGAPORE MRT</h2>

  <p>
    A visual archive of Singapore's Mass Rapid Transit
    network and its stations.
  </p>

  <span className="database-status">
    ACTIVE
  </span>

  <span className="database-arrow">↗</span>
</a>

<a className="database-card" href="#cipher">
  <span className="database-number">TOOL / 003</span>

  <h2>CIPHER</h2>

  <p>
    An interactive alphabet cipher disk for encoding
    and decoding messages.
  </p>

  <span className="database-status">
    ACTIVE
  </span>

  <span className="database-arrow">↗</span>
</a>

<a className="database-card" href="#morse">
  <span className="database-number">TOOL / 004</span>

  <h2>MORSE</h2>

  <p>
    A reference and conversion tool for Morse code
    and written communication.
  </p>

  <span className="database-status">
    ACTIVE
  </span>

  <span className="database-arrow">↗</span>
</a>

  </div>

</section>


    <section className="archive" id="archive">

      <div className="section-heading">
        <span>02 / BOTANICAL</span>
        <span>FIELD RECORDS</span>
      </div>

      <div className="search-box">
        <span>SEARCH /</span>

        <input
          type="text"
          placeholder="Enter flower, genus, or family..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="flower-grid">

        {filteredFlowers.map((flower, index) => (

          <article className="flower-card" key={flower.name}>

            <div className="card-number">
              RECORD / {String(index + 1).padStart(3, '0')}
            </div>

            <div className="card-main">

              <img
                className="flower-image"
                src={flower.image}
                alt={flower.name}
              />

              <div className="flower-title">
                <h2>{flower.name}</h2>
                <p className="scientific">
                  {flower.scientific}
                </p>
              </div>

              <div className="flower-message">
                <span>INTENDED MESSAGE</span>
                <p>“{flower.message}”</p>
              </div>

            </div>

            <div className="card-details">

              <div>
                <span>FAMILY</span>
                <strong>{flower.family}</strong>
              </div>

              <div>
                <span>COLOUR</span>
                <strong>{flower.color}</strong>
              </div>

              <div>
                <span>BLOOM</span>
                <strong>{flower.season}</strong>
              </div>

            </div>

            <div className="card-arrow">↗</div>

          </article>

        ))}

      </div>

    </section>

    <section className="mrt-section" id="mrt">

      <div className="section-heading">
        <span>03 / SINGAPORE MRT</span>
        <span>MAP ARCHIVE</span>
      </div>

      <div className="mrt-intro">
        <div>
          <h2>
            SINGAPORE
            <br />
            <em>RAIL NETWORK.</em>
          </h2>
        </div>

    <p>
      A visual record of Singapore's Mass Rapid Transit
      and Light Rail Transit network.
    </p>

      </div>

      <div className="map-viewer">
        <div className="map-controls">
          <button type="button" id="zoom-out">−</button>
          <span id="zoom-level">100%</span>
          <button type="button" id="zoom-in">+</button>
        </div>
        
    <div className="map-frame">
      <iframe
        src={`${import.meta.env.BASE_URL}images/mrt-map-2026.pdf`}
        title="Singapore MRT Map"
      ></iframe>
    </div>

      </div>

    </section>

      <section className="cipher-section" id="cipher">

    <div className="section-heading">
      <span>04 / CIPHER</span>
      <span>ALPHABETIC SUBSTITUTION</span>
    </div>

    <div className="cipher-intro">
      <h2>
        ALPHABET
        <br />
        <em>CIPHER.</em>
      </h2>

  <p>
    A rotating alphabet disk for manual substitution.
    Align the alphabets to construct or decipher a message.
  </p>

    </div>

    <div className="cipher-tool">

  <div className="cipher-disk">

    <div className="cipher-ring outer-ring">
      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => {
        const angle = index * (360 / 26)

        return (
          <span
            key={letter}
            style={{
              transform: `rotate(${angle}deg) translateY(-155px) rotate(-${angle}deg)`,
            }}
          >
            {letter}
          </span>
        )
      })}
    </div>

        <div
      className="cipher-ring inner-ring"
      style={{
        transform: `rotate(${cipherRotation}deg)`,
      }}
      onPointerDown={startCipherDrag}
      onPointerMove={moveCipherDrag}
      onPointerUp={endCipherDrag}
      onPointerCancel={endCipherDrag}
      role="slider"
      tabIndex="0"
      aria-label="Cipher wheel rotation"
      aria-valuenow={Math.round(cipherRotation)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          rotateCipher(-360 / 26)
        }

        if (event.key === 'ArrowRight') {
          rotateCipher(360 / 26)
        }
      }}
    >
      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => {
        const angle = index * (360 / 26)

        return (
          <span
            key={letter}
            style={{
              transform: `
                rotate(${angle}deg)
                translateY(-105px)
                rotate(-${angle + cipherRotation}deg)
              `,
            }}
          >
            {letter}
          </span>
        )
      })}
    </div>

    <div className="cipher-center">
      221B
    </div>

  </div>

  <div className="cipher-instruction">
    <span>FIELD INSTRUCTION</span>

    <p>
      Rotate the inner alphabet to establish a substitution
      between corresponding letters.
    </p>
  </div>

    </div>

  </section>

  <section className="morse-section" id="morse">

  <div className="section-heading">
    <span>05 / MORSE</span>
    <span>TELEGRAPHIC REFERENCE</span>
  </div>

  <div className="morse-intro">
    <h2>
      MORSE
      <br />
      <em>CODE.</em>
    </h2>

<p>
  A reference archive of the Morse alphabet,
  preserving the fundamental language of telegraphic communication.
</p>

  </div>

  <div className="morse-grid">
{[
  ['A', '.-'],
  ['B', '-...'],
  ['C', '-.-.'],
  ['D', '-..'],
  ['E', '.'],
  ['F', '..-.'],
  ['G', '--.'],
  ['H', '....'],
  ['I', '..'],
  ['J', '.---'],
  ['K', '-.-'],
  ['L', '.-..'],
  ['M', '--'],
  ['N', '-.'],
  ['O', '---'],
  ['P', '.--.'],
  ['Q', '--.-'],
  ['R', '.-.'],
  ['S', '...'],
  ['T', '-'],
  ['U', '..-'],
  ['V', '...-'],
  ['W', '.--'],
  ['X', '-..-'],
  ['Y', '-.--'],
  ['Z', '--..'],
].map(([letter, code]) => (
  <div className="morse-card" key={letter}>
    <span className="morse-letter">{letter}</span>
    <span className="morse-code">{code}</span>
  </div>
))}

  </div>

</section>


    <section className="about" id="about">

      <div className="section-heading">
        <span>03 / METHOD</span>
        <span>FIELD NOTES</span>
      </div>

      <div className="about-content">

        <h2>
          Nothing is
          <br />
          merely ornamental.
        </h2>

        <p>
          The archive documents the details others overlook:
          structure, history, symbolism, systems, patterns,
          and the hidden languages used to communicate.
        </p>

      </div>

    </section>

  </main>

  <footer>
    <span>221B ARCHIVE</span>
    <span>EST. 2026</span>
  </footer>

</div>

)
}

export default App
