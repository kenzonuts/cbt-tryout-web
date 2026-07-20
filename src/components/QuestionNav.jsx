export default function QuestionNav({
  questions,
  answers,
  currentIndex,
  onSelect,
}) {
  return (
    <nav className="question-nav" aria-label="Navigasi nomor soal">
      {questions.map((q, index) => {
        const answered = Boolean(answers[q.id])
        const active = index === currentIndex
        return (
          <button
            key={q.id}
            type="button"
            className={[
              'qnav-btn',
              answered ? 'qnav-btn--answered' : '',
              active ? 'qnav-btn--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSelect(index)}
            aria-current={active ? 'true' : undefined}
            aria-label={`Soal ${q.number}${answered ? ', sudah dijawab' : ''}`}
          >
            {q.number}
          </button>
        )
      })}
    </nav>
  )
}
