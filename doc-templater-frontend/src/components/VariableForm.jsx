export default function VariableForm({ variables, answers, setAnswers, onReviewComplete }) {
    return (
        <div className="card">
            <h2>Fill Required Details</h2>

            {variables.map((v) => (
                <div key={v.key} className="field">
                    <label>{v.label}</label>
                    <input
                        type="text"
                        value={answers[v.key] || ""}
                        onChange={(e) =>
                            setAnswers({ ...answers, [v.key]: e.target.value })
                        }
                    />
                </div>
            ))}

            <button
                onClick={onReviewComplete}
                style={{
                    marginTop: '20px',
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(229, 9, 20, 0.1)',
                    border: '1px solid #E50914',
                    color: '#E50914',
                    cursor: 'pointer',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '1px'
                }}
            >
                REVIEW & SUBMIT DATA VECTORS →
            </button>
        </div>
    );
}
