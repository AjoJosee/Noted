import React, { useMemo } from 'react';
import { attendanceSeedData } from './attendanceSampleData';

const DashboardPage = () => {
  const summary = useMemo(() => {
    const subjectStats = {};
    const monthlyStats = {};

    attendanceSeedData.forEach((entry) => {
      const month = entry.date.slice(0, 7);

      entry.periods.forEach((period) => {
        if (!subjectStats[period.subject]) {
          subjectStats[period.subject] = { present: 0, absent: 0 };
        }
        subjectStats[period.subject][period.status] += 1;
      });

      if (!monthlyStats[month]) {
        monthlyStats[month] = { present: 0, absent: 0 };
      }

      entry.periods.forEach((period) => {
        monthlyStats[month][period.status] += 1;
      });
    });

    return { subjectStats, monthlyStats };
  }, []);

  const subjectCards = Object.entries(summary.subjectStats).map(([subject, stats]) => {
    const total = stats.present + stats.absent;
    const percent = Math.round((stats.present / total) * 100);
    return { subject, percent, total };
  });

  const monthlyCards = Object.entries(summary.monthlyStats).map(([month, stats]) => {
    const total = stats.present + stats.absent;
    const percent = Math.round((stats.present / total) * 100);
    return { month, percent, total };
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Attendance overview</h2>
        <p style={styles.subtext}>Simple summaries for periods and months.</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>By period</h3>
          {subjectCards.map((item) => (
            <div key={item.subject} style={styles.row}>
              <div style={styles.rowLabel}>
                <strong>{item.subject}</strong>
                <div style={styles.rowMeta}>{item.total} entries</div>
              </div>
              <div style={styles.percentBox}>{item.percent}%</div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>By month</h3>
          {monthlyCards.map((item) => (
            <div key={item.month} style={styles.row}>
              <div style={styles.rowLabel}>
                <strong>{item.month}</strong>
                <div style={styles.rowMeta}>{item.total} entries</div>
              </div>
              <div style={styles.percentBox}>{item.percent}%</div>
            </div>
          ))}
        </div>
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
    marginBottom: 20
  },
  title: {
    margin: 0,
    fontSize: 24,
    color: '#0f172a'
  },
  subtext: {
    margin: '6px 0 0',
    color: '#64748b'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20
  },
  card: {
    background: '#fff',
    borderRadius: 18,
    padding: 20,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
  },
  cardTitle: {
    margin: '0 0 12px',
    fontSize: 16,
    color: '#0f172a'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #f1f5f9'
  },
  rowLabel: {
    display: 'grid',
    gap: 4
  },
  rowMeta: {
    fontSize: 12,
    color: '#64748b'
  },
  percentBox: {
    background: '#e2e8f0',
    color: '#334155',
    borderRadius: 999,
    padding: '6px 10px',
    fontWeight: 700
  }
};

export default DashboardPage;