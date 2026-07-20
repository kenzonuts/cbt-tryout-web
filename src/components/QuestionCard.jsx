export default function QuestionCard({ question, selectedKey, onSelect, disabled }) {
  if (!question) return null

  return (
    <section className="question-card">
      <p className="question-card__meta">
        Soal {question.number}
      </p>
      <h2 className="question-card__text">{question.text}</h2>
      <div className="options" role="radiogroup" aria-label={`Opsi soal ${question.number}`}>
        {question.options.map((opt) => {
          const checked = selectedKey === opt.key
          return (
            <label
              key={opt.key}
              className={`option${checked ? ' option--selected' : ''}${disabled ? ' option--disabled' : ''}`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={opt.key}
                checked={checked}
                disabled={disabled}
                onChange={() => onSelect(opt.key)}
              />
              <span className="option__key">{opt.key}</span>
              <span className="option__label">{opt.label}</span>
            </label>
          )
        })}
      </div>
    </section>
  )
}
