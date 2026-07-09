import React, { useMemo, useState } from 'react';
import DayAttendance from './DayAttendance';
import { getAttendanceForDate, initialEvents } from './attendanceSampleData';

const colorOptions = [
  { value: '#0f172a', label: 'Slate' },
  { value: '#334155', label: 'Muted slate' },
  { value: '#0f766e', label: 'Teal' },
  { value: '#2563eb', label: 'Blue' },
  { value: '#7c2d12', label: 'Copper' }
];

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getMonthCells = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i += 1) cells.push(null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};

const CalendarPage = () => {
  const [activeMonth, setActiveMonth] = useState(new Date(2026, 6, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 10));
  const [events, setEvents] = useState(initialEvents);
  const [eventsExpanded, setEventsExpanded] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [form, setForm] = useState({
    title: '',
    date: '2026-07-10',
    time: '09:00',
    color: '#2563eb',
    label: '',
    insertMode: 'end',
    anchorEventId: ''
  });

  const selectedDateKey = formatDateKey(selectedDate);
  const monthCells = useMemo(() => getMonthCells(activeMonth), [activeMonth]);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      if (a.date === b.date) return a.time.localeCompare(b.time);
      return a.date.localeCompare(b.date);
    });
  }, [events]);

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    const newEvent = {
      id: Date.now(),
      title: form.title.trim(),
      date: form.date,
      time: form.time,
      color: form.color,
      label: form.label.trim() || 'Event'
    };

    if (form.insertMode === 'between' && form.anchorEventId) {
      const anchorIndex = events.findIndex((event) => event.id === Number(form.anchorEventId));
      if (anchorIndex >= 0) {
        const updated = [...events];
        updated.splice(anchorIndex + 1, 0, newEvent);
        setEvents(updated);
      } else {
        setEvents([newEvent, ...events]);
      }
    } else {
      setEvents([newEvent, ...events]);
    }

    setForm((prev) => ({ ...prev, title: '', label: '' }));
  };

  const eventOptions = sortedEvents.map((event) => ({
    value: event.id,
    label: `${event.title} (${event.date})`
  }));

  const selectedAttendance = getAttendanceForDate(selectedDateKey);
  const presentCount = selectedAttendance.filter((p) => p.status === 'present').length;
  const absentCount = selectedAttendance.length - presentCount;
  const attendancePercent = Math.round((presentCount / selectedAttendance.length) * 100);

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div>
            <h2 style={styles.heading}>Calendar</h2>
            <p style={styles.subtext}>Plan events and review attendance in one place.</p>
          </div>

          <button
            type="button"
            onClick={() => setEventsExpanded((prev) => !prev)}
            style={styles.toggleButton}
          >
            {eventsExpanded ? 'Hide form' : 'Show form'}
          </button>
        </div>

        {eventsExpanded && (
          <form onSubmit={handleAddEvent} style={styles.form}>
            <label style={styles.label}>
              Event title
              <input
                style={styles.input}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter event name"
              />
            </label>

            <label style={styles.label}>
              Date
              <input
                style={styles.input}
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </label>

            <label style={styles.label}>
              Time
              <input
                style={styles.input}
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </label>

            <label style={styles.label}>
              Label
              <input
                style={styles.input}
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="Optional label"
              />
            </label>

            <label style={styles.label}>
              Color
              <div style={styles.colorRow}>
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm({ ...form, color: option.value })}
                    style={{
                      ...styles.colorSwatch,
                      backgroundColor: option.value,
                      border: form.color === option.value ? '2px solid #0f172a' : '2px solid transparent'
                    }}
                    aria-label={option.label}
                  />
                ))}
              </div>
            </label>

            <label style={styles.label}>
              Add position
              <select
                style={styles.input}
                value={form.insertMode}
                onChange={(e) => setForm({ ...form, insertMode: e.target.value })}
              >
                <option value="end">Add at end</option>
                <option value="between">Add between events</option>
              </select>
            </label>

            {form.insertMode === 'between' && (
              <label style={styles.label}>
                Insert after
                <select
                  style={styles.input}
                  value={form.anchorEventId}
                  onChange={(e) => setForm({ ...form, anchorEventId: e.target.value })}
                >
                  <option value="">Choose event</option>
                  {eventOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <button type="submit" style={styles.primaryButton}>
              Add event
            </button>
          </form>
        )}

        <div style={styles.smallCard}>
          <div style={styles.smallCardTitle}>Selected day</div>
          <div style={styles.metric}>{attendancePercent}% attendance</div>
          <div style={styles.smallText}>
            {presentCount} present • {absentCount} absent
          </div>
        </div>
      </aside>

      <main style={styles.main}>
        <div style={styles.headerBar}>
          <div>
            <h3 style={styles.mainTitle}>
              {activeMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <p style={styles.subtext}>Tap a day for attendance and events.</p>
          </div>

          <div style={styles.monthButtons}>
            <button
              style={styles.secondaryButton}
              onClick={() => setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1))}
            >
              Previous
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1))}
            >
              Next
            </button>
          </div>
        </div>

        <div style={styles.calendarGrid}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} style={styles.weekdayHeader}>
              {day}
            </div>
          ))}

          {monthCells.map((cell, index) => {
            const isCurrentMonth = cell && cell.getMonth() === activeMonth.getMonth();
            const dayKey = cell ? formatDateKey(cell) : null;
            const dayAttendance = cell ? getAttendanceForDate(dayKey) : [];
            const dayEventsForCell = cell
              ? sortedEvents.filter((event) => event.date === dayKey)
              : [];
            const isSelected = cell && dayKey === selectedDateKey;
            const isHovered = hoveredDay === index;

            return (
              <button
                key={index}
                type="button"
                onClick={() => cell && setSelectedDate(cell)}
                onMouseEnter={() => setHoveredDay(index)}
                onMouseLeave={() => setHoveredDay(null)}
                style={{
                  ...styles.dayCell,
                  opacity: isCurrentMonth ? 1 : 0.45,
                  border: isSelected ? '2px solid #334155' : '1px solid #e2e8f0',
                  backgroundColor: isHovered ? '#f8fafc' : '#ffffff'
                }}
              >
                {cell ? (
                  <>
                    <div style={styles.dayNumber}>{cell.getDate()}</div>

                    <div style={styles.attendanceRow}>
                      {dayAttendance.map((period, idx) => (
                        <div
                          key={`${period.subject}-${idx}`}
                          style={{
                            ...styles.attendanceDot,
                            backgroundColor: period.status === 'present' ? '#0f766e' : '#b91c1c'
                          }}
                        />
                      ))}
                    </div>

                    <div style={styles.eventList}>
                      {dayEventsForCell.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          style={{
                            ...styles.eventChip,
                            backgroundColor: event.color
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <span />
                )}
              </button>
            );
          })}
        </div>

        <div style={styles.detailSection}>
          <div style={styles.detailTitle}>Selected day detail</div>
          <DayAttendance dateKey={selectedDateKey} />
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    display: 'grid',
    gridTemplateColumns: '360px 1fr',
    gap: 24,
    padding: 24,
    background: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'Inter, Arial, sans-serif'
  },
  sidebar: {
    background: '#ffffff',
    borderRadius: 20,
    padding: 20,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 16
  },
  heading: {
    margin: 0,
    fontSize: 24,
    color: '#0f172a'
  },
  subtext: {
    margin: '6px 0 0',
    color: '#64748b',
    fontSize: 14
  },
  toggleButton: {
    border: '1px solid #cbd5e1',
    borderRadius: 999,
    padding: '8px 10px',
    background: '#f8fafc',
    color: '#334155',
    cursor: 'pointer',
    fontSize: 13
  },
  form: {
    display: 'grid',
    gap: 12
  },
  label: {
    display: 'grid',
    gap: 6,
    fontSize: 13,
    color: '#334155'
  },
  input: {
    border: '1px solid #cbd5e1',
    borderRadius: 10,
    padding: '10px 12px',
    fontSize: 14,
    background: '#fff'
  },
  colorRow: {
    display: 'flex',
    gap: 8
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    cursor: 'pointer'
  },
  primaryButton: {
    border: 'none',
    borderRadius: 10,
    padding: '10px 14px',
    background: '#334155',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700
  },
  secondaryButton: {
    border: '1px solid #cbd5e1',
    borderRadius: 10,
    padding: '8px 12px',
    background: '#fff',
    color: '#0f172a',
    cursor: 'pointer'
  },
  smallCard: {
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    background: '#f8fafc',
    border: '1px solid #e2e8f0'
  },
  smallCardTitle: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4
  },
  metric: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0f172a'
  },
  smallText: {
    fontSize: 13,
    color: '#475569',
    marginTop: 4
  },
  main: {
    display: 'grid',
    gap: 20
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainTitle: {
    margin: 0,
    fontSize: 22,
    color: '#0f172a'
  },
  monthButtons: {
    display: 'flex',
    gap: 10
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
    gap: 10
  },
  weekdayHeader: {
    textAlign: 'center',
    fontWeight: 700,
    color: '#64748b',
    paddingBottom: 6
  },
  dayCell: {
    minHeight: 120,
    borderRadius: 14,
    background: '#fff',
    padding: 10,
    textAlign: 'left',
    cursor: 'pointer'
  },
  dayNumber: {
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 6
  },
  attendanceRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8
  },
  attendanceDot: {
    width: 10,
    height: 10,
    borderRadius: '50%'
  },
  eventList: {
    display: 'grid',
    gap: 6
  },
  eventChip: {
    color: '#fff',
    padding: '4px 8px',
    borderRadius: 999,
    fontSize: 11,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  detailSection: {
    background: '#fff',
    borderRadius: 20,
    padding: 20,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 12
  }
};

export default CalendarPage;