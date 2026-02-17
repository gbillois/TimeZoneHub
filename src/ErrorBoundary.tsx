import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '24px',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          gap: '16px',
          background: '#0b0f19',
          color: '#e8edf8',
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#f87171" strokeWidth="2"/>
            <path d="M24 14v12M24 32v2" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#f87171', margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '14px', color: '#8fa3c0', maxWidth: '360px', lineHeight: 1.6, margin: 0 }}>
            {this.state.error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
          <details style={{ fontSize: '11px', color: '#5a6e88', maxWidth: '480px', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>Stack trace</summary>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {this.state.error.stack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
