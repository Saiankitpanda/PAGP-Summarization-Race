import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Terminal from "./components/Terminal";
import Dashboard from "./components/Dashboard";
import { templates } from "./mock/templates";
import "./style.css";

function App() {
    const [booted, setBooted] = useState(false);
    const [data, setData] = useState(null);
    const [answers, setAnswers] = useState({});
    const [uploadHistory, setUploadHistory] = useState([
        { id: 101, name: "AADHAR_VERIFIED_SECURE.pdf", type: "aadhar_card", status: "PROCESSED" },
        { id: 102, name: "COMMERCIAL_LEASE_AGREEMENT.docx", type: "real_estate", status: "PROCESSED" },
        { id: 103, name: "ADMISSION_FORM_ENGINEERING.pdf", type: "admission_form", status: "PROCESSED" },
        { id: 104, name: "RATION_CARD_DIGITIZED.json", type: "ration_card", status: "PROCESSED" }
    ]);

    const [logs, setLogs] = useState([
        "root@iron-kernel:~$ init_sequence.sh",
        "[OK] Loading kernel modules...",
        "[OK] Connecting to parallel grid...",
        "[INFO] 8 workers detected.",
        "root@iron-kernel:~$ ready"
    ]);

    useEffect(() => {
        // Info for boot sequence
        setTimeout(() => setBooted(true), 3500);

        // Random background logs
        const interval = setInterval(() => {
            const messages = [
                "[INFO] Worker_01 reporting heartbeat...",
                "[INFO] Chunk_003 alloc_mem success",
                "[DEBUG] Analyzing variable vectors...",
                "[NET] Packet received from EXT_API",
                "root@iron-kernel:~$ status_check"
            ];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            setLogs(prev => [...prev.slice(-6), randomMsg]);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    const addLog = (message) => {
        setLogs(prev => [...prev.slice(-8), message]);
    };

    const handleUpload = (docType, isArchiveLoad = false) => {
        const selectedTemplate = templates[docType] || templates['service_agreement'];
        setData(selectedTemplate);
        setAnswers({});

        if (!isArchiveLoad) {
            addLog(`[UPLOAD] Initiating upload sequence for ${docType}...`);

            // Add to history
            const newDoc = {
                id: Date.now(),
                name: `${docType.toUpperCase()}_${new Date().toLocaleTimeString()}.pdf`,
                type: docType,
                status: 'PROCESSED'
            };
            setUploadHistory(prev => [newDoc, ...prev]);
            setTimeout(() => addLog(`[UPLOAD] ${newDoc.name} written to secure storage.`), 800);
        } else {
            addLog(`[ARCHIVE] Retrieving ${docType} from secure vault...`);
        }
    };

    const handleReset = () => {
        setData(null);
        setAnswers({});
        addLog('[RESET] System reset initiated. Returning to INGEST mode...');
    };

    if (!booted) {
        return (
            <div className="boot-screen">
                <div className="boot-terminal">
                    <div className="line">Initialize system kernel... [OK]</div>
                    <div className="line delay-1">Loading modules (pymupdf, docx, vite)... [OK]</div>
                    <div className="line delay-2">Mounting file system /home/jarvis/Desktop/PAGP... [OK]</div>
                    <div className="line delay-3">
                        <span style={{ color: '#FFD700' }}>⚡ GPU INITIALIZATION SEQUENCE</span>
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px' }}>
                        Detecting GPU hardware...
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px', color: '#00E5FF' }}>
                        └─ Found: NVIDIA Tesla V100-SXM2 [OK]
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px', color: '#00E5FF' }}>
                        └─ GPU Memory: 16384 MB [OK]
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px', color: '#00E5FF' }}>
                        └─ CUDA Cores: 5120 [OK]
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px' }}>
                        Initializing CUDA runtime v12.2...
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px', color: '#22FF88' }}>
                        └─ cudaMalloc() → 4096 MB [ALLOCATED]
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px', color: '#22FF88' }}>
                        └─ Kernel grid: 512 blocks x 128 threads [CONFIGURED]
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px' }}>
                        Starting parallel processing workers (8 CPU + 1 GPU)...
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px', color: '#22FF88' }}>
                        └─ Task parallelism enabled [OK]
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px', color: '#22FF88' }}>
                        └─ Data parallelism enabled [OK]
                    </div>
                    <div className="line delay-3" style={{ paddingLeft: '20px', color: '#E50914' }}>
                        ✓ GPU acceleration ready - Speedup: ~6.2x
                    </div>
                    <div className="line delay-3">Starting IRON KERNEL interface...</div>
                    <div className="cursor">_</div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <header className="top-bar">
                    <h1 className="screen-title">PARALLEL DOC ENGINE // DASHBOARD</h1>
                    <div className="user-profile">USER: JARVIS</div>
                </header>
                <Dashboard
                    data={data}
                    onUpload={handleUpload}
                    answers={answers}
                    setAnswers={setAnswers}
                    history={uploadHistory}
                    addLog={addLog}
                    onReset={handleReset}
                />
                <Terminal logs={logs} />
            </main>
        </div>
    );
}

export default App;
