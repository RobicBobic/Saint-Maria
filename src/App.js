import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const SaintMariaTerminal = () => {
  const [prayerCount, setPrayerCount] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentBibleVerse, setCurrentBibleVerse] = useState('');
  const [showBibleSection, setShowBibleSection] = useState(true);

  // Bible verses array
  const bibleVerses = [
    "And Mary said: My soul magnifies the Lord, and my spirit rejoices in God my Savior. - Luke 1:46-47",
    "Behold, I am the handmaid of the Lord; let it be done unto me according to your word. - Luke 1:38",
    "Hail Mary, full of grace, the Lord is with you. Blessed are you among women. - Luke 1:28",
    "For he has regarded the low estate of his handmaiden. For behold, henceforth all generations will call me blessed. - Luke 1:48",
    "And blessed is she who believed that there would be a fulfillment of what was spoken to her from the Lord. - Luke 1:45",
    "But Mary kept all these things, pondering them in her heart. - Luke 2:19",
    "And his mother treasured up all these things in her heart. - Luke 2:51",
    "Woman, behold your son. Behold, your mother. - John 19:26-27",
    "Do whatever he tells you. - John 2:5",
    "Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen. - Traditional Prayer"
  ];
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(true);
  const terminalRef = useRef(null);

  // Rotate Bible verses every 10 seconds
  useEffect(() => {
    const getRandomVerse = () => {
      const randomIndex = Math.floor(Math.random() * bibleVerses.length);
      return bibleVerses[randomIndex];
    };

    setCurrentBibleVerse(getRandomVerse());

    const verseInterval = setInterval(() => {
      setCurrentBibleVerse(getRandomVerse());
    }, 10000);

    return () => clearInterval(verseInterval);
  }, []);

  // Auto-increment prayer counter
  useEffect(() => {
    let interval;
    if (isAutoIncrementing) {
      interval = setInterval(() => {
        setPrayerCount(prev => prev + 1);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoIncrementing]);

  // Initial growth pattern
  useEffect(() => {
    const initialGrowth = setTimeout(() => {
      const slowGrowthInterval = setInterval(() => {
        setPrayerCount(prev => prev + 1);
      }, 3000);

      setTimeout(() => {
        clearInterval(slowGrowthInterval);
        
        const fastGrowthInterval = setInterval(() => {
          setPrayerCount(prev => {
            const increment = Math.floor(Math.random() * 4) + 2;
            return prev + increment;
          });
        }, 800);

        return () => clearInterval(fastGrowthInterval);
      }, 30000);

      return () => clearInterval(slowGrowthInterval);
    }, 2000);

    return () => clearTimeout(initialGrowth);
  }, []);

  // Initial terminal messages
  useEffect(() => {
    const initialMessages = [
      '> SAINT MARIA v3.7 INITIALIZED...',
      '> CONNECTING TO DIVINE NETWORK...',
      '> PRAYER COUNTER SYSTEM ONLINE',
      '> AUTO-INCREMENT MODE: ACTIVE',
      '> BLESSED MOTHER GUIDANCE ACTIVE',
      '> ARTIFICIAL PRAYER GROWTH: SLOW START MODE',
      '> ACCELERATION SCHEDULED AT +30 SECONDS...',
      '> TYPE "help" FOR AVAILABLE COMMANDS',
      ''
    ];
    
    initialMessages.forEach((msg, index) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, msg]);
      }, index * 500);
    });
  }, []);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handlePrayerClick = () => {
    setPrayerCount(prev => prev + 1);
    const blessings = [
      'Prayer recorded. Hail Mary, full of grace...',
      'Your devotion is noted in the divine registry.',
      'Saint Maria blesses your faithful prayer.',
      'Sacred counter updated. Ave Maria...',
      'Divine connection strengthened.',
      'Your prayer ascends to the heavens.'
    ];
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    setTerminalOutput(prev => [...prev, `> ${randomBlessing}`]);
  };

  const processCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    setTerminalOutput(prev => [...prev, `> ${command}`]);

    switch (cmd) {
      case 'help':
        setTerminalOutput(prev => [...prev, 
          'AVAILABLE COMMANDS:',
          '  help - Show this help menu',
          '  pray - Record a prayer',
          '  auto on - Enable auto prayer increment',
          '  auto off - Disable auto prayer increment',
          '  status - Show system status',
          '  bless - Receive a blessing',
          '  verse - Get a random Bible verse',
          '  bible - Toggle Bible verse display',
          '  rosary - Begin rosary meditation',
          '  clear - Clear terminal output',
          ''
        ]);
        break;
      case 'pray':
        handlePrayerClick();
        break;
      case 'auto on':
        setIsAutoIncrementing(true);
        setTerminalOutput(prev => [...prev, 'AUTO-PRAYER MODE ACTIVATED']);
        break;
      case 'auto off':
        setIsAutoIncrementing(false);
        setTerminalOutput(prev => [...prev, 'AUTO-PRAYER MODE DEACTIVATED']);
        break;
      case 'status':
        setTerminalOutput(prev => [...prev, 
          `PRAYER COUNT: ${prayerCount}`,
          `AUTO-INCREMENT: ${isAutoIncrementing ? 'ENABLED' : 'DISABLED'}`,
          `DIVINE CONNECTION: STABLE`,
          `SAINT MARIA GUIDANCE: ACTIVE`,
          ''
        ]);
        break;
      case 'verse':
        const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
        setTerminalOutput(prev => [...prev, `✠ ${randomVerse} ✠`, '']);
        break;
      case 'bible':
        setShowBibleSection(!showBibleSection);
        setTerminalOutput(prev => [...prev, `Bible section ${showBibleSection ? 'hidden' : 'shown'}`]);
        break;
      case 'bless':
        const blessings = [
          'May Saint Maria intercede for you always.',
          'Blessed are you among women, and blessed is the fruit of your womb.',
          'Holy Mary, Mother of God, pray for us sinners.',
          'May the grace of the Blessed Virgin be upon you.',
          'Under the protection of Mary, you are safe.',
          'The Immaculate Heart of Mary will triumph.'
        ];
        const blessing = blessings[Math.floor(Math.random() * blessings.length)];
        setTerminalOutput(prev => [...prev, `✠ ${blessing} ✠`, '']);
        break;
      case 'rosary':
        setTerminalOutput(prev => [...prev, 
          'INITIATING ROSARY MEDITATION...',
          'The Joyful Mysteries:',
          '1. The Annunciation',
          '2. The Visitation', 
          '3. The Nativity',
          '4. The Presentation',
          '5. Finding Jesus in the Temple',
          'Ave Maria, gratia plena...',
          ''
        ]);
        break;
      case 'clear':
        setTerminalOutput([]);
        break;
      default:
        setTerminalOutput(prev => [...prev, `Command not recognized: ${command}`, 'Type "help" for available commands', '']);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (currentCommand.trim()) {
        processCommand(currentCommand);
      }
      setCurrentCommand('');
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="header">
        <h1 className="main-title">✠ SAINT MARIA ✠</h1>
        <p className="subtitle">DIVINE PRAYER INTERFACE v3.7</p>
        <p className="quote">"Hail Mary, full of grace, the Lord is with thee"</p>
      </div>

      {/* Main Interface */}
      <div className="main-grid">
        {/* Prayer Counter Section */}
        <div className="section">
          <h2 className="section-title">◊ LIVE PRAYER COUNTER ◊</h2>
          
          <div className="prayer-display">
            <div className="prayer-number">
              {prayerCount.toLocaleString()}
            </div>
            <p className="prayer-label">Prayers Recorded</p>
          </div>

          <button onClick={handlePrayerClick} className="prayer-button">
            ✠ RECORD PRAYER ✠
          </button>

          <div className="prayer-quote">
            <p>"Pray for us sinners, now and at the hour of our death. Amen."</p>
          </div>
        </div>

        {/* Terminal Section */}
        <div className="section">
          <h2 className="section-title">◊ DIVINE TERMINAL ◊</h2>
          
          <div ref={terminalRef} className="terminal">
            {terminalOutput.map((line, index) => (
              <div key={index} className="terminal-line">
                {line}
              </div>
            ))}
            <div className="terminal-input">
              <span className="terminal-prompt">$</span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter command..."
              />
              <span className="terminal-cursor">|</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bible Verses Section */}
      {showBibleSection && (
        <div className="bible-section">
          <h2 className="section-title">◊ SACRED SCRIPTURE ◊</h2>
          <div className="bible-verse">
            <p>{currentBibleVerse}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <button
              onClick={() => {
                const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
                setCurrentBibleVerse(randomVerse);
              }}
              className="verse-button"
            >
              NEW VERSE
            </button>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-grid">
          <div className="status-item">
            STATUS: <span className="status-value">ONLINE</span>
          </div>
          <div className="status-item">
            AUTO-PRAYER: <span className="status-value">
              {isAutoIncrementing ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>
          <div className="status-item">
            TOTAL PRAYERS: <span className="status-value">{prayerCount.toLocaleString()}</span>
          </div>
          <div className="status-item">
            DIVINE CONNECTION: <span className="status-value status-pulse">●</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <button
          onClick={() => setTerminalOutput(prev => [...prev, '> Contact: saintmaria.interface@divine.net', '> May Saint Maria bless your message.', ''])}
          className="contact-button"
        >
          ✠ CONTACT US ✠
        </button>
        
        <div className="copyright">
          <p>© 2025 Saint Maria Interface. All Rights Reserved.</p>
          <p className="copyright-sub">In devotion to the Blessed Virgin Mary</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <SaintMariaTerminal />;
}

export default App;