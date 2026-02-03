import React, { useState, useEffect } from 'react';
import UploadBox from './UploadBox';
import VariableForm from './VariableForm';
import Preview from './Preview';



const Dashboard = ({ data, onUpload, answers, setAnswers, history = [], addLog, onReset }) => {
    const [activeTab, setActiveTab] = useState('INGEST');
    const [selectedDocId, setSelectedDocId] = useState(null);
    const [docStatuses, setDocStatuses] = useState({});
    const [benchmarkResults, setBenchmarkResults] = useState(null);
    const [summaryRace, setSummaryRace] = useState(null);

    const runSummaryRace = () => {
        if (summaryRace?.status === 'RUNNING') return;

        addLog("[RACE] Initializing Parallel Summarization Protocol...");
        setSummaryRace({
            status: 'RUNNING',
            cpuProgress: 0,
            gpuProgress: 0,
            cpuLogs: [],
            gpuLogs: []
        });

        // CPU Simulation (Linear, Slow)
        let cpuP = 0;
        const cpuInterval = setInterval(() => {
            cpuP += Math.random() * 2; // Slow increment
            if (cpuP >= 100) {
                cpuP = 100;
                clearInterval(cpuInterval);
            }
            setSummaryRace(prev => ({
                ...prev,
                cpuProgress: cpuP,
                cpuLogs: [...prev.cpuLogs, `[CPU] Processing token batch ${Math.floor(cpuP)}%...`].slice(-5)
            }));
        }, 150);

        // GPU Simulation (Parallel, Fast)
        let gpuP = 0;
        const gpuInterval = setInterval(() => {
            gpuP += Math.random() * 15; // Fast increment
            if (gpuP >= 100) {
                gpuP = 100;
                clearInterval(gpuInterval);
            }
            setSummaryRace(prev => ({
                ...prev,
                gpuProgress: gpuP,
                gpuLogs: [...prev.gpuLogs, `[GPU] Kernel processed batch ${Math.floor(gpuP)}% (Tensor Cores Active)`].slice(-5)
            }));
        }, 150);

        // Completion Check
        const checkInterval = setInterval(() => {
            if (cpuP >= 100 && gpuP >= 100) {
                clearInterval(checkInterval);
                const finalCpuTime = 7500; // Simulated ~7.5s
                const finalGpuTime = 1200; // Simulated ~1.2s

                setSummaryRace(prev => ({
                    ...prev,
                    status: 'COMPLETE',
                    cpuTime: finalCpuTime,
                    gpuTime: finalGpuTime,
                    speedup: (finalCpuTime / finalGpuTime).toFixed(1),
                    docStats: {
                        tokens: '6,450',
                        words: '4,820',
                        pages: '14'
                    },
                    cpuMethod: "Executed sequentially using a single thread. The CPU processed each sentence one-by-one, waiting for the previous operation to complete before starting the next.",
                    gpuMethod: "Executed in parallel using 512 CUDA cores. The document was split into vector chunks, and all chunks were processed simultaneously, drastically reducing total time.",
                    summary: "DOCUMENT SUMMARY: The agreement establishes a service relationship between the Company and Contractor. Key terms include defined services, fee structure, and confidentiality obligations. Jurisdiction is unspecified but implied to be binding. (Generated via GPU-Accelerated LLM)"
                }));
                addLog(`[RACE] Summarization Complete. GPU Speedup: ${(finalCpuTime / finalGpuTime).toFixed(1)}x`);
            }
        }, 500);
    };

    const runBenchmark = () => {
        addLog("[BENCH] Initializing performance benchmark...");
        setBenchmarkResults({ status: 'RUNNING', cpu: 0, gpu: 0 });

        // Simulate processing
        setTimeout(() => {
            const cpuTime = Math.floor(Math.random() * 500) + 1800; // ~2000ms
            const gpuTime = Math.floor(Math.random() * 100) + 250;  // ~300ms

            setBenchmarkResults({
                status: 'COMPLETE',
                cpu: cpuTime,
                gpu: gpuTime,
                speedup: (cpuTime / gpuTime).toFixed(1)
            });
            addLog(`[BENCH] Complete: CPU=${cpuTime}ms | GPU=${gpuTime}ms (Speedup: ${(cpuTime / gpuTime).toFixed(1)}x)`);
        }, 2000);
    };

    // Generate live preview text
    const generatePreview = () => {
        if (!data) return '';
        let output = data.template;
        Object.keys(answers).forEach((key) => {
            output = output.replaceAll(`{{${key}}}`, answers[key] || "______");
        });
        return output;
    };

    const tabs = [
        { id: 'INGEST', label: '1. DEPLOY DOC' },
        { id: 'CHUNKING', label: '2. CHUNKING' },
        { id: 'EXECUTION', label: '3. PARALLEL EXEC' },
        { id: 'GPU_PAGP', label: '4. GPU/PAGP LAB' },
        { id: 'EXTRACTION', label: '5. VARIABLES' },
        { id: 'FORGE', label: '6. ARTIFACT' },
        { id: 'LIBRARY', label: '7. ARCHIVE' },

    ];

    // Auto-switch tabs based on state
    useEffect(() => {
        if (data && activeTab === 'INGEST') {
            setActiveTab('EXTRACTION');
        }
    }, [data]);

    return (
        <div className="dashboard">
            <div className="tab-nav">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        disabled={!data && tab.id !== 'INGEST' && tab.id !== 'LIBRARY'}
                    >
                        {tab.label}
                    </button>
                ))}

                {data && (
                    <button
                        className="home-btn"
                        onClick={() => {
                            setActiveTab('INGEST');
                            onReset && onReset();
                        }}
                        style={{
                            marginLeft: 'auto',
                            background: 'rgba(229, 9, 20, 0.1)',
                            border: '1px solid #E50914',
                            color: '#E50914'
                        }}
                    >
                        🏠 HOME
                    </button>
                )}
            </div>

            <div className="tab-content">
                {activeTab === 'INGEST' && (
                    <div className="panel-container">
                        <h3 className="panel-title">Initiate Deployment</h3>
                        <UploadBox onUpload={onUpload} />
                    </div>
                )}

                {activeTab === 'CHUNKING' && data && (
                    <div className="panel-container">
                        <h3 className="panel-title">Chunk Distribution Visualizer</h3>
                        <p className="subtitle">CS Concept: Parallel Processing & Load Balancing (PAGP Lab)</p>
                        <div className="chunk-grid">
                            {[1, 2, 3, 4].map(n => (
                                <div
                                    key={n}
                                    className="chunk-card clickable"
                                    onClick={() => {
                                        addLog(`[CHUNK] Analyzing CHUNK_00${n} - Distributing to worker pool...`);
                                        setTimeout(() => addLog(`[CHUNK] CHUNK_00${n} processed successfully.`), 600);
                                    }}
                                >
                                    <div className="chunk-id">CHUNK_00{n}</div>
                                    <div className="progress-bar">
                                        <div className="fill animating" style={{ width: '100%' }}></div>
                                    </div>
                                    <div className="status pulsing">READY</div>
                                    <div className="chunk-info">
                                        <small>Size: {Math.floor(Math.random() * 200 + 150)}KB</small>
                                        <small>Lines: {Math.floor(Math.random() * 500 + 200)}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {activeTab === 'EXECUTION' && data && (
                    <div className="panel-container">
                        <h3 className="panel-title">Parallel Execution Matrix</h3>
                        <div className="worker-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                <div key={n} className="worker-card">
                                    <div className="worker-icon spin">⚙️</div>
                                    <div className="worker-info">
                                        <div>WORKER_{n}</div>
                                        <div className="text-success pulsing">PROCESSING...</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'GPU_PAGP' && data && (
                    <div className="panel-container">
                        <h3 className="panel-title">🎓 GPU & PAGP Lab Demonstration</h3>
                        <p className="subtitle">Parallel and GPU Programming Concepts (PAGP Lab Manual Reference)</p>

                        <div className="gpu-pagp-container">
                            {/* Benchmark Section */}
                            <div className="benchmark-section" style={{ marginBottom: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid #30363D' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <h4 style={{ margin: 0, color: '#fff' }}>⚡ Performance Benchmark: CPU vs GPU</h4>
                                    <button
                                        className="action-btn"
                                        onClick={runBenchmark}
                                        disabled={benchmarkResults?.status === 'RUNNING'}
                                        style={{ background: '#238636', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        {benchmarkResults?.status === 'RUNNING' ? 'RUNNING TEST...' : 'RUN BENCHMARK'}
                                    </button>
                                </div>

                                {benchmarkResults && (
                                    <div className="benchmark-graph">
                                        {/* CPU Bar */}
                                        <div className="bar-container" style={{ marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                                                <span>SEQUENTIAL (CPU)</span>
                                                <span>{benchmarkResults.status === 'RUNNING' ? 'Processing...' : `${benchmarkResults.cpu} ms`}</span>
                                            </div>
                                            <div style={{ width: '100%', height: '24px', background: '#30363D', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: benchmarkResults.status === 'RUNNING' ? '60%' : '100%',
                                                    height: '100%',
                                                    background: '#E50914',
                                                    transition: 'width 1s ease-out',
                                                    animation: benchmarkResults.status === 'RUNNING' ? 'pulse 1s infinite' : 'none'
                                                }}></div>
                                            </div>
                                        </div>

                                        {/* GPU Bar */}
                                        <div className="bar-container">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                                                <span>PARALLEL (GPU)</span>
                                                <span>{benchmarkResults.status === 'RUNNING' ? 'Processing...' : `${benchmarkResults.gpu} ms`}</span>
                                            </div>
                                            <div style={{ width: '100%', height: '24px', background: '#30363D', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: benchmarkResults.status === 'RUNNING' ? '60%' : `${(benchmarkResults.gpu / benchmarkResults.cpu) * 100}%`,
                                                    height: '100%',
                                                    background: '#22FF88',
                                                    transition: 'width 1s ease-out',
                                                    animation: benchmarkResults.status === 'RUNNING' ? 'pulse 1s infinite' : 'none'
                                                }}></div>
                                            </div>
                                        </div>

                                        {benchmarkResults.status === 'COMPLETE' && (
                                            <div style={{ marginTop: '15px', textAlign: 'center', padding: '10px', background: 'rgba(34, 255, 136, 0.1)', border: '1px solid #22FF88', borderRadius: '4px', color: '#22FF88', fontWeight: 'bold' }}>
                                                🚀 GPU ACCELERATION: {benchmarkResults.speedup}x FASTER
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Summarization Race Section */}
                            <div className="race-section" style={{ marginBottom: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid #30363D' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <div>
                                        <h4 style={{ margin: 0, color: '#fff' }}>📝 Real-World Task: Document Summarization</h4>
                                        <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#8B949E' }}>Compare token processing speed for LLM summarization.</p>
                                    </div>
                                    <button
                                        className="action-btn"
                                        onClick={runSummaryRace}
                                        disabled={summaryRace?.status === 'RUNNING'}
                                        style={{ background: '#1f6feb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        {summaryRace?.status === 'RUNNING' ? 'PROCESSING...' : 'START COMPARE'}
                                    </button>
                                </div>

                                {summaryRace && (
                                    <div className="race-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        {/* CPU Thread */}
                                        <div className="race-lane" style={{ background: '#0d1117', padding: '10px', borderRadius: '6px', border: '1px solid #30363D' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <span style={{ color: '#E50914', fontWeight: 'bold' }}>CPU THREAD</span>
                                                <span>{Math.floor(summaryRace.cpuProgress)}%</span>
                                            </div>
                                            <div style={{ height: '6px', background: '#30363D', borderRadius: '3px', marginBottom: '10px' }}>
                                                <div style={{ width: `${summaryRace.cpuProgress}%`, height: '100%', background: '#E50914', transition: 'width 0.2s' }}></div>
                                            </div>
                                            <div className="log-window" style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#8B949E', height: '80px', overflow: 'hidden' }}>
                                                {summaryRace.cpuLogs.map((log, i) => <div key={i}>{log}</div>)}
                                            </div>
                                        </div>

                                        {/* GPU Thread */}
                                        <div className="race-lane" style={{ background: '#0d1117', padding: '10px', borderRadius: '6px', border: '1px solid #30363D' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <span style={{ color: '#22FF88', fontWeight: 'bold' }}>GPU KERNEL</span>
                                                <span>{Math.floor(summaryRace.gpuProgress)}%</span>
                                            </div>
                                            <div style={{ height: '6px', background: '#30363D', borderRadius: '3px', marginBottom: '10px' }}>
                                                <div style={{ width: `${summaryRace.gpuProgress}%`, height: '100%', background: '#22FF88', transition: 'width 0.2s' }}></div>
                                            </div>
                                            <div className="log-window" style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#8B949E', height: '80px', overflow: 'hidden' }}>
                                                {summaryRace.gpuLogs.map((log, i) => <div key={i}>{log}</div>)}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {summaryRace?.status === 'COMPLETE' && (
                                    <div className="race-result" style={{ marginTop: '15px', padding: '15px', background: 'rgba(22, 27, 34, 0.5)', borderRadius: '6px', borderLeft: '4px solid #22FF88' }}>
                                        <h5 style={{ margin: '0 0 10px 0', color: '#22FF88' }}>✅ GPU GENERATED SUMMARY ({summaryRace.speedup}x Faster)</h5>

                                        {/* Doc Stats */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.75rem', color: '#8B949E' }}>TOKENS</div>
                                                <div style={{ fontWeight: 'bold', color: '#fff' }}>{summaryRace.docStats.tokens}</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.75rem', color: '#8B949E' }}>WORDS</div>
                                                <div style={{ fontWeight: 'bold', color: '#fff' }}>{summaryRace.docStats.words}</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.75rem', color: '#8B949E' }}>PAGES</div>
                                                <div style={{ fontWeight: 'bold', color: '#fff' }}>{summaryRace.docStats.pages}</div>
                                            </div>
                                        </div>

                                        <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', lineHeight: '1.5', color: '#C9D1D9', fontStyle: 'italic' }}>
                                            "{summaryRace.summary}"
                                        </p>

                                        {/* Processing Analysis */}
                                        <div style={{ borderTop: '1px solid #30363D', paddingTop: '15px', marginTop: '15px' }}>
                                            <h6 style={{ margin: '0 0 10px 0', color: '#fff' }}>📊 PROCESSING ANALYSIS</h6>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                <div>
                                                    <div style={{ color: '#E50914', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>CPU (SEQUENTIAL)</div>
                                                    <p style={{ fontSize: '0.8rem', color: '#8B949E', margin: 0 }}>{summaryRace.cpuMethod}</p>
                                                    <div style={{ marginTop: '5px', fontSize: '0.85rem', color: '#fff' }}>Time: {summaryRace.cpuTime}ms</div>
                                                </div>
                                                <div>
                                                    <div style={{ color: '#22FF88', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>GPU (PARALLEL)</div>
                                                    <p style={{ fontSize: '0.8rem', color: '#8B949E', margin: 0 }}>{summaryRace.gpuMethod}</p>
                                                    <div style={{ marginTop: '5px', fontSize: '0.85rem', color: '#fff' }}>Time: {summaryRace.gpuTime}ms</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* GPU Processing Visualization */}
                            <div className="gpu-section">
                                <h4 className="section-header">⚡ GPU Processing Pipeline</h4>
                                <div className="gpu-grid">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <div key={n} className="gpu-core" onClick={() => addLog(`[GPU] Core ${n} executing kernel function...`)}>
                                            <div className="core-id">CORE {n}</div>
                                            <div className="core-bar">
                                                <div
                                                    className="core-fill"
                                                    style={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                                                ></div>
                                            </div>
                                            <div className="core-status">ACTIVE</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="gpu-info">
                                    <p>💡 <strong>How GPU Works:</strong> GPUs consist of hundreds/thousands of small cores designed for parallel execution. Each core processes different data simultaneously (SIMD - Single Instruction Multiple Data).</p>
                                </div>
                            </div>

                            {/* PAGP Lab Concepts */}
                            <div className="pagp-concepts">
                                <h4 className="section-header">📚 PAGP Lab Manual - Concepts Applied</h4>
                                <div className="concept-cards">
                                    <div className="concept-card">
                                        <div className="concept-title">🔀 Parallel Processing</div>
                                        <div className="concept-desc">
                                            <strong>Lab Ref:</strong> Module 1 - Threads & Processes<br />
                                            Multiple workers process chunks simultaneously, reducing total execution time.
                                        </div>
                                        <div className="concept-formula">Speedup = T_serial / T_parallel</div>
                                    </div>

                                    <div className="concept-card">
                                        <div className="concept-title">🎯 Load Balancing</div>
                                        <div className="concept-desc">
                                            <strong>Lab Ref:</strong> Module 3 - Dynamic Scheduling<br />
                                            Work distribution across available cores to maximize throughput and minimize idle time.
                                        </div>
                                        <div className="concept-formula">Efficiency = Actual_Speedup / Ideal_Speedup</div>
                                    </div>

                                    <div className="concept-card">
                                        <div className="concept-title">💾 Memory Hierarchy</div>
                                        <div className="concept-desc">
                                            <strong>Lab Ref:</strong> Module 5 - Cache Optimization<br />
                                            Cache hit rate optimization reduces memory access latency (L1 → L2 → RAM → Disk).
                                        </div>
                                        <div className="concept-formula">Cache Hit Rate = Hits / (Hits + Misses)</div>
                                    </div>

                                    <div className="concept-card">
                                        <div className="concept-title">🚀 GPU Acceleration</div>
                                        <div className="concept-desc">
                                            <strong>Lab Ref:</strong> Module 7 - CUDA Programming<br />
                                            CUDA cores execute thousands of lightweight threads in parallel (SIMT architecture).
                                        </div>
                                        <div className="concept-formula">Grid[Blocks[Threads]]</div>
                                    </div>

                                    <div className="concept-card">
                                        <div className="concept-title">⚡ Throughput Optimization</div>
                                        <div className="concept-desc">
                                            <strong>Lab Ref:</strong> Module 4 - Pipeline Optimization<br />
                                            Maximize documents/second by overlapping I/O, processing, and output operations.
                                        </div>
                                        <div className="concept-formula">Throughput = Tasks / Time</div>
                                    </div>

                                    <div className="concept-card">
                                        <div className="concept-title">🔒 Synchronization</div>
                                        <div className="concept-desc">
                                            <strong>Lab Ref:</strong> Module 2 - Mutex & Barriers<br />
                                            Coordinate parallel workers to avoid race conditions and ensure data consistency.
                                        </div>
                                        <div className="concept-formula">mutex.lock() → critical_section → mutex.unlock()</div>
                                    </div>
                                </div>
                            </div>

                            {/* Command Terminal Section */}
                            <div className="command-section">
                                <h4 className="section-header">💻 GPU/CUDA Command Terminal</h4>
                                <div className="command-terminal">
                                    <div className="terminal-header">
                                        <span>root@iron-kernel:~/PAGP$</span>
                                    </div>
                                    <div className="terminal-body">
                                        <div className="cmd-line">
                                            <span className="prompt">$</span>
                                            <span className="cmd">nvidia-smi</span>
                                        </div>
                                        <div className="cmd-output">
                                            +-----------------------------------------------------------------------------+<br />
                                            | NVIDIA-SMI 535.104.05   Driver Version: 535.104.05   CUDA Version: 12.2    |<br />
                                            |-------------------------------+----------------------+----------------------+<br />
                                            | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |<br />
                                            | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |<br />
                                            |===============================+======================+======================|<br />
                                            |   0  Tesla V100-SXM2...  On   | 00000000:00:1E.0 Off |                    0 |<br />
                                            | N/A   42C    P0    67W / 300W |   4521MiB / 16384MiB |     72%      Default |<br />
                                            +-------------------------------+----------------------+----------------------+
                                        </div>

                                        <div className="cmd-line">
                                            <span className="prompt">$</span>
                                            <span className="cmd">nvcc --version</span>
                                        </div>
                                        <div className="cmd-output">
                                            nvcc: NVIDIA (R) Cuda compiler driver<br />
                                            Cuda compilation tools, release 12.2, V12.2.140
                                        </div>

                                        <div className="cmd-line">
                                            <span className="prompt">$</span>
                                            <span className="cmd">./parallel_doc_processor --workers 8 --gpu-enabled</span>
                                        </div>
                                        <div className="cmd-output">
                                            [INFO] Initializing 8 CPU workers...<br />
                                            [INFO] GPU Device found: Tesla V100<br />
                                            [INFO] Allocating GPU memory: 4.5 GB<br />
                                            [INFO] Launching CUDA kernels: 512 blocks x 128 threads<br />
                                            [SUCCESS] Processed 1247 documents in 3.2 seconds<br />
                                            [SUCCESS] Throughput: 389 docs/sec
                                        </div>

                                        <div className="cmd-line clickable-cmd" onClick={() => {
                                            addLog('[CMD] Executing: htop - System resource monitor');
                                            setTimeout(() => addLog('[CMD] CPU Usage: 67% | RAM: 8.2/16 GB | Processes: 147'), 400);
                                        }}>
                                            <span className="prompt">$</span>
                                            <span className="cmd">htop</span>
                                            <span className="cmd-hint">(click to run)</span>
                                        </div>

                                        <div className="cmd-line clickable-cmd" onClick={() => {
                                            addLog('[CMD] Executing: nvprof ./doc_processor');
                                            setTimeout(() => addLog('[NVPROF] Kernel execution time: 2.34ms | Memory transfer: 1.12ms'), 500);
                                        }}>
                                            <span className="prompt">$</span>
                                            <span className="cmd">nvprof ./doc_processor</span>
                                            <span className="cmd-hint">(click to profile)</span>
                                        </div>

                                        <div className="cmd-line">
                                            <span className="prompt">$</span>
                                            <span className="cursor-blink">_</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="command-info">
                                    <p>💡 <strong>Common PAGP Commands:</strong></p>
                                    <ul>
                                        <li><code>nvidia-smi</code> - Monitor GPU status and utilization</li>
                                        <li><code>nvcc</code> - NVIDIA CUDA Compiler for .cu files</li>
                                        <li><code>nvprof</code> - CUDA profiler to measure kernel performance</li>
                                        <li><code>htop</code> - Interactive process viewer for CPU monitoring</li>
                                        <li><code>valgrind</code> - Memory leak detection and profiling</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'EXTRACTION' && data && (
                    <div className="panel-container split-view">
                        <div className="split-left">
                            <h3 className="panel-title">Variable Vectors Identified</h3>
                            <VariableForm
                                variables={data.variables}
                                answers={answers}
                                setAnswers={setAnswers}
                                onReviewComplete={() => setActiveTab('FORGE')}
                            />
                        </div>
                        <div className="split-right">
                            <h3 className="panel-title">Live Preview</h3>
                            <div className="live-preview-panel">
                                <pre style={{
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: '1.8',
                                    fontSize: '0.9rem',
                                    padding: '15px',
                                    background: 'rgba(22, 27, 34, 0.4)',
                                    border: '1px solid #30363D',
                                    borderRadius: '4px',
                                    minHeight: '400px'
                                }}>
                                    {generatePreview()}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'FORGE' && data && (
                    <div className="panel-container">
                        <h3 className="panel-title">Final Artifact Assembly</h3>
                        <Preview template={data.template} answers={answers} />
                    </div>
                )}

                {activeTab === 'LIBRARY' && (
                    <div className="panel-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 className="panel-title" style={{ marginBottom: 0 }}>Secure Archive</h3>
                            <span style={{ fontSize: '0.8rem', color: '#8B949E' }}>{history.length} OBJECTS STORED</span>
                        </div>

                        <div style={{ display: 'grid', gap: '10px' }}>
                            {history.map(doc => {
                                const isSelected = selectedDocId === doc.id;
                                const status = docStatuses[doc.id] || 'IDLE'; // IDLE, ACTIVE, DONE

                                return (
                                    <div
                                        key={doc.id}
                                        className={`archive-row ${isSelected ? 'selected' : ''}`}
                                        onClick={() => {
                                            setSelectedDocId(doc.id);
                                            addLog && addLog(`[SELECT] Object ${doc.name} selected.`);
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div className={`status-dot ${status === 'ACTIVE' ? 'blink-slow' : ''}`}
                                                style={{
                                                    width: '6px',
                                                    height: '6px',
                                                    borderRadius: '50%',
                                                    background: status === 'ACTIVE' ? '#22FF88' : '#30363D'
                                                }}
                                            />
                                            <span style={{ color: isSelected ? '#fff' : '#8B949E', fontWeight: isSelected ? 'bold' : 'normal' }}>
                                                {doc.name}
                                            </span>
                                        </div>

                                        <button
                                            className="access-btn"
                                            disabled={status === 'ACTIVE'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addLog && addLog(`[ACCESS] Decrypting ${doc.name}...`);
                                                setDocStatuses(prev => ({ ...prev, [doc.id]: 'ACTIVE' }));

                                                // Scroll to terminal to show "work"
                                                const terminal = document.getElementById('terminal-console');
                                                if (terminal) terminal.scrollIntoView({ behavior: 'smooth' });

                                                setTimeout(() => {
                                                    addLog && addLog(`[EXEC] Running artifact integrity check...`);
                                                    setTimeout(() => {
                                                        addLog && addLog(`[SUCCESS] ${doc.name} verified securely.`);
                                                        setDocStatuses(prev => ({ ...prev, [doc.id]: 'DONE' }));

                                                        // LOAD THE DOCUMENT
                                                        onUpload(doc.type, true);
                                                        setActiveTab('EXTRACTION');

                                                        // Scroll back up to dashboard
                                                        const dashboard = document.querySelector('.dashboard');
                                                        if (dashboard) dashboard.scrollIntoView({ behavior: 'smooth' });
                                                    }, 1500);
                                                }, 800);
                                            }}
                                        >
                                            {status === 'ACTIVE' ? 'PROCESSING' : 'ACCESS'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Dashboard;
