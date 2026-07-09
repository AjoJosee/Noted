export const attendanceSeedData = [
  {
    date: '2026-07-01',
    periods: [
      { subject: 'Period 1', status: 'absent' },
      { subject: 'Period 2', status: 'present' },
      { subject: 'Period 3', status: 'absent' },
      { subject: 'Period 4', status: 'present' },
      { subject: 'Period 5', status: 'present' }
    ]
  },
  {
    date: '2026-07-02',
    periods: [
      { subject: 'Period 1', status: 'present' },
      { subject: 'Period 2', status: 'present' },
      { subject: 'Period 3', status: 'absent' },
      { subject: 'Period 4', status: 'present' },
      { subject: 'Period 5', status: 'present' }
    ]
  },
  {
    date: '2026-07-03',
    periods: [
      { subject: 'Period 1', status: 'present' },
      { subject: 'Period 2', status: 'absent' },
      { subject: 'Period 3', status: 'present' },
      { subject: 'Period 4', status: 'present' },
      { subject: 'Period 5', status: 'absent' }
    ]
  },
  {
    date: '2026-07-04',
    periods: [
      { subject: 'Period 1', status: 'present' },
      { subject: 'Period 2', status: 'present' },
      { subject: 'Period 3', status: 'present' },
      { subject: 'Period 4', status: 'absent' },
      { subject: 'Period 5', status: 'present' }
    ]
  },
  {
    date: '2026-07-06',
    periods: [
      { subject: 'Period 1', status: 'absent' },
      { subject: 'Period 2', status: 'present' },
      { subject: 'Period 3', status: 'present' },
      { subject: 'Period 4', status: 'present' },
      { subject: 'Period 5', status: 'present' }
    ]
  },
  {
    date: '2026-07-07',
    periods: [
      { subject: 'Period 1', status: 'present' },
      { subject: 'Period 2', status: 'present' },
      { subject: 'Period 3', status: 'absent' },
      { subject: 'Period 4', status: 'present' },
      { subject: 'Period 5', status: 'present' }
    ]
  },
  {
    date: '2026-07-08',
    periods: [
      { subject: 'Period 1', status: 'present' },
      { subject: 'Period 2', status: 'absent' },
      { subject: 'Period 3', status: 'present' },
      { subject: 'Period 4', status: 'present' },
      { subject: 'Period 5', status: 'absent' }
    ]
  },
  {
    date: '2026-07-10',
    periods: [
      { subject: 'Period 1', status: 'present' },
      { subject: 'Period 2', status: 'present' },
      { subject: 'Period 3', status: 'present' },
      { subject: 'Period 4', status: 'absent' },
      { subject: 'Period 5', status: 'present' }
    ]
  }
];

export const initialEvents = [
  {
    id: 1,
    title: 'Review session',
    date: '2026-07-02',
    time: '09:00',
    color: '#334155'
  },
  {
    id: 2,
    title: 'Assessment',
    date: '2026-07-04',
    time: '11:00',
    color: '#0f766e'
  },
  {
    id: 3,
    title: 'Check-in',
    date: '2026-07-08',
    time: '08:30',
    color: '#2563eb'
  }
];

export const getAttendanceForDate = (dateKey) => {
  const match = attendanceSeedData.find((entry) => entry.date === dateKey);
  if (match) return match.periods;

  return [
    { subject: 'Period 1', status: 'present' },
    { subject: 'Period 2', status: 'present' },
    { subject: 'Period 3', status: 'present' },
    { subject: 'Period 4', status: 'present' },
    { subject: 'Period 5', status: 'present' }
  ];
};