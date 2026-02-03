import React, { useState, useEffect } from 'react';

export default function Preview({ template, answers }) {
    const [generatedText, setGeneratedText] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        let output = template;
        Object.keys(answers).forEach((key) => {
            output = output.replaceAll(`{{${key}}}`, answers[key] || "______");
        });
        setGeneratedText(output);
    }, [template, answers]);

    return (
        <div className="card">
            <div className="preview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Generated Artifact</h2>
                <button onClick={() => setIsEditing(!isEditing)} style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                    {isEditing ? 'SAVE CHANGES' : 'EDIT ARTIFACT'}
                </button>
            </div>

            {isEditing ? (
                <textarea
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    style={{
                        width: '100%',
                        height: '400px',
                        background: '#0d1117',
                        color: '#E6EDF3',
                        border: '1px solid #30363D',
                        padding: '15px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.9rem',
                        lineHeight: '1.6'
                    }}
                />
            ) : (
                <div className="document-preview">
                    <pre style={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.8',
                        fontSize: '0.95rem',
                        padding: '20px',
                        background: 'rgba(22, 27, 34, 0.4)',
                        border: '1px solid #30363D',
                        borderRadius: '4px'
                    }}>{generatedText}</pre>
                </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                    onClick={() => {
                        const blob = new Blob([generatedText], { type: "text/plain" });
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = "artifact_final.txt";
                        link.click();
                    }}
                >
                    DOWNLOAD TXT
                </button>

                <button
                    onClick={() => {
                        const blob = new Blob([JSON.stringify(answers, null, 2)], { type: "application/json" });
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = "variable_data.json";
                        link.click();
                    }}
                    style={{ borderColor: '#00E5FF', color: '#00E5FF' }}
                >
                    EXPORT JSON
                </button>

                <button
                    onClick={() => window.print()}
                    style={{ borderColor: '#E50914', color: '#E50914' }}
                >
                    PRINT PDF
                </button>
            </div>
        </div>
    );
}
