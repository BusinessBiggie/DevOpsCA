// Tabloid.tsx - Main Component
import { useState, useEffect } from 'react';
import { User, Plus } from 'lucide-react';
import { Post } from '../entities/types';
import { fetchPosts } from '../api/api';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import PostCard from './PostCard';
import CreatePostForm from './CreatePostForm';
import EditPostForm from './EditPostForm';
import DeleteConfirmation from './DeleteConfirmation';

const Tabloid: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);

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

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostCreated = () => {
    loadPosts(); // Refresh the posts list
  };

  const handlePostUpdated = () => {
    loadPosts(); // Refresh the posts list
  };

  const handlePostDeleted = () => {
    loadPosts(); // Refresh the posts list
  };

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
  };

  const handleDeleteClick = (post: Post) => {
    setDeletingPost(post);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', margin: 0 }}>VIA Tabloid</h1>
              <p style={{ color: '#6b7280', marginTop: '4px', margin: 0 }}>Latest updates and announcements</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <Plus size={18} />
              New Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div style={{ maxWidth: '896px', margin: '0 auto', padding: '24px' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <User size={48} style={{ margin: '0 auto 16px auto', color: '#d1d5db' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>No posts yet</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>Get started by creating your first post!</p>
            <button
              onClick={() => setShowCreateForm(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <Plus size={18} />
              Create First Post
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
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

      {/* Modals */}
      {showCreateForm && (
        <CreatePostForm
          onClose={() => setShowCreateForm(false)}
          onPostCreated={handlePostCreated}
        />
      )}

      {editingPost && (
        <EditPostForm
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onPostUpdated={handlePostUpdated}
        />
      )}

      {deletingPost && (
        <DeleteConfirmation
          post={deletingPost}
          onClose={() => setDeletingPost(null)}
          onPostDeleted={handlePostDeleted}
        />
      )}
    </div>
  );
};

export default Tabloid;