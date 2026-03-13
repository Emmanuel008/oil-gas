import React from 'react';
import './GasSentinelDashboard.css';

type MetricColor = 'green' | 'red' | 'blue';

interface MetricCardProps {
    title: string;
    value: string;
    unit?: string;
    color: MetricColor;
    description: string;
    meta?: string;
}

const valueColorClass = (color: MetricColor) => {
    switch (color) {
        case 'green':
            return 'gs-value gs-value--green';
        case 'red':
            return 'gs-value gs-value--red';
        case 'blue':
            return 'gs-value gs-value--blue';
    }
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, color, description, meta }) => (
    <div className="gs-card">
        <div className="gs-card-title">{title}</div>
        <div className="gs-card-main">
            <span className={valueColorClass(color)}>{value}</span>
            {unit && <span className="gs-unit">{unit}</span>}
        </div>
        <div className="gs-footer-pill">{description}</div>
        {meta && <div className="gs-footer-meta">{meta}</div>}
    </div>
);

type ActivityRow = {
    timestamp: string;
    device: string;
    level: string;
    gasPpm: string;
    distance: string;
    signal: string;
    wifi: string;
};

const generateActivityRows = (): ActivityRow[] => {
    const rows: ActivityRow[] = [];
    const now = new Date();
    const wifiSamples = [-48, -31, -29, -37, -36, -34, -41, -32, -37, -30];

    for (let i = 0; i < 200; i++) {
        const d = new Date(now.getTime() - i * 30 * 1000); // every 30s
        const hours12 = ((d.getHours() + 11) % 12) + 1;
        const mm = `${d.getMinutes()}`.padStart(2, '0');
        const ss = `${d.getSeconds()}`.padStart(2, '0');
        const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[d.getMonth()];
        const day = `${d.getDate()}`.padStart(2, '0');
        const timeLabel = `${month} ${day}, ${hours12}:${mm}:${ss} ${ampm}`;

        const wifi = wifiSamples[i % wifiSamples.length];

        rows.push({
            timestamp: timeLabel,
            device: 'LPG_MONITOR_001',
            level: '100.0%',
            gasPpm: '200 ppm',
            distance: '509.0 cm',
            signal: '0.0%',
            wifi: `${wifi} dBm`,
        });
    }

    return rows;
};

const GasSentinelDashboard: React.FC = () => {
    const [activityRows, setActivityRows] = React.useState<ActivityRow[]>(() => generateActivityRows());

    React.useEffect(() => {
        const id = window.setInterval(() => {
            setActivityRows(generateActivityRows());
        }, 5000);
        return () => window.clearInterval(id);
    }, []);

    const lastUpdate = activityRows.length > 0 ? activityRows[0].timestamp : '—';

    return (
        <div className="gs-page">
            <header>
                <h1 className="gs-header-title">GAS SENTINEL</h1>
                <div className="gs-header-subtitle">REAL-TIME ENVIRONMENTAL MONITORING SYSTEM</div>
                <div className="gs-status-row">
                    <span className="gs-status-dot" />
                    <span className="gs-status-label">System Online</span>
                    <span>|</span>
                    <span>Last update: {lastUpdate}</span>
                </div>
            </header>

            <section className="gs-grid">
                <MetricCard
                    title="Gas Level Remaining"
                    value="100.0"
                    unit="%"
                    color="green"
                    description="Sufficient gas remaining"
                />
                <MetricCard
                    title="Gas Concentration"
                    value="200"
                    unit="ppm"
                    color="green"
                    description="Normal concentration"
                />
                <MetricCard
                    title="Signal Quality"
                    value="0.0"
                    unit="%"
                    color="red"
                    description="Weak sensor signal"
                />
                <MetricCard
                    title="Distance Sensor"
                    value="509.0"
                    unit="cm"
                    color="blue"
                    description="Distance reading stable"
                    meta="Raw: 509.0cm | Avg: 509.0cm"
                />
                <MetricCard
                    title="WiFi Signal"
                    value="-48"
                    unit="dBm"
                    color="green"
                    description="Excellent WiFi"
                />
                <MetricCard
                    title="Device ID"
                    value="LPG_MONITOR_001"
                    color="blue"
                    description="Active · Signal: 0"
                />
            </section>

            <section className="gs-activity">
                <div className="gs-activity-title">RECENT ACTIVITY LOG</div>
                <div className="gs-activity-table-wrapper">
                    <table className="gs-activity-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Device</th>
                                <th>Level %</th>
                                <th>Gas ppm</th>
                                <th>Distance</th>
                                <th>Signal</th>
                                <th>WiFi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityRows.map((row, idx) => (
                                <tr key={idx}>
                                    <td>{row.timestamp}</td>
                                    <td>{row.device}</td>
                                    <td>{row.level}</td>
                                    <td>{row.gasPpm}</td>
                                    <td>{row.distance}</td>
                                    <td>{row.signal}</td>
                                    <td>{row.wifi}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <footer className="gs-footer">
                <div className="gs-footer-divider" />
                <div className="gs-footer-text-primary">
                    GAS SENTINEL v1.0 | ESP32 IoT Monitoring System
                </div>
                <div className="gs-footer-text-secondary">
                    Powered by Flask + SQLite | Real-time WebSocket Updates
                </div>
            </footer>
        </div>
    );
};

export default GasSentinelDashboard;

