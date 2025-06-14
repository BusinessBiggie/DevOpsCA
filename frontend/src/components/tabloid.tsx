// Tabloid.tsx - Main Component
import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { Post } from '../entities/types';
import { fetchPosts } from '../api/api';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import PostCard from './PostCard';

const Tabloid: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async (): Promise<void> => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '16px 24px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', margin: 0 }}>VIA Tabloid</h1>
          <p style={{ color: '#6b7280', marginTop: '4px', margin: 0 }}>Latest updates and announcements</p>
        </div>
      </div>

      {/* Posts List */}
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '24px' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <User size={48} style={{ margin: '0 auto 16px auto', color: '#d1d5db' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>No posts yet</h3>
            <p style={{ color: '#6b7280' }}>Check back later for updates!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb', marginTop: '48px' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '32px 24px', textAlign: 'center', color: '#6b7280' }}>
          <p>VIA Tabloid • Stay updated with the latest news</p>
        </div>
      </div>
    </div>
  );
};

export default Tabloid;