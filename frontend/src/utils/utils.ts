import { Department } from '../entities/types';

export const departmentNames: Record<Department, string> = {
  [Department.Technology]: 'Technology',
  [Department.Marketing]: 'Marketing',
  [Department.Sales]: 'Sales',
  [Department.HR]: 'HR',
  [Department.Finance]: 'Finance',
  [Department.Operations]: 'Operations',
  [Department.Legal]: 'Legal'
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getDepartmentColor = (departmentId: Department): React.CSSProperties => {
  const colors: Record<string, React.CSSProperties> = {
    'Technology': { backgroundColor: '#dbeafe', color: '#1e40af' },
    'Marketing': { backgroundColor: '#e9d5ff', color: '#7c3aed' },
    'Sales': { backgroundColor: '#dcfce7', color: '#059669' },
    'HR': { backgroundColor: '#fed7aa', color: '#ea580c' },
    'Finance': { backgroundColor: '#fef3c7', color: '#d97706' },
    'Operations': { backgroundColor: '#f3f4f6', color: '#374151' },
    'Legal': { backgroundColor: '#fee2e2', color: '#dc2626' }
  };
  const departmentName = departmentNames[departmentId] || 'Unknown';
  return colors[departmentName] || { backgroundColor: '#f3f4f6', color: '#374151' };
};