import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import styles from './Dashboard.module.css';

const API = import.meta.env.VITE_API_URL || '';

const STATUSES = ['todo', 'in-progress', 'done'];
const STATUS_LABELS = { 'todo': 'To Do', 'in-progress': 'In Progress', 'done': 'Done' };

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API}/api/tasks`);
      setTasks(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const openCreate = () => { setEditTask(null); setModalOpen(true); };
  const openEdit = (task) => { setEditTask(task); setModalOpen(true); };

  const handleSave = async (formData) => {
    if (editTask) {
      const { data } = await axios.put(`${API}/api/tasks/${editTask._id}`, formData);
      setTasks(t => t.map(x => x._id === data._id ? data : x));
    } else {
      const { data } = await axios.post(`${API}/api/tasks`, formData);
      setTasks(t => [data, ...t]);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`);
    setTasks(t => t.filter(x => x._id !== id));
  };

  const handleStatusChange = async (task, status) => {
    const { data } = await axios.put(`${API}/api/tasks/${task._id}`, { status });
    setTasks(t => t.map(x => x._id === data._id ? data : x));
  };

  const byStatus = (s) => tasks.filter(t => t.status === s);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>TF</span>
          <span className={styles.headerTitle}>TaskFlow</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.userName}>Hi, {user?.name?.split(' ')[0]} 👋</span>
          <button className={styles.logoutBtn} onClick={logout}>Sign out</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>My Tasks</h1>
            <p className={styles.pageSub}>{tasks.length} task{tasks.length !== 1 ? 's' : ''} total</p>
          </div>
          <button className={styles.addBtn} onClick={openCreate}>+ New Task</button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading tasks...</div>
        ) : (
          <div className={styles.board}>
            {STATUSES.map(status => (
              <div key={status} className={styles.column}>
                <div className={styles.colHeader}>
                  <span className={styles.colDot} data-status={status} />
                  <span className={styles.colLabel}>{STATUS_LABELS[status]}</span>
                  <span className={styles.colCount}>{byStatus(status).length}</span>
                </div>
                <div className={styles.colBody}>
                  {byStatus(status).length === 0 ? (
                    <div className={styles.empty}>No tasks here</div>
                  ) : (
                    byStatus(status).map(task => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <TaskModal
          task={editTask}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
