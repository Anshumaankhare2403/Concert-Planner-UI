export const INITIAL_CONCERTS = [
  {
    id: 'c-101',
    title: 'CyberVibe 2026: Neo-Tokyo SynthWave Odyssey',
    subtitle: 'The World’s Premier Immersive Electronic & Synthwave Festival',
    tagline: '3 Days • 4 Hologram Stages • 45+ Global Acts',
    date: 'OCT 24 - 26, 2026',
    time: 'Gates Open 16:00 CST',
    venue: 'Neon Arena Dome & Expo Park',
    city: 'Austin, TX',
    genre: 'Electronic / Synthwave',
    status: 'Live Now',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80',
    totalCapacity: 38000,
    ticketsSold: 35240,
    grossRevenue: 4892400,
    headliners: ['Neon Pulse', 'Kavinsky 2.0', 'Amelie Lens', 'The Glitch Mob', 'Grum'],
    stages: ['Apex Main Stage', 'Sub-Bass Bunker', 'Cyber Garden Dome', 'Afterglow Lounge'],
    tiers: [
      { id: 't-ga', name: 'General Admission (GA)', price: 89, available: 1250, total: 22000, perks: ['Full 3-Day Festival Access', 'Main Stage & Dome Access', 'Standard Food & Craft Village'] },
      { id: 't-pit', name: 'Golden Circle Pit Pass', price: 189, available: 420, total: 8000, perks: ['Barricade Front Row Access', 'Dedicated Fast-Track Entry', 'Exclusive Commemorative Lanyard'] },
      { id: 't-vip', name: 'VIP SkyDeck Lounge', price: 349, available: 85, total: 5500, perks: ['Elevated Viewing Deck over Mainstage', 'Complimentary Craft Bar & Gourmet Bites', 'Air-conditioned Private Restrooms'] },
      { id: 't-plat', name: 'Platinum All-Access & Backstage', price: 749, available: 5, total: 2500, perks: ['Artist Lounge Access', 'Soundboard Stage Tour', 'On-Stage Viewing Platform', 'Valet Parking'] },
    ],
    techSpecs: {
      audioSystem: 'd&b audiotechnik KSL Array + 48x SL-SUBs',
      peakDecibels: 104.8,
      lasers: '16x 40W Full-Color Kvant Spectrum',
      pyroState: 'ARMED (Liquid Nitrogen + 8 Flame Jets)',
      powerGrid: '550 kVA Synchronized Hybrid Generator',
      stageDimensions: '96ft W x 48ft D x 34ft H',
    }
  },
  {
    id: 'c-102',
    title: 'Electric Horizon World Tour: ODESZA & Orchestral Ensemble',
    subtitle: 'Cinematic Live Electronic Tour with Live Strings & Drumline',
    tagline: 'Sold-Out Iconic Amphitheatre Experience',
    date: 'NOV 12, 2026',
    time: '19:30 MST',
    venue: 'Red Rocks Amphitheatre',
    city: 'Morrison, CO',
    genre: 'Melodic Bass / Live Electronic',
    status: 'Sold Out',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/40',
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    totalCapacity: 9525,
    ticketsSold: 9525,
    grossRevenue: 1619250,
    headliners: ['ODESZA', 'Tycho', 'San Holo', 'TOKiMONSTA'],
    stages: ['Amphitheatre Monolith Stage'],
    tiers: [
      { id: 't-ga2', name: 'General Admission Tier 1', price: 110, available: 0, total: 6500, perks: ['Access to General Seating Plan', 'Merch Booth Access'] },
      { id: 't-pit2', name: 'Reserved Front Rows (1-15)', price: 260, available: 0, total: 2025, perks: ['Reserved Prime Center Seating', 'Express Gates'] },
      { id: 't-vip2', name: 'Horizon VIP Experience', price: 450, available: 0, total: 1000, perks: ['VIP Upper Terrace Reception', 'Limited Edition Signed Vinyl & Poster'] },
    ],
    techSpecs: {
      audioSystem: 'L-Acoustics K1/K2 System',
      peakDecibels: 99.4,
      lasers: '8x 30W RGB Beam Projectors',
      pyroState: 'SAFE (Sparkular Cold-Spark Fountains)',
      powerGrid: '320 kVA Direct Grid Hookup',
      stageDimensions: '72ft W x 40ft D x 28ft H',
    }
  },
  {
    id: 'c-103',
    title: 'HyperSonic Bass Invasion 2026',
    subtitle: 'Heavy Dubstep, Drum & Bass and Visual Projection Arena',
    tagline: 'Featuring 360° Wrap-Around LED Stage',
    date: 'DEC 05, 2026',
    time: '21:00 EST',
    venue: 'The Brooklyn Avant Mirage',
    city: 'Brooklyn, NY',
    genre: 'Bass Music / DnB',
    status: 'On Sale',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    banner: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1600&q=80',
    totalCapacity: 8500,
    ticketsSold: 6720,
    grossRevenue: 772800,
    headliners: ['Subtronics', 'Excision', 'Pendulum (Live)', 'Noisia Legacy Set'],
    stages: ['Mirage LED Crucible', 'The Kings Hall'],
    tiers: [
      { id: 't-ga3', name: 'Early Bird General Admission', price: 65, available: 210, total: 5000, perks: ['Main floor access', 'Entry before 22:30'] },
      { id: 't-pit3', name: 'Tier 2 Standing Floor', price: 85, available: 940, total: 2500, perks: ['Full night access anytime', 'Fast bar line'] },
      { id: 't-vip3', name: 'Mezzanine VIP Table (Per Seat)', price: 295, available: 130, total: 1000, perks: ['Dedicated cocktail server', 'Balcony elevated bass perspective'] },
    ],
    techSpecs: {
      audioSystem: 'PK Sound Trinity Robotic Line Source',
      peakDecibels: 106.2,
      lasers: '24x High Output Beam Rig',
      pyroState: 'ARMED (CO2 Jet Cannon Rig 360)',
      powerGrid: '400 kVA Mobile Unit',
      stageDimensions: '80ft W x 42ft D x 30ft H',
    }
  },
  {
    id: 'c-104',
    title: 'Starlight Acoustic & Indie Nocturne',
    subtitle: 'Intimate Candlelit Performances Under the Open Skies',
    tagline: 'Boutique Festival by the Ocean Water',
    date: 'JAN 18, 2027',
    time: '17:00 AEDT',
    venue: 'Harbour Promenade Amphitheatre',
    city: 'Sydney, Australia',
    genre: 'Indie Folk / Alternative',
    status: 'Scheduled',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    banner: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1600&q=80',
    totalCapacity: 6200,
    ticketsSold: 3410,
    grossRevenue: 409200,
    headliners: ['Bon Iver', 'Phoebe Bridgers', 'Vance Joy', 'AURORA'],
    stages: ['Harbour Waterfront Stage', 'The Pine Grove Pavilion'],
    tiers: [
      { id: 't-ga4', name: 'Lawn Picnic GA Pass', price: 75, available: 1800, total: 4000, perks: ['Lawn rug seating area', 'Acoustic clarity sound zones'] },
      { id: 't-pit4', name: 'Orchestra Front Stalls', price: 140, available: 620, total: 1500, perks: ['Assigned chair seating', 'Programme booklet'] },
      { id: 't-vip4', name: 'Harbour Sunset Pavilion Pass', price: 275, available: 370, total: 700, perks: ['Champagne reception', 'Gourmet hamper', 'Private harbor viewing'] },
    ],
    techSpecs: {
      audioSystem: 'Meyer Sound PANTHER Line Array',
      peakDecibels: 92.5,
      lasers: 'Disabled (Acoustic Low-Light Spec)',
      pyroState: 'DISARMED (Eco-friendly Glow Drones)',
      powerGrid: '100% Clean Solar + Battery Bank',
      stageDimensions: '60ft W x 35ft D x 24ft H',
    }
  }
];

export const INITIAL_ARTISTS = [
  {
    id: 'art-1',
    name: 'Neon Pulse',
    genre: 'Cyberpunk Synthwave / Electro',
    stage: 'Apex Main Stage',
    timeSlot: '22:30 - 00:30',
    status: 'On Stage',
    statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80',
    listeners: '4.8M monthly',
    riderStatus: 'Approved',
    dressingRoom: 'Green Room Suite Alpha',
    soundcheck: 'Completed (15:30)',
    contact: '+1 (555) 234-8901',
    notes: 'Requires 4x cryo blasts on chorus 2 and custom laser mesh at minute 42:00.'
  },
  {
    id: 'art-2',
    name: 'Amelie Lens',
    genre: 'Acid & Peak-Time Techno',
    stage: 'Sub-Bass Bunker',
    timeSlot: '23:00 - 01:30',
    status: 'Soundchecking',
    statusColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80',
    listeners: '3.2M monthly',
    riderStatus: 'Approved',
    dressingRoom: 'Suite Bravo',
    soundcheck: 'In Progress',
    contact: '+32 470 12 34 56',
    notes: 'Pioneer DJM-V10 mixer with 4x CDJ-3000s in link mode mandatory.'
  },
  {
    id: 'art-3',
    name: 'Kavinsky 2.0',
    genre: 'Outrun / French House',
    stage: 'Apex Main Stage',
    timeSlot: '20:45 - 22:15',
    status: 'Backstage Ready',
    statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=80',
    listeners: '6.1M monthly',
    riderStatus: 'Special FX Requested',
    dressingRoom: 'Suite Charlie',
    soundcheck: 'Completed (14:00)',
    contact: '+33 6 12 34 56 78',
    notes: 'Red Testarossa prop illuminated on side-wing with smoke vents.'
  },
  {
    id: 'art-4',
    name: 'The Glitch Mob',
    genre: 'Bass / Live Hybrid Performance',
    stage: 'Cyber Garden Dome',
    timeSlot: '21:30 - 23:00',
    status: 'Confirmed',
    statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80',
    listeners: '2.9M monthly',
    riderStatus: 'Pending Catering',
    dressingRoom: 'Suite Delta',
    soundcheck: 'Scheduled (17:00)',
    contact: '+1 (555) 987-6543',
    notes: 'Custom Blade synthesizer rig. Requires 8 stereo DI channels.'
  },
  {
    id: 'art-5',
    name: 'Grum & Deep Sound Collective',
    genre: 'Progressive Trance',
    stage: 'Afterglow Lounge',
    timeSlot: '19:00 - 20:30',
    status: 'Backstage Ready',
    statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80',
    listeners: '1.4M monthly',
    riderStatus: 'Approved',
    dressingRoom: 'Suite Echo',
    soundcheck: 'Completed (13:00)',
    contact: '+44 7700 900077',
    notes: 'Ambient lighting setup with low smoke haze throughout set.'
  }
];

export const INITIAL_STAGES = [
  {
    id: 'stage-1',
    name: 'Apex Main Stage',
    capacity: 22000,
    currentDecibels: 104.5,
    maxDecibels: 108.0,
    currentAct: 'Neon Pulse (Live)',
    nextAct: 'Encore & Pyro Finale',
    lightingMode: 'Cyber Neon Matrix',
    pyroArmed: true,
    hazePercent: 68,
    status: 'Active',
    soundEngineer: 'Marcus Vance (FOH Chief)',
    audioStatus: 'Optimal - Clear Headroom',
    visualTheme: 'Cyberpunk Purple / Electric Cyan'
  },
  {
    id: 'stage-2',
    name: 'Sub-Bass Bunker',
    capacity: 8500,
    currentDecibels: 106.2,
    maxDecibels: 110.0,
    currentAct: 'Soundcheck: Amelie Lens',
    nextAct: 'Amelie Lens (Acid Set)',
    lightingMode: 'Underground Strobe Flash',
    pyroArmed: false,
    hazePercent: 88,
    status: 'Soundcheck',
    soundEngineer: 'Elena Rostova',
    audioStatus: 'Sub 40Hz Bass Boost Active',
    visualTheme: 'Industrial Red & Monochrome'
  },
  {
    id: 'stage-3',
    name: 'Cyber Garden Dome',
    capacity: 5000,
    currentDecibels: 98.4,
    maxDecibels: 102.0,
    currentAct: 'The Glitch Mob',
    nextAct: 'Overmono Live',
    lightingMode: 'Botanical Hologram Swirl',
    pyroArmed: true,
    hazePercent: 52,
    status: 'Active',
    soundEngineer: 'Devon Reed',
    audioStatus: 'Immersive 3D Spatial Audio Active',
    visualTheme: 'Emerald Flora & Violet Neon'
  },
  {
    id: 'stage-4',
    name: 'Afterglow Lounge',
    capacity: 2500,
    currentDecibels: 91.2,
    maxDecibels: 96.0,
    currentAct: 'Grum & Deep Collective',
    nextAct: 'Chillout DJ Rotation',
    lightingMode: 'Warm Amber Glow',
    pyroArmed: false,
    hazePercent: 30,
    status: 'Active',
    soundEngineer: 'Chloe Bennett',
    audioStatus: 'Acoustic Dispersion Balanced',
    visualTheme: 'Sunset Gold & Rose Quartz'
  }
];

export const INITIAL_RUN_OF_SHOW = [
  {
    id: 'ros-1',
    time: '22:30:00',
    stage: 'Apex Main Stage',
    cue: 'Neon Pulse Walkout & Low Sub Drone Intro',
    crew: 'Lighting OP (Sarah), FOH (Marcus)',
    status: 'Completed',
    notes: 'Fade stage house lights to 0% over 15s. Blackout with center cyan spot.'
  },
  {
    id: 'ros-2',
    time: '22:45:00',
    stage: 'Apex Main Stage',
    cue: 'Main Pyrotechnics Flame Blast - Track 3 Chorus',
    crew: 'Pyro Tech (Jaxson), Stage Mgr',
    status: 'Completed',
    notes: '8-point vertical flame blast synchronized to kick drum transient.'
  },
  {
    id: 'ros-3',
    time: '23:15:00',
    stage: 'Apex Main Stage',
    cue: '360° Laser Mesh Web & CO2 Cryo Jet Drop',
    crew: 'Laser OP (Kai), FX Team',
    status: 'Active / Current',
    notes: 'Audience overhead scan enabled. Safety curtains armed.'
  },
  {
    id: 'ros-4',
    time: '23:45:00',
    stage: 'Apex Main Stage',
    cue: 'Encore Transition & Floating Drum Platform Lift',
    crew: 'Rigging Lead (Torres), Automation Lead',
    status: 'Queued',
    notes: 'Elevate hydraulic riser 4.5 meters during synthesizer bridge.'
  },
  {
    id: 'ros-5',
    time: '00:15:00',
    stage: 'Apex Main Stage',
    cue: 'Grand Finale Sparkular Waterfall & Streamer Cannons',
    crew: 'All Stage Hands & Production Chief',
    status: 'Queued',
    notes: 'Fire 120kg metallic biodegradable confetti streamers across stadium.'
  },
  {
    id: 'ros-6',
    time: '23:00:00',
    stage: 'Sub-Bass Bunker',
    cue: 'Amelie Lens Opening Track - Strobe Assault Cue',
    crew: 'Bunker LD (Viktor)',
    status: 'Active / Current',
    notes: 'Rapid 140BPM strobe bursts on beat drops.'
  }
];

export const INITIAL_USER_SCHEDULE = [
  {
    id: 'sched-1',
    artistName: 'Neon Pulse',
    stage: 'Apex Main Stage',
    timeSlot: '22:30 - 00:30',
    genre: 'Cyberpunk Synthwave',
    color: 'from-purple-600 to-indigo-600'
  },
  {
    id: 'sched-2',
    artistName: 'Kavinsky 2.0',
    stage: 'Apex Main Stage',
    timeSlot: '20:45 - 22:15',
    genre: 'Outrun Electro',
    color: 'from-pink-600 to-purple-600'
  }
];

export const INITIAL_USER_BOOKINGS = [
  {
    id: 'TKT-884920',
    concertId: 'c-101',
    concertTitle: 'CyberVibe 2026: Neo-Tokyo SynthWave Odyssey',
    date: 'OCT 24 - 26, 2026',
    venue: 'Neon Arena Dome & Expo Park, Austin TX',
    tierName: 'Golden Circle Pit Pass',
    tierId: 't-pit',
    price: 189,
    quantity: 2,
    totalPaid: 378,
    attendeeName: 'Alex Mercer',
    email: 'alex.mercer@futurebeats.io',
    gate: 'Gate 4 - VIP North Express',
    zone: 'Front Barricade Section A',
    qrCodeSeed: 'PULSE-884920-OCT26-PIT',
    purchaseDate: '2026-09-18'
  }
];

