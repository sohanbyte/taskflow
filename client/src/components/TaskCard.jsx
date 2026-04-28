import styles from './TaskCard.module.css';

const PRIORITY_COLORS = { low: 'var(--low)', medium: 'var(--medium)', high: 'var(--high)' };
const NEXT_STATUS = { 'todo': 'in-progress', 'in-progress': 'done', 'done': 'todo' };
const NEXT_LABEL = { 'todo': 'Start →', 'in-progress': 'Complete ✓', 'done': 'Reopen ↩' };

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.priority} style={{ color: PRIORITY_COLORS[task.priority] }}>
          ● {task.priority}
        </span>
        <div className={styles.actions}>
          <button className={styles.action} onClick={() => onEdit(task)} title="Edit">✏️</button>
          <button className={styles.action} onClick={() => onDelete(task._id)} title="Delete">🗑️</button>
        </div>
      </div>
      <h3 className={styles.title}>{task.title}</h3>
      {task.description && <p className={styles.desc}>{task.description}</p>}
      <div className={styles.footer}>
        <span className={styles.date}>{new Date(task.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</span>
        <button className={styles.moveBtn} onClick={() => onStatusChange(task, NEXT_STATUS[task.status])}>
          {NEXT_LABEL[task.status]}
        </button>
      </div>
    </div>
  );
}
