
import { useState, useRef } from 'react'
import './App.css'

/* =========================================
   221B ARCHIVE
   FLOWER DATABASE
========================================= */

const flowers = [
  {
    name: 'ROSE',
    scientific: 'Rosa spp.',
    family: 'Rosaceae',
    color: 'CRIMSON',
    season: 'SPRING — SUMMER',
    image: `${import.meta.env.BASE_URL}images/Rose_Blossom_Closeup.jpg`,
    message: 'I love you.',
  },
  {
    name: 'ORCHID',
    scientific: 'Phalaenopsis spp.',
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
  {
    name: 'QUEEN OF THE NIGHT',
    scientific: 'Epiphyllum oxypetalum',
    family: 'Cactaceae',
    color: 'WHITE',
    season: 'SUMMER — AUTUMN',
    image: `${import.meta.env.BASE_URL}images/Flower_Queen_Of_The_Night__Epiphyllum_Oxypetalum_.jpg`,
    message: 'Midnight hour.',
  },
  {
    name: 'CHERRY BLOSSOMS',
    scientific: 'Prunus serrulata',
    family: 'Rosaceae',
    color: 'PALE PINK',
    season: 'SPRING',
    image: `${import.meta.env.BASE_URL}images/Cherry_Blossoms_in_Helsinki_Finland_2026_02.jpg`,
    message: 'Let us meet.',
  },
  {
    name: 'GARDENIAS',
    scientific: 'Gardenia jasminoides',
    family: 'Rubiaceae',
    color: 'WHITE',
    season: 'SPRING — SUMMER',
    image: `${import.meta.env.BASE_URL}images/Gardenia_Jasminoides_Flower.jpg`,
    message: 'Garden.',
  },
  {
    name: 'NIGHT BLOOMING JASMINE',
    scientific: 'Cestrum nocturnum',
    family: 'Solanaceae',
    color: 'WHITE',
    season: 'SUMMER — AUTUMN',
    image: `${import.meta.env.BASE_URL}images/Night-blooming_jasmine_(Cestrum_nocturnum_).jpg`,
    message: 'Midnight hour.',
  },
]

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const LETTER_STEP = 360 / 26

/* =========================================
   MAIN APPLICATION
========================================= */

function App() {
  const [search, setSearch] = useState('')
  const [cipherRotation, setCipherRotation] = useState(0)

  const draggingCipher = useRef(false)
  const previousAngle = useRef(0)
  const currentRotation = useRef(0)

  /* FLOWER SEARCH */

  const filteredFlowers = flowers.filter((flower) =>
    `${flower.name} ${flower.scientific} ${flower.family}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  /* CIPHER ROTATION */

  const getPointerAngle = (event) => {
    const disk = event.currentTarget.parentElement
      .getBoundingClientRect()

    const centerX = disk.left + disk.width / 2
    const centerY = disk.top + disk.height / 2

    return Math.atan2(
      event.clientY - centerY,
      event.clientX - centerX
    ) * (180 / Math.PI)
  }

  const startCipherDrag = (event) => {
    draggingCipher.current = true

    previousAngle.current = getPointerAngle(event)

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveCipherDrag = (event) => {
    if (!draggingCipher.current) return

    const angle = getPointerAngle(event)

    let difference = angle - previousAngle.current

    // Prevent sudden rotation when crossing the 180° boundary.

    if (difference > 180) difference -= 360
    if (difference < -180) difference += 360

    previousAngle.current = angle

    currentRotation.current += difference

    setCipherRotation(currentRotation.current)
  }

  const endCipherDrag = () => {
    if (!draggingCipher.current) return

    draggingCipher.current = false

    // Snap to the nearest alphabet position.

    const snappedRotation =
      Math.round(currentRotation.current / LETTER_STEP) *
      LETTER_STEP

    currentRotation.current = snappedRotation

    setCipherRotation(snappedRotation)
  }

  return (
    <div className="site">


      {/* HEADER */}

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
          <a href="#cipher">CIPHER</a>
          <a href="#morse">MORSE</a>
        </nav>

        <div className="status">
          <span className="status-dot"></span>
          ARCHIVE ONLINE
        </div>

      </header>

      {/* MAIN CONTENT */}

      <main id="top">

        {/* HERO */}

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
            A collection of databases documenting objects,
            organisms, systems, symbols, and methods of
            communication.
          </p>

          <div className="hero-line"></div>

          <div className="hero-meta">
            <span>ARCHIVE STATUS</span>
            <strong>ACTIVE</strong>
          </div>

          <div className="hero-meta">
            <span>DATABASES</span>
            <strong>03</strong>
          </div>

        </section>

        {/* DATABASE INDEX / 01 */}

        <section className="databases" id="databases">

          <div className="section-heading">
            <span>01 / DATABASES</span>
            <span>ARCHIVE INDEX</span>
          </div>

          <div className="database-grid">

            <a className="database-card" href="#archive">

              <span className="database-number">
                DATABASE / 001
              </span>

              <h2>BOTANICAL</h2>

              <p>
                Flowers, their histories, characteristics,
                symbolism, and intended messages.
              </p>

              <span className="database-status">
                ACTIVE / 008 RECORDS
              </span>

              <span className="database-arrow">↗</span>

            </a>

            <a className="database-card" href="#cipher">

              <span className="database-number">
                TOOL / 002
              </span>

              <h2>CIPHER</h2>

              <p>
                An interactive alphabet cipher disk for
                encoding and decoding messages.
              </p>

              <span className="database-status">
                ACTIVE
              </span>

              <span className="database-arrow">↗</span>

            </a>

            <a className="database-card" href="#morse">

              <span className="database-number">
                TOOL / 003
              </span>

              <h2>MORSE</h2>

              <p>
                A reference archive of Morse code and
                written telegraphic communication.
              </p>

              <span className="database-status">
                ACTIVE / 026 LETTERS
              </span>

              <span className="database-arrow">↗</span>

            </a>

          </div>

        </section>

        {/* BOTANICAL ARCHIVE / 02 */}

        <section className="archive" id="archive">

          <div className="section-heading">
            <span>02 / BOTANICAL</span>
            <span>FIELD RECORDS / 008</span>
          </div>

          {/* SEARCH */}

          <div className="search-box">

            <span>SEARCH /</span>

            <input
              type="text"
              placeholder="Enter flower, genus, or family..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

          </div>

          {/* FLOWER RECORDS */}

          <div className="flower-grid">

            {filteredFlowers.map((flower) => {

              const recordNumber = flowers.indexOf(flower) + 1

              return (

                <article
                  className="flower-card"
                  key={flower.name}
                >

                  <div className="card-number">
                    RECORD / {String(recordNumber).padStart(3, '0')}
                  </div>

                  <div className="card-main">

                    <img
                      className="flower-image"
                      src={flower.image}
                      alt={flower.name}
                      loading="lazy"
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

              )
            })}

          </div>

          {filteredFlowers.length === 0 && (
            <p className="empty-results">
              NO RECORDS FOUND.
            </p>
          )}

        </section>


        {/* CIPHER / 03 */}

        <section className="cipher-section" id="cipher">

          <div className="section-heading">
            <span>03 / CIPHER</span>
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

              {/* OUTER ALPHABET */}

              <div className="cipher-ring outer-ring">

                {alphabet.map((letter, index) => {

                  const angle = index * LETTER_STEP

                  return (
                    <span
                      key={letter}
                      style={{
                        transform: `
                          rotate(${angle}deg)
                          translateY(calc(min(82vw, 330px) * -0.41))
                          rotate(-${angle}deg)
                        `,
                      }}
                    >
                      {letter}
                    </span>
                  )
                })}

              </div>

              {/* INNER ROTATING ALPHABET */}

              <div
                className="cipher-ring inner-ring"
                style={{
                  transform: `rotate(${cipherRotation}deg)`,
                }}
                onPointerDown={startCipherDrag}
                onPointerMove={moveCipherDrag}
                onPointerUp={endCipherDrag}
                onPointerCancel={endCipherDrag}
                onLostPointerCapture={endCipherDrag}
                role="presentation"
              >

                {alphabet.map((letter, index) => {

                  const angle = index * LETTER_STEP

                  return (
                    <span
                      key={letter}
                      style={{
                        transform: `
                          rotate(${angle}deg)
                          translateY(calc(min(82vw, 330px) * -0.28))
                          rotate(-${angle + cipherRotation}deg)
                        `,
                      }}
                    >
                      {letter}
                    </span>
                  )
                })}

              </div>

              {/* FIXED ALIGNMENT INDICATOR */}

              <div className="cipher-indicator"></div>

              {/* CENTRE */}

              <div className="cipher-center">
                221B
              </div>

            </div>

            <div className="cipher-instruction">

              <span>FIELD INSTRUCTION</span>

              <p>
                Drag the inner alphabet to establish a substitution.
                Release to automatically align the nearest letter
                with the fixed indicator.
              </p>

            </div>

          </div>

        </section>

        {/* MORSE / 04 */}

        <section className="morse-section" id="morse">

          <div className="section-heading">
            <span>04 / MORSE</span>
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
              preserving the fundamental language of
              telegraphic communication.
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

                <span className="morse-letter">
                  {letter}
                </span>

                <span className="morse-code">
                  {code}
                </span>

              </div>

            ))}

          </div>

        </section>

        {/* ABOUT / 05 */}

        <section className="about" id="about">

          <div className="section-heading">
            <span>05 / METHOD</span>
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

      {/* FOOTER */}

      <footer>
        <span>221B ARCHIVE</span>
        <span>EST. 2026</span>
      </footer>

    </div>
  )
}

export default App
