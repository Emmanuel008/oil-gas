import React from 'react';
import OilAndGasDashboardShowcase from './OilAndGas/OilAndGasDashboardShowcase';

const cardStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#111113',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 16px',
    boxSizing: 'border-box',
};

const cardInnerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1400px',
    borderRadius: '12px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
    overflow: 'hidden',
    border: '1px solid #2a2a2e',
};

const cardHeaderStyle: React.CSSProperties = {
    background: '#1c1c1e',
    borderBottom: '1px solid #2a2a2e',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

const dotStyle = (color: string): React.CSSProperties => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: color,
});

const titleStyle: React.CSSProperties = {
    color: '#e0e0e0',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    letterSpacing: '0.5px',
    marginLeft: 8,
};

function App() {
    return (
        <div style={cardStyle}>
            <div style={cardInnerStyle}>
                <div style={cardHeaderStyle}>
                    <div style={dotStyle('#FF5F57')} />
                    <div style={dotStyle('#FFBD2E')} />
                    <div style={dotStyle('#28C840')} />
                    <span style={titleStyle}>oil-gas</span>
                </div>
                <OilAndGasDashboardShowcase />
            </div>
        </div>
    );
}

export default App;
