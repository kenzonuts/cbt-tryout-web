export const DUMMY_CREDENTIALS = {
  username: 'peserta',
  password: '1234',
}

/** PIN admin sederhana untuk demo — bukan keamanan production. */
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
}

export const dummyQuestions = [
  {
    id: 'q1',
    number: 1,
    text: 'Ibukota negara Indonesia adalah…',
    options: [
      { key: 'A', label: 'Surabaya' },
      { key: 'B', label: 'Bandung' },
      { key: 'C', label: 'Jakarta' },
      { key: 'D', label: 'Medan' },
      { key: 'E', label: 'Makassar' },
    ],
    correctKey: 'C',
  },
  {
    id: 'q2',
    number: 2,
    text: 'Hasil dari 12 × 8 adalah…',
    options: [
      { key: 'A', label: '86' },
      { key: 'B', label: '96' },
      { key: 'C', label: '108' },
      { key: 'D', label: '88' },
      { key: 'E', label: '92' },
    ],
    correctKey: 'B',
  },
  {
    id: 'q3',
    number: 3,
    text: 'Planet terdekat dengan Matahari adalah…',
    options: [
      { key: 'A', label: 'Venus' },
      { key: 'B', label: 'Bumi' },
      { key: 'C', label: 'Mars' },
      { key: 'D', label: 'Merkurius' },
      { key: 'E', label: 'Jupiter' },
    ],
    correctKey: 'D',
  },
  {
    id: 'q4',
    number: 4,
    text: 'Bahasa pemrograman yang berjalan di browser dan sering dipakai untuk UI web adalah…',
    options: [
      { key: 'A', label: 'Python' },
      { key: 'B', label: 'Java' },
      { key: 'C', label: 'C++' },
      { key: 'D', label: 'JavaScript' },
      { key: 'E', label: 'Go' },
    ],
    correctKey: 'D',
  },
  {
    id: 'q5',
    number: 5,
    text:
      'Dalam skenario Computer Based Test (CBT), peserta diminta tetap fokus pada jendela ujian. ' +
      'Event browser yang menandai tab atau halaman tidak terlihat — misalnya saat peserta memindah tab, ' +
      'membuka aplikasi lain, atau menekan tombol Home di perangkat seluler — adalah…',
    options: [
      { key: 'A', label: 'click' },
      { key: 'B', label: 'visibilitychange' },
      { key: 'C', label: 'scroll' },
      { key: 'D', label: 'resize' },
      { key: 'E', label: 'submit' },
    ],
    correctKey: 'B',
  },
]
