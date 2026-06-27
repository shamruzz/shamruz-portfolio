import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import heroImg from './assets/hero.png'
import logoImg from './assets/logo.png'
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'
import './App.css'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 3, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }
  })
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [showScrollBar, setShowScrollBar] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = ['home', 'about', 'experience', 'skills', 'education', 'interests', 'contact']
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) setActiveNav(id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setActiveNav(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = ['home', 'about', 'experience', 'skills', 'education', 'interests', 'contact']

  return (
    <div className="portfolio">

      {/* Scroll Progress Bar */}
      <motion.div 
  className="scroll-bar" 
  style={{ 
    scaleX: scrollYProgress,
    opacity: scrolled ? 1 : 0
  }} 
/>

      {/* Navigation */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="logo-btn" onClick={() => scrollTo('home')}>
          <img src={logoImg} alt="Shamruz" className="logo-img" />
          </button>

          <div className="nav-links-desktop">
            {navLinks.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`nav-link ${activeNav === item ? 'nav-link-active' : ''}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {navLinks.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`mobile-link ${activeNav === item ? 'mobile-link-active' : ''}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <motion.div className="hero-bg" style={{ y: heroY }}>
          <img src={heroImg} alt="" className="hero-img" />
          <div className="hero-vignette" />
        </motion.div>

        <div className="hero-body">
          <motion.div
            className="hero-text"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeUp} custom={0} className="hero-eyebrow">
              Fleet Coordinator & Operations Executive
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="hero-name">
              SHAMRUZ<br /><span className="hero-name-accent">RAMZAN</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="hero-quote">
              "Such a rare find."
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="hero-actions">
              <button onClick={() => scrollTo('contact')} className="btn-primary">Get In Touch</button>
              <button onClick={() => scrollTo('about')} className="btn-secondary">Learn More</button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll-hint"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>↓</span>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <motion.div className="section-header" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          <motion.p variants={fadeUp} className="eyebrow">About Me</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Work, study & the grind</motion.h2>
          <motion.div variants={fadeUp} className="divider" />
        </motion.div>

        <motion.div className="about-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          {[
            { num: '01', title: 'Fleet Operations', text: 'At RNB Global, I coordinate dispatcher operations managing vehicle fleets for corporate and business clients. I bridge internal teams and external stakeholders — keeping operations smooth, communications clear, and everything running on time.' },
            { num: '02', title: 'Always Learning', text: 'Currently completing my Higher National Diploma (HND) while working full-time at RNB Global. The plan is to move into a full degree — combining hands-on operations experience with deeper business and technology knowledge.' },
            { num: '03', title: 'The Approach', text: "Balancing work and study has shaped how I think — efficient, focused, results-driven. I don't overcomplicate things. I show up, I execute, and I make sure the job gets done right." },
          ].map((card, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="about-card" whileHover={{ y: -6 }}>
              <div className="about-card-num">{card.num}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section experience-section">
        <motion.div className="section-header" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          <motion.p variants={fadeUp} className="eyebrow">Career</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Professional Experience</motion.h2>
          <motion.div variants={fadeUp} className="divider" />
        </motion.div>

        <div className="timeline">
          {[
            {
              role: 'Fleet Coordinator',
              company: 'RNB Global • Dispatcher Team',
              period: '2025 — Present',
              location: 'Sri Lanka',
              points: [
                'Coordinate dispatcher operations managing multiple vehicle fleets',
                'Serve as primary point of contact between internal teams and corporate clients',
                'Ensure smooth day-to-day operations and efficient task execution',
                'Manage communications, timelines, and client expectations in real-time',
                'Problem-solve operational issues on the spot to keep things running',
              ]
            },
            {
              role: 'Cashier',
              company: 'Lovers Point',
              period: '2024 — 2025',
              location: 'Sri Lanka',
              points: [
                'Managed daily cash transactions accurately and efficiently',
                'Handled customer interactions with professionalism and care',
                'Maintained organized records and end-of-day reconciliations',
                'Developed strong communication and people skills in a fast-paced environment',
              ]
            }
          ].map((job, i) => (
            <motion.div key={i} className="timeline-item" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
              <div className="timeline-marker">
                <div className="timeline-dot" />
                {i < 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{job.role}</h3>
                    <p className="timeline-company">{job.company}</p>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-period">{job.period}</span>
                    <span className="timeline-location">{job.location}</span>
                  </div>
                </div>
                <ul className="timeline-points">
                  {job.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section skills-section">
        <motion.div className="section-header" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          <motion.p variants={fadeUp} className="eyebrow">Expertise</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Skills & Capabilities</motion.h2>
          <motion.div variants={fadeUp} className="divider" />
        </motion.div>

        <motion.div className="skills-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          {[
            { cat: 'Operations', tags: ['Fleet Management', 'Dispatcher Ops', 'Task Coordination', 'Resource Allocation', 'Process Optimization'] },
            { cat: 'Communication', tags: ['Client Relations', 'Team Coordination', 'Problem Solving', 'Decision Making', 'Stakeholder Management'] },
            { cat: 'Technical', tags: ['Cloud Computing (AWS)', 'Linux & Networking', 'Data Analysis', 'Excel & Spreadsheets', 'Dispatch Systems'] },
            { cat: 'Development', tags: ['React', 'JavaScript', 'Web Development', 'Cloud Infrastructure', 'Continuous Learning'] },
          ].map((s, i) => (
            <motion.div key={i} className="skill-card" variants={fadeUp} custom={i} whileHover={{ y: -6 }}>
              <h4 className="skill-cat">{s.cat}</h4>
              <div className="skill-tags">
                {s.tags.map((t, j) => <span key={j} className="skill-tag">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section education-section">
        <motion.div className="section-header" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          <motion.p variants={fadeUp} className="eyebrow">Education</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Building Knowledge</motion.h2>
          <motion.div variants={fadeUp} className="divider" />
        </motion.div>

        <div className="edu-path">
          {[
            { num: '01', title: 'Higher National Diploma (HND)', status: 'In Progress', detail: 'Pursuing HND while working full-time at RNB Global. Combining practical operations experience with advanced theoretical knowledge in business and technology.' },
            { num: '02', title: "Bachelor's Degree", status: 'Next Step', detail: 'Planning to move into a full degree program after HND completion. Focused on operations management, business strategy, and tech integration.' }
          ].map((e, i) => (
            <motion.div key={i} className={`edu-card ${e.status === 'In Progress' ? 'edu-card-active' : ''}`} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
              <div className="edu-num">{e.num}</div>
              <h3 className="edu-title">{e.title}</h3>
              <p className="edu-status">{e.status}</p>
              <p className="edu-detail">{e.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTERESTS */}
      <section id="interests" className="section interests-section">
        <motion.div className="section-header" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          <motion.p variants={fadeUp} className="eyebrow">Beyond Work</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">What Drives Me</motion.h2>
          <motion.div variants={fadeUp} className="divider" />
        </motion.div>

        <motion.div className="interests-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          {[
            { icon: '🏀', title: 'Basketball', text: "Basketball isn't just a sport — it's a mindset. The game teaches you to read situations fast, communicate under pressure, and trust your team. The same principles I bring to fleet coordination every day." },
            { icon: '📡', title: 'Technology', text: 'Genuinely curious about how things work — from AWS infrastructure to React development. Building this portfolio was part of that journey. Tech is the future of operations and I\'m staying ahead of it.' },
            { icon: '📈', title: 'Growth', text: "Working full-time and studying HND simultaneously isn't easy. But growth never is. I'm committed to becoming the best version of myself — professionally and personally." },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="interest-card" whileHover={{ y: -6 }}>
              <div className="interest-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <motion.div className="section-header" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          <motion.p variants={fadeUp} className="eyebrow">Contact</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Let's Connect</motion.h2>
          <motion.div variants={fadeUp} className="divider" />
        </motion.div>

        <motion.div className="contact-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.15 }}>
          <motion.div variants={fadeUp} className="contact-info">
            <p className="contact-intro">
              Open to opportunities in fleet management, operations leadership, and tech integration.
              Whether it's a role, a collaboration, or just a conversation — I'm here.
            </p>
            <div className="contact-links">
              {[
                { icon: <MdEmail size={22} />, label: 'Email', value: 'ramzanshamruz@example.com', href: 'mailto:ramzanshamruz@example.com' },
                { icon: <MdPhone size={22} />, label: 'Phone', value: '+94 777 12 34 56', href: 'tel:+94777123456' },
                { icon: <FaLinkedin size={22} />, label: 'LinkedIn', value: 'Connect with me', href: 'https://linkedin.com' },
                { icon: <FaInstagram size={22} />, label: 'Instagram', value: '@shamruzz', href: 'https://instagram.com/shamruzz?' },
                { icon: <FaWhatsapp size={22} />, label: 'WhatsApp', value: '+94 777 12 34 56', href: 'https://wa.me/94777123456' },
                { icon: <MdLocationOn size={22} />, label: 'Location', value: 'Sri Lanka', href: null },
              ].map((c, i) => (
                c.href
                  ? <a key={i} href={c.href} target={c.label === 'LinkedIn' ? '_blank' : undefined} rel="noopener noreferrer" className="contact-link">
                      <span className="contact-link-icon">{c.icon}</span>
                      <span className="contact-link-label">{c.label}</span>
                      <span>{c.value}</span>
                    </a>
                  : <div key={i} className="contact-link">
                      <span className="contact-link-icon">{c.icon}</span>
                      <span className="contact-link-label">{c.label}</span>
                      <span>{c.value}</span>
                    </div>
              ))}
            </div>
          </motion.div>

          <motion.form variants={fadeUp} className="contact-form" onSubmit={(e) => e.preventDefault()}>
            {[
              { label: 'Name', type: 'text', placeholder: 'Your name' },
              { label: 'Email', type: 'email', placeholder: 'Your email' },
              { label: 'Company', type: 'text', placeholder: 'Your company' },
            ].map((f, i) => (
              <div key={i} className="form-group">
                <label>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} />
              </div>
            ))}
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="What's on your mind?" />
            </div>
            <button type="submit" className="btn-primary btn-full">Send Message</button>
          </motion.form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Shamruz Ramzan • Sri Lanka • 2026</p>
        <p className="footer-sub">Fleet Coordinator</p>
      </footer>

    </div>
  )
}