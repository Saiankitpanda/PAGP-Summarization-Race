import React, { useState, useEffect } from 'react';

const Sidebar = () => {
    // Live fluctuating stats - CS/PAGP Lab Concepts
    const [workers, setWorkers] = useState({ active: 4, total: 8 });
    const [latency, setLatency] = useState(12);
    const [throughput, setThroughput] = useState(245);
    const [cacheHit, setCacheHit] = useState(87);
    const [gpuUtil, setGpuUtil] = useState(67);
    const [gpuMem, setGpuMem] = useState(4.2);

    useEffect(() => {
        // Simulate parallel processing dynamics
        const statsInterval = setInterval(() => {
            // Workers fluctuate (parallel processing concept)
            setWorkers({
                active: Math.floor(Math.random() * 6) + 3, // 3-8 workers
                total: 8
            });

            // Latency varies (network/processing delay)
            setLatency(Math.floor(Math.random() * 15) + 8); // 8-22ms

            // Throughput (docs/sec - PAGP pipeline efficiency)
            setThroughput(Math.floor(Math.random() * 100) + 200); // 200-300 docs/sec

            // Cache hit rate (memory optimization)
            setCacheHit(Math.floor(Math.random() * 15) + 82); // 82-97%

            // GPU Utilization (PAGP Lab - parallel GPU processing)
            setGpuUtil(Math.floor(Math.random() * 25) + 60); // 60-85%

            // GPU Memory Usage (GB)
            setGpuMem((Math.random() * 2 + 3.5).toFixed(1)); // 3.5-5.5 GB
        }, 1200);

        return () => clearInterval(statsInterval);
    }, []);

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="brand">IRON KERNEL</h2>
                <div className="status-badge pulsing">ONLINE</div>
            </div>

            <div className="system-stats">
                <div className="stat-item">
                    <label>MODE</label>
                    <span className="value">PARALLEL_EXEC</span>
                </div>
                <div className="stat-item">
                    <label>WORKERS</label>
                    <span className="value text-success fluctuate">
                        {workers.active} / {workers.total} ACTV
                    </span>
                </div>
                <div className="stat-item">
                    <label>LATENCY</label>
                    <span className="value fluctuate">{latency}ms</span>
                </div>
                <div className="stat-item">
                    <label>THROUGHPUT</label>
                    <span className="value text-cyan fluctuate">{throughput} d/s</span>
                </div>
                <div className="stat-item">
                    <label>CACHE HIT</label>
                    <span className="value text-success fluctuate">{cacheHit}%</span>
                </div>
                <div className="stat-item">
                    <label>GPU UTIL</label>
                    <span className="value text-yellow fluctuate">{gpuUtil}%</span>
                </div>
                <div className="stat-item">
                    <label>GPU MEM</label>
                    <span className="value text-yellow fluctuate">{gpuMem} GB</span>
                </div>
                <div className="stat-item">
                    <label>KERNEL</label>
                    <span className="value">v10.4.2-IK</span>
                </div>
            </div>

            <div className="modules-list">
                <div className="module-item active">DOC_INGEST</div>
                <div className="module-item">CHUNK_MGR</div>
                <div className="module-item">VAR_EXTRACT</div>
                <div className="module-item">TMPL_FORGE</div>
            </div>
        </aside>
    );
};

export default Sidebar;
