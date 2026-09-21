import React, { createContext, useContext, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_CONCERTS,
  INITIAL_ARTISTS,
  INITIAL_STAGES,
  INITIAL_RUN_OF_SHOW,
  INITIAL_USER_SCHEDULE,
  INITIAL_USER_BOOKINGS
} from '../data/mockData';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // Navigation view: 'admin' or 'user'
  const [activeView, setActiveView] = useState('admin');

  // Authentication state
  const [currentUser, setCurrentUser] = useState({
    id: 'usr-1',
    name: 'Alex Mercer',
    email: 'alex.mercer@futurebeats.io',
    role: 'fan', // 'admin' or 'fan'
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    walletBalance: 1450,
    vipStatus: 'Platinum Member'
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Payment Gateway state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentCheckoutData, setPaymentCheckoutData] = useState(null);

  // Core domain states
  const [concerts, setConcerts] = useState(INITIAL_CONCERTS);
  const [selectedConcertId, setSelectedConcertId] = useState(INITIAL_CONCERTS[0].id);
  const [artists, setArtists] = useState(INITIAL_ARTISTS);
  const [stages, setStages] = useState(INITIAL_STAGES);
  const [runOfShow, setRunOfShow] = useState(INITIAL_RUN_OF_SHOW);
  const [userBookings, setUserBookings] = useState(INITIAL_USER_BOOKINGS);
  const [userSchedule, setUserSchedule] = useState(INITIAL_USER_SCHEDULE);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Live Toast Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Apex Stage Soundcheck',
      message: 'Amelie Lens sub-bass frequency test passed (104.8 dB peak headroom).',
      type: 'info',
      time: 'Just now'
    }
  ]);

  const addNotification = (title, message, type = 'info') => {
    const id = 'notif-' + Date.now() + Math.random().toString(36).substring(2, 5);
    const newNotif = { id, title, message, type, time: 'Just now' };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const selectedConcert = concerts.find((c) => c.id === selectedConcertId) || concerts[0];

  // Auth Operations
  const loginUser = ({ name, email, role, avatar }) => {
    const user = {
      id: 'usr-' + Date.now(),
      name: name || 'Festival Fan',
      email: email || 'fan@futurebeats.io',
      role: role || 'fan',
      avatar: avatar || (role === 'admin'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
      walletBalance: role === 'admin' ? 99999 : 1250,
      vipStatus: role === 'admin' ? 'Master Production Admin' : 'VIP Pass Holder'
    };
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveView('admin');
    }
    setIsAuthModalOpen(false);
    addNotification('Signed In Successfully', `Welcome back, ${user.name}! (${user.role.toUpperCase()})`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setActiveView('user');
    addNotification('Logged Out', 'You have been signed out of PulseStage.', 'info');
  };

  const loginAsDemo = (demoRole) => {
    if (demoRole === 'admin') {
      loginUser({
        name: 'Marcus Vance',
        email: 'marcus.vance@pulsestage.io',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      });
      setActiveView('admin');
    } else {
      loginUser({
        name: 'Alex Mercer',
        email: 'alex.mercer@futurebeats.io',
        role: 'fan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      });
      setActiveView('user');
    }
  };

  // Payment Gateway Operations
  const openPaymentGateway = (checkoutPayload) => {
    setPaymentCheckoutData(checkoutPayload);
    setIsPaymentModalOpen(true);
  };

  const completePayment = ({ paymentMethod, discountAmount = 0, promoCode = '' }) => {
    if (!paymentCheckoutData) return null;

    const { concert, tier, quantity, attendeeName, email, zoneName } = paymentCheckoutData;

    const subtotal = tier.price * quantity;
    const venueFee = Math.round(subtotal * 0.08);
    const finalAmount = Math.max(0, subtotal + venueFee - discountAmount);

    // Book ticket directly
    const booking = bookTicket({
      concertId: concert.id,
      tierId: tier.id,
      quantity,
      attendeeName: attendeeName || currentUser?.name || 'Valued Festival Fan',
      email: email || currentUser?.email || 'fan@futurebeats.io',
      zoneName: zoneName || 'Selected Arena Zone'
    });

    setIsPaymentModalOpen(false);
    setPaymentCheckoutData(null);

    addNotification(
      'Payment Authorized! 💳',
      `Charged $${finalAmount} via ${paymentMethod}. Pass #${booking.id} generated!`,
      'success'
    );

    return booking;
  };

  // Admin Actions: Concert Management
  const addConcert = (concertData) => {
    const newConcert = {
      ...concertData,
      id: 'c-' + Date.now(),
      ticketsSold: 0,
      grossRevenue: 0,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      tiers: concertData.tiers || [
        { id: 't-ga', name: 'General Admission', price: 79, available: 5000, total: 5000, perks: ['Main Event Access'] },
        { id: 't-vip', name: 'VIP Pass', price: 249, available: 800, total: 800, perks: ['Express Entrance', 'VIP Deck'] }
      ],
      techSpecs: concertData.techSpecs || {
        audioSystem: 'L-Acoustics K1 System',
        peakDecibels: 102.0,
        lasers: '12x High Speed RGB Beams',
        pyroState: 'ARMED',
        powerGrid: '400 kVA Mobile Unit',
        stageDimensions: '80ft x 40ft'
      }
    };
    setConcerts((prev) => [newConcert, ...prev]);
    addNotification('New Event Created', `"${newConcert.title}" has been added to production schedule.`, 'success');
    return newConcert;
  };

  const updateConcert = (id, fields) => {
    setConcerts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...fields } : c))
    );
    addNotification('Event Updated', 'Production specifications updated.', 'info');
  };

  const deleteConcert = (id) => {
    const toDelete = concerts.find((c) => c.id === id);
    setConcerts((prev) => prev.filter((c) => c.id !== id));
    if (selectedConcertId === id) {
      setSelectedConcertId(concerts.find((c) => c.id !== id)?.id || '');
    }
    addNotification('Event Archived', `"${toDelete?.title || 'Concert'}" was archived.`, 'warning');
  };

  // Admin Actions: Stages & Audio/Pyro Monitoring
  const updateStageDecibels = (stageId, db) => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, currentDecibels: Number(db) } : s))
    );
  };

  const toggleStagePyro = (stageId) => {
    setStages((prev) =>
      prev.map((s) => {
        if (s.id === stageId) {
          const nextState = !s.pyroArmed;
          addNotification(
            `Pyro Status: ${s.name}`,
            nextState ? '⚠️ Pyrotechnics system ARMED and verified.' : 'Pyro system placed in SAFE / DISARMED mode.',
            nextState ? 'warning' : 'info'
          );
          return { ...s, pyroArmed: nextState };
        }
        return s;
      })
    );
  };

  const setStageLighting = (stageId, mode) => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, lightingMode: mode } : s))
    );
    addNotification('Lighting Preset Changed', `Stage preset updated to ${mode}`, 'info');
  };

  const setStageHaze = (stageId, hazePercent) => {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, hazePercent } : s))
    );
  };

  // Admin Actions: Artist & Lineup
  const updateArtistStatus = (artistId, newStatus) => {
    setArtists((prev) =>
      prev.map((a) => {
        if (a.id === artistId) {
          let statusColor = 'bg-slate-500/20 text-slate-400 border-slate-500/40';
          if (newStatus === 'On Stage') statusColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
          if (newStatus === 'Soundchecking') statusColor = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
          if (newStatus === 'Backstage Ready') statusColor = 'bg-purple-500/20 text-purple-400 border-purple-500/40';
          if (newStatus === 'Confirmed') statusColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
          return { ...a, status: newStatus, statusColor };
        }
        return a;
      })
    );
    addNotification('Artist Status Changed', `Artist lineup updated to: ${newStatus}`, 'info');
  };

  const updateArtistRider = (artistId, newRiderStatus) => {
    setArtists((prev) =>
      prev.map((a) => (a.id === artistId ? { ...a, riderStatus: newRiderStatus } : a))
    );
    addNotification('Rider Updated', `Artist rider status set to: ${newRiderStatus}`, 'info');
  };

  // Admin Actions: Run of Show
  const triggerCue = (cueId) => {
    setRunOfShow((prev) =>
      prev.map((cue) => {
        if (cue.id === cueId) {
          const nextStatus = cue.status === 'Completed' ? 'Queued' : cue.status === 'Active / Current' ? 'Completed' : 'Active / Current';
          addNotification('Run of Show Triggered', `[${cue.stage}] ${cue.cue} -> ${nextStatus}`, 'success');
          return { ...cue, status: nextStatus };
        }
        return cue;
      })
    );
  };

  const addRunOfShowCue = (cueData) => {
    const newCue = {
      ...cueData,
      id: 'ros-' + Date.now(),
      status: 'Queued'
    };
    setRunOfShow((prev) => [...prev, newCue]);
    addNotification('ROS Cue Added', `New production cue queued for ${newCue.stage}`, 'info');
  };

  // User Actions: Ticket Booking
  const bookTicket = ({ concertId, tierId, quantity, attendeeName, email, zoneName }) => {
    const concert = concerts.find((c) => c.id === concertId);
    if (!concert) return null;
    const tier = concert.tiers.find((t) => t.id === tierId);
    if (!tier || tier.available < quantity) {
      addNotification('Booking Error', 'Not enough tickets available in this tier.', 'warning');
      return null;
    }

    // Deduct ticket inventory & update concert revenue
    const totalPaid = tier.price * quantity;
    setConcerts((prev) =>
      prev.map((c) => {
        if (c.id === concertId) {
          const updatedTiers = c.tiers.map((t) =>
            t.id === tierId ? { ...t, available: t.available - quantity } : t
          );
          return {
            ...c,
            ticketsSold: c.ticketsSold + quantity,
            grossRevenue: c.grossRevenue + totalPaid,
            tiers: updatedTiers,
            status: c.ticketsSold + quantity >= c.totalCapacity ? 'Sold Out' : c.status
          };
        }
        return c;
      })
    );

    const bookingId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: bookingId,
      concertId,
      concertTitle: concert.title,
      date: concert.date,
      venue: `${concert.venue}, ${concert.city}`,
      tierName: tier.name,
      tierId,
      price: tier.price,
      quantity,
      totalPaid,
      attendeeName: attendeeName || currentUser?.name || 'Valued Festival Fan',
      email: email || currentUser?.email || 'fan@futurebeats.io',
      gate: 'Gate ' + (Math.floor(Math.random() * 6) + 1) + ' - Fast Track',
      zone: zoneName || 'Prime Stage Section',
      qrCodeSeed: `PULSE-${bookingId}-${tier.id.toUpperCase()}`,
      purchaseDate: new Date().toISOString().split('T')[0]
    };

    setUserBookings((prev) => [newBooking, ...prev]);

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#06b6d4', '#ec4899', '#f59e0b']
      });
    } catch {
      // safe fallback if confetti canvas is not supported
    }

    addNotification(
      'Pass Confirmed! 🎉',
      `You secured ${quantity}x ${tier.name} for ${concert.title}!`,
      'success'
    );

    return newBooking;
  };

  // User Actions: Personal Festival Itinerary / Schedule Planner
  const isActInSchedule = (artistName) => {
    return userSchedule.some((s) => s.artistName === artistName);
  };

  const checkScheduleConflict = (timeSlot) => {
    return userSchedule.find((s) => s.timeSlot === timeSlot);
  };

  const toggleScheduleAct = (artist) => {
    if (isActInSchedule(artist.name)) {
      setUserSchedule((prev) => prev.filter((s) => s.artistName !== artist.name));
      addNotification('Removed from Itinerary', `${artist.name} removed from your schedule.`, 'info');
    } else {
      const conflict = checkScheduleConflict(artist.timeSlot);
      if (conflict) {
        addNotification(
          'Schedule Overlap Warning ⚠️',
          `Note: ${artist.name} overlaps with ${conflict.artistName} (${artist.timeSlot}).`,
          'warning'
        );
      }
      const newEntry = {
        id: 'sched-' + Date.now(),
        artistName: artist.name,
        stage: artist.stage,
        timeSlot: artist.timeSlot,
        genre: artist.genre,
        color: 'from-purple-600 to-indigo-600'
      };
      setUserSchedule((prev) => [...prev, newEntry]);
      addNotification('Added to Itinerary ⭐', `${artist.name} added to your personal festival schedule!`, 'success');
    }
  };

  return (
    <EventContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        loginUser,
        logoutUser,
        loginAsDemo,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        paymentCheckoutData,
        openPaymentGateway,
        completePayment,
        concerts,
        selectedConcertId,
        setSelectedConcertId,
        selectedConcert,
        addConcert,
        updateConcert,
        deleteConcert,
        artists,
        setArtists,
        updateArtistStatus,
        updateArtistRider,
        stages,
        updateStageDecibels,
        toggleStagePyro,
        setStageLighting,
        setStageHaze,
        runOfShow,
        triggerCue,
        addRunOfShowCue,
        userBookings,
        bookTicket,
        userSchedule,
        isActInSchedule,
        toggleScheduleAct,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        notifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};
