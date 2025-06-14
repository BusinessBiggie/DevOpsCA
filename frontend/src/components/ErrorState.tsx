interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '24px' }}>
      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#991b1b', marginBottom: '8px' }}>Error Loading Posts</h2>
          <p style={{ color: '#dc2626' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '16px', 
              padding: '8px 16px', 
              backgroundColor: '#dc2626', 
              color: 'white', 
              borderRadius: '4px', 
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;