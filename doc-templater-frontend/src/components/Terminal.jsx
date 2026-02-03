import React, { useEffect, useRef } from 'react';

const Terminal = ({ logs = [] }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div id="terminal-console" className="terminal-panel">
            <div className="terminal-header">
                <span>CONSOLE OUTPUT</span>
                <span className="blink">_</span>
            </div>
            <div className="terminal-body">
                {logs.map((log, i) => (
                    <div key={i} className="log-line">
                        <span className="prompt">{log.startsWith("root") ? "" : "> "}</span>
                        {log}
                    </div>
                ))}
                <div ref={bottomRef} className="log-line">
                    <span className="prompt">root@iron-kernel:~$</span> <span className="blink">█</span>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
