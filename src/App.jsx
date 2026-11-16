
import { useState, useRef } from 'react'
import './App.css'

/* =========================================
   01 / BOTANICAL DATABASE
========================================= */

const flowers = [
  {
    id: '001',
    name: 'ROSE',
    scientific: 'Rosa spp.',
    family: 'Rosaceae',
    color: 'CRIMSON',
    season: 'SPRING — SUMMER',
    image: `${import.meta.env.BASE_URL}images/Rose_Blossom_Closeup.jpg`,
    message: 'I love you.',
  },
  {
    id: '002',
    name: 'ORCHID',
    scientific: 'Orchidaceae spp.',
    family: 'Orchidaceae',
    color: 'VIOLET',
    season: 'YEAR-ROUND',
    image: `${import.meta.env.BASE_URL}images/Ban_Ki-Moon_Orchid_Flower.jpg`,
    message: 'You are rare and refined.',
  },
  {
    id: '003',
    name: 'DAISY',
    scientific: 'Bellis perennis',
    family: 'Asteraceae',
    color: 'WHITE',
    season: 'SPRING — AUTUMN',
    image: `${import.meta.env.BASE_URL}images/Pâquerette_(Bellis_perennis).jpg`,
    message: 'My intentions are sincere.',
  },
  {
    id: '004',
    name: 'LOTUS',
    scientific: 'Nelumbo nucifera',
    family: 'Nelumbonaceae',
    color: 'PALE PINK',
    season: 'SUMMER',
    image: `${import.meta.env.BASE_URL}images/Nelumno_nucifera_open_flower.jpg`,
    message: 'Let the past be forgotten.',
  },
  {
    id: '005',
    name: 'QUEEN OF THE NIGHT',
    scientific: 'Epiphyllum oxypetalum',
    family: 'Cactaceae',
    color: 'WHITE',
    season: 'SUMMER — AUTUMN',
    image: `${import.meta.env.BASE_URL}images/Flower_Queen_Of_The_Night__Epiphyllum_Oxypetalum_.jpg`,
    message: 'Midnight hour.',
  },
  {
    id: '006',
    name: 'CHERRY BLOSSOMS',
    scientific: 'Prunus spp.',
    family: 'Rosaceae',
    color: 'PALE PINK',
    season: 'SPRING',
    image: `${import.meta.env.BASE_URL}images/Cherry_Blossoms_in_Helsinki_Finland_2026_02.jpg`,
    message: 'Let us meet.',
  },
  {
    id: '007',
    name: 'GARDENIAS',
    scientific: 'Gardenia jasminoides',
    family: 'Rubiaceae',
    color: 'WHITE',
    season: 'SPRING — SUMMER',
    image: `${import.meta.env.BASE_URL}images/Gardenia_Jasminoides_Flower.jpg`,
    message: 'Secret love.',
  },
  {
    id: '008',
    name: 'NIGHT BLOOMING JASMINE',
    scientific: 'Cestrum nocturnum',
    family: 'Solanaceae',
    color: 'WHITE',
    season: 'SUMMER — AUTUMN',
    image: `${import.meta.env.BASE_URL}images/Night-blooming_jasmine_(Cestrum_nocturnum_).jpg`,
    message: 'Midnight hour.',
  },
]

/* =========================================
   02 / CIPHER CONSTANTS
========================================= */

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const LETTER_STEP = 360 / 26

/* =========================================
   03 / MAIN APP
========================================= */

function App() {

  const [search, setSearch] = useState('')
  const [cipherRotation, setCipherRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const cipherDrag = useRef({
    active: false,
    startAngle: 0,
    startRotation: 0,
  })

  /* =========================================
     FLOWER SEARCH
  ========================================= */

  const filteredFlowers = flowers.filter((flower) =>
    `${flower.name} ${flower.scientific} ${flower.family}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  /* =========================================
     CIPHER ROTATION
  ========================================= */

  const getPointerAngle = (event, element) => {

    const rect = element.getBoundingClientRect()

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    return Math.atan2(
      event.clientY - centerY,
      event.clientX - centerX
    ) * (180 / Math.PI)

  }

  const startCipherDrag = (event) => {

    if (event.button !== 0 && event.pointerType === 'mouse') return

    const element = event.currentTarget

    cipherDrag.current = {
      active: true,
      startAngle: getPointerAngle(event, element),
      startRotation: cipherRotation,
    }

    element.setPointerCapture(event.pointerId)

    setIsDragging(true)

  }

  const moveCipherDrag = (event) => {

    if (!cipherDrag.current.active) return

    const currentAngle = getPointerAngle(
      event,
      event.currentTarget
    )

    let difference =
      currentAngle - cipherDrag.current.startAngle

    // Prevent jumps when crossing the 180-degree boundary.

    if (difference > 180) difference -= 360
    if (difference < -180) difference += 360

    setCipherRotation(
      cipherDrag.current.startRotation + difference
    )

  }

  const endCipherDrag = () => {

    if (!cipherDrag.current.active) return

    cipherDrag.current.active = false

    setIsDragging(false)

    // Snap to the nearest alphabet position.

    setCipherRotation((current) =>
      Math.round(current / LETTER_STEP) * LETTER_STEP
    )

  }

  /* =========================================
     START OF WEBSITE
     PART 1
  ========================================= */

  return (
    <div className="site">

      {/* HEADER */}

      <header className="header">

        <div className="header-left">

          <a href="#top" className="logo">
            221B
          </a>

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

      <main>

        {/* =================================
            HERO
        ================================= */}

        <section className="hero" id="top">

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

        {/* =================================
            01 / DATABASE INDEX
        ================================= */}

        <section className="databases" id="databases">

          <div className="section-heading">

            <span>01 / DATABASES</span>
            <span>ARCHIVE INDEX</span>

          </div>

          <div className="database-grid">

            {/* BOTANICAL */}

            <a
              className="database-card"
              href="#archive"
            >

              <span className="database-number">
                DATABASE / 001
              </span>

              <h2>BOTANICAL</h2>

              <p>
                Flowers, their histories, characteristics,
                symbolism, and intended messages.
              </p>

              <span className="database-status">
                ACTIVE / {String(flowers.length).padStart(3, '0')} RECORDS
              </span>

              <span className="database-arrow">
                ↗
              </span>

            </a>

            {/* CIPHER */}

            <a
              className="database-card"
              href="#cipher"
            >

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

              <span className="database-arrow">
                ↗
              </span>

            </a>

            {/* MORSE */}

            <a
              className="database-card"
              href="#morse"
            >

              <span className="database-number">
                TOOL / 003
              </span>

              <h2>MORSE</h2>

              <p>
                A reference archive preserving Morse code
                and written telegraphic communication.
              </p>

              <span className="database-status">
                ACTIVE
              </span>

              <span className="database-arrow">
                ↗
              </span>

            </a>

          </div>

        </section>

        {/* =================================
            02 / BOTANICAL ARCHIVE
        ================================= */}

        <section className="archive" id="archive">

          <div className="section-heading">

            <span>02 / BOTANICAL</span>

            <span>
              {String(filteredFlowers.length).padStart(3, '0')}
              {' / '}
              {String(flowers.length).padStart(3, '0')}
              {' RECORDS'}
            </span>

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

            {filteredFlowers.map((flower) => (

              <article
                className="flower-card"
                key={flower.id}
              >

                <div className="card-number">
                  RECORD / {flower.id}
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

                    <p>
                      “{flower.message}”
                    </p>

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

                <div className="card-arrow">
                  ↗
                </div>

              </article>

            ))}

            {filteredFlowers.length === 0 && (

              <p className="no-results">
                NO RECORDS FOUND.
                <br />
                TRY ANOTHER SEARCH.
              </p>

            )}

          </div>

        </section>

        {/* PART 2 CONTINUES HERE */}

        {/* =================================
            03 / CIPHER
        ================================= */}

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
              Align the inner alphabet with the fixed outer ring
              to construct or decipher a message.
            </p>

          </div>

          <div className="cipher-tool">

            <div className="cipher-disk">

              {/* OUTER FIXED ALPHABET */}

              <div className="cipher-ring outer-ring">

                {alphabet.map((letter, index) => {

                  const angle = index * LETTER_STEP

                  return (
                    <span
                      key={letter}
                      style={{
                        transform: `
                          rotate(${angle}deg)
                          translateY(-155px)
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
                className={`cipher-ring inner-ring ${
                  isDragging ? 'is-dragging' : ''
                }`}
                style={{
                  transform: `rotate(${cipherRotation}deg)`,
                }}
                onPointerDown={startCipherDrag}
                onPointerMove={moveCipherDrag}
                onPointerUp={endCipherDrag}
                onPointerCancel={endCipherDrag}
                onLostPointerCapture={endCipherDrag}
                role="group"
                aria-label="Draggable inner cipher alphabet"
              >

                {alphabet.map((letter, index) => {

                  const angle = index * LETTER_STEP

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

              {/* CENTRE */}

              <div className="cipher-center">
                221B
              </div>

            </div>

            <div className="cipher-instruction">

              <span>FIELD INSTRUCTION</span>

              <p>
                Drag the inner ring to rotate the alphabet.
                Release to snap into the nearest letter position.
                Use the fixed indicator to align corresponding letters.
              </p>

            </div>

          </div>

        </section>

        {/* =================================
            04 / MORSE CODE
        ================================= */}

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

        {/* =================================
            05 / METHOD
        ================================= */}

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

      {/* =================================
          FOOTER
      ================================= */}

      <footer>

        <span>221B ARCHIVE</span>
        <span>EST. 2026</span>

      </footer>

    </div>
  )
}

export default App
