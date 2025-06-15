// PostCard.tsx
import { Clock, Building2, Trash2 } from 'lucide-react';
import { Post } from '../entities/types';
import { formatDate, getDepartmentColor, departmentNames } from '../utils/utils';

interface PostCardProps {
  post: Post;
  onDelete: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  return (
    <article 
      style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
        overflow: 'hidden', 
        border: '1px solid #e5e7eb',
        transition: 'box-shadow 0.2s'
      }}
    >
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: 0, lineHeight: '1.25', flex: 1 }}>
              {post.title}
            </h2>
            <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
              <button
                onClick={() => onDelete(post)}
                style={{
                  padding: '6px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#fef2f2',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Delete post"
              >
                <Trash2 size={16} color="#dc2626" />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Building2 size={16} />
              <span 
                style={{
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: '500',
                  ...getDepartmentColor(post.department)
                }}
              >
                {departmentNames[post.department] || 'Unknown'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={16} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            {post.updatedAt && (
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                Updated: {formatDate(post.updatedAt)}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>
            {post.content}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f9fafb', padding: '12px 24px', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
          <span>Post #{post.id}</span>
          <span>
            {post.content.length} characters
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;