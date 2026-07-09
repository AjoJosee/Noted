import React from 'react';
import { getAttendanceForDate } from './attendanceSampleData';

const DayAttendance = ({ dateKey }) => {
  const periods = getAttendanceForDate(dateKey);

  const presentCount = periods.filter((p) => p.status === 'present').length;
  const absentCount = periods.length - presentCount;
  const attendancePercent = Math.round((presentCount / periods.length) * 100);

  return (
    <div style={styles.card}>
      <div style={styles.headerRow}>
        <strong style={styles.title}>Attendance for {dateKey}</strong>
        <span style={styles.badge}>{attendancePercent}%</span>
      </div>

      <div style={styles.periodGrid}>
        {periods.map((period, index) => (
          <div key={`${period.subject}-${index}`} style={styles.periodItem}>
            <div
              style={{
                ...styles.dot,
                backgroundColor: period.status === 'present' ? '#0f766e' : '#b91c1c'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={styles.periodName}>{period.subject}</div>
              <div style={styles.periodStatus}>
                {period.status === 'present' ? 'Present' : 'Absent'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <span>{presentCount} present</span>
        <span>{absentCount} absent</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    padding: 16,
    background: '#ffffff',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    color: '#0f172a'
  },
  badge: {
    background: '#e2e8f0',
    color: '#334155',
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700
  },
  periodGrid: {
    display: 'grid',
    gap: 10
  },
  periodItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 12,
    background: '#f8fafc'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%'
  },
  periodName: {
    fontWeight: 600,
    color: '#0f172a'
  },
  periodStatus: {
    fontSize: 12,
    color: '#64748b'
  },
  summary: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    color: '#334155'
  }
};

export default DayAttendance;