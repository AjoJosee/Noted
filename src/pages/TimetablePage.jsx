import React, { useMemo, useState } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const createEmptyTimetable = () =>
  days.map((day) => ({
    day,
    periods: Array(5).fill('')
  }));

const TimetablePage = () => {
  const [timetable, setTimetable] = useState(createEmptyTimetable());
  const [hoveredCell, setHoveredCell] = useState(null);

  const handleCellClick = (dayIndex, periodIndex) => {
    const currentValue = timetable[dayIndex].periods[periodIndex];
    const nextValue = window.prompt('Enter subject name', currentValue || '');

    if (nextValue === null) return;

    setTimetable((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === dayIndex
          ? {
              ...row,
              periods: row.periods.map((cell, cellIndex) =>
                cellIndex === periodIndex ? nextValue.trim() : cell
              )
            }
          : row
      )
    );
  };

  const summary = useMemo(() => {
    const filled = timetable.flatMap((row) => row.periods.filter(Boolean)).length;
    return { filled, total: timetable.length * 5 };
  }, [timetable]);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Weekly timetable</h2>
          <p style={styles.subtitle}>Click any cell to add or edit a subject.</p>
        </div>
        <div style={styles.summaryBox}>
          {summary.filled} of {summary.total} cells filled
        </div>
      </div>

      <div style={styles.table}>
        <div style={styles.rowHeader}>
          <div style={styles.cornerCell}>Day</div>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={styles.periodHeader}>
              Period {i + 1}
            </div>
          ))}
        </div>

        {timetable.map((row, dayIndex) => (
          <div key={row.day} style={styles.row}>
            <div style={styles.dayLabel}>{row.day}</div>
            {row.periods.map((cell, periodIndex) => {
              const key = `${dayIndex}-${periodIndex}`;
              const isHovered = hoveredCell === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCellClick(dayIndex, periodIndex)}
                  onMouseEnter={() => setHoveredCell(key)}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{
                    ...styles.cell,
                    backgroundColor: isHovered ? '#f8fafc' : '#ffffff',
                    borderColor: isHovered ? '#cbd5e1' : '#e2e8f0'
                  }}
                >
                  {cell || 'Add subject'}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: 24,
    background: '#f8fafc',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    margin: 0,
    fontSize: 24,
    color: '#0f172a'
  },
  subtitle: {
    margin: '6px 0 0',
    color: '#64748b'
  },
  summaryBox: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 999,
    padding: '8px 12px',
    color: '#334155',
    fontWeight: 600
  },
  table: {
    background: '#ffffff',
    borderRadius: 16,
    border: '1px solid #e2e8f0',
    overflow: 'hidden'
  },
  rowHeader: {
    display: 'grid',
    gridTemplateColumns: '140px repeat(5, minmax(120px, 1fr))',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  },
  cornerCell: {
    padding: '12px 14px',
    fontWeight: 700,
    color: '#0f172a',
    borderRight: '1px solid #e2e8f0'
  },
  periodHeader: {
    padding: '12px 14px',
    fontWeight: 700,
    color: '#334155',
    borderRight: '1px solid #e2e8f0',
    textAlign: 'center'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '140px repeat(5, minmax(120px, 1fr))',
    borderBottom: '1px solid #e2e8f0'
  },
  dayLabel: {
    padding: '12px 14px',
    fontWeight: 600,
    color: '#0f172a',
    borderRight: '1px solid #e2e8f0',
    background: '#fcfdff'
  },
  cell: {
    padding: '12px 10px',
    border: '1px solid #e2e8f0',
    borderTop: 'none',
    borderLeft: 'none',
    background: '#ffffff',
    color: '#334155',
    cursor: 'pointer',
    textAlign: 'center',
    minHeight: 50,
    transition: 'background-color 0.2s ease'
  }
};

export default TimetablePage;