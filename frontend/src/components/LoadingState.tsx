const LoadingState: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '24px' }}>
      <div style={{ maxWidth: '896px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px', height: '32px', backgroundColor: '#d1d5db', borderRadius: '8px', width: '33%' }}></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '16px' }}>
            <div style={{ height: '24px', backgroundColor: '#d1d5db', borderRadius: '4px', width: '75%', marginBottom: '16px' }}></div>
            <div style={{ height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px', width: '100%', marginBottom: '8px' }}></div>
            <div style={{ height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px', width: '66%', marginBottom: '16px' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;