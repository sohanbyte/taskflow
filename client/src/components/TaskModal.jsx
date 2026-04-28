import { useState } from 'react';
import styles from './TaskModal.module.css';

export default function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'todo',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required'); return; }
    setLoading(true);
    try {
      await onSave(form);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{task ? 'Edit Task' : 'New Task'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={submit} className={styles.form}>
          <div className={styles.field}>
            <label>Title *</label>
            <input name="title" value={form.title} onChange={handle} placeholder="What needs to be done?" autoFocus />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handle} placeholder="Add details (optional)" rows={3} />
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handle}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handle}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
