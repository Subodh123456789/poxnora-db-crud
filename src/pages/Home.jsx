import React, { useMemo, useState } from 'react';

const emptyForm = {
  title: '',
  type: 'Champion',
  description: '',
  icon: '⚔️',
};

const Home = ({ searchQuery, items, setItems }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      if (!query) return true;

      return (
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });
  }, [items, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      champions: items.filter((item) => item.type === 'Champion').length,
      spells: items.filter((item) => item.type === 'Spell').length,
      equipment: items.filter((item) => item.type === 'Equipment').length,
    };
  }, [items]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    if (editingId !== null) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...formData, title: formData.title.trim() } : item
        )
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      setItems((prev) => [newItem, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      type: item.type,
      description: item.description,
      icon: item.icon,
    });
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <p style={styles.eyebrow}>Database Explorer</p>
          <h2 style={styles.title}>PoxNora Records</h2>
        </div>
        <div style={styles.statsRow}>
          <StatCard label="Total" value={stats.total} color="#8b5cf6" />
          <StatCard label="Champions" value={stats.champions} color="#22c55e" />
          <StatCard label="Spells" value={stats.spells} color="#38bdf8" />
          <StatCard label="Equipment" value={stats.equipment} color="#f59e0b" />
        </div>
      </div>

      <div style={styles.contentGrid}>
        <section style={styles.formPanel}>
          <h3 style={styles.sectionTitle}>{editingId !== null ? 'Edit Record' : 'Add New Record'}</h3>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.fieldLabel}>
              Icon
              <input
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="⚔️"
                style={styles.input}
              />
            </label>

            <label style={styles.fieldLabel}>
              Title
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter entry title"
                style={styles.input}
              />
            </label>

            <label style={styles.fieldLabel}>
              Type
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="Champion">Champion</option>
                <option value="Spell">Spell</option>
                <option value="Equipment">Equipment</option>
              </select>
            </label>

            <label style={styles.fieldLabel}>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the item, its role, or stats"
                rows="5"
                style={{ ...styles.input, ...styles.textArea }}
              />
            </label>

            <div style={styles.actionsRow}>
              <button type="submit" style={styles.primaryButton}>
                {editingId !== null ? 'Update Record' : 'Add Record'}
              </button>

              {editingId !== null && (
                <button type="button" onClick={resetForm} style={styles.secondaryButton}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section style={styles.listPanel}>
          <div style={styles.listHeader}>
            <h3 style={styles.sectionTitle}>Records</h3>
            <span style={styles.resultCount}>{filteredItems.length} shown</span>
          </div>

          {filteredItems.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyTitle}>No records match your search.</p>
              <p style={styles.emptyText}>Try a different keyword or add a new entry.</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {filteredItems.map((item) => (
                <div key={item.id} style={styles.cardWrapper}>
                  <Card
                    item={item}
                    onView={() => setSelectedItem(item)}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedItem && (
        <div style={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
          <div style={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span style={styles.modalIcon}>{selectedItem.icon}</span>
              <div>
                <div style={styles.modalBadge}>{selectedItem.type}</div>
                <h3 style={styles.modalTitle}>{selectedItem.title}</h3>
              </div>
            </div>
            <p style={styles.modalText}>{selectedItem.description}</p>
            <button type="button" onClick={() => setSelectedItem(null)} style={styles.primaryButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ item, onView, onEdit, onDelete }) => {
  return (
    <article style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardIcon}>{item.icon}</span>
        <span style={styles.badge}>{item.type}</span>
      </div>

      <h4 style={styles.cardTitle}>{item.title}</h4>
      <p style={styles.cardDesc}>{item.description}</p>

      <div style={styles.cardActions}>
        <button type="button" onClick={onView} style={styles.secondaryButton}>
          View
        </button>
        <button type="button" onClick={onEdit} style={styles.secondaryButton}>
          Edit
        </button>
        <button type="button" onClick={onDelete} style={styles.dangerButton}>
          Delete
        </button>
      </div>
    </article>
  );
};

const StatCard = ({ label, value, color }) => (
  <div style={{ ...styles.statCard, borderColor: color }}>
    <span style={{ ...styles.statValue, color }}>{value}</span>
    <span style={styles.statLabel}>{label}</span>
  </div>
);

const styles = {
  page: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px 56px',
  },
  pageHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '28px',
  },
  eyebrow: {
    color: '#a78bfa',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    fontSize: '0.72rem',
    marginBottom: '8px',
  },
  title: {
    fontSize: '2.5rem',
    lineHeight: 1.2,
    margin: 0,
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '14px',
  },
  statCard: {
    background: 'rgba(26, 26, 38, 0.9)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '16px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statValue: {
    fontSize: '1.7rem',
    fontWeight: 700,
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: '0.8rem',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 380px) minmax(0, 1fr)',
    gap: '24px',
    alignItems: 'start',
  },
  formPanel: {
    background: 'rgba(26, 26, 38, 0.9)',
    border: '1px solid rgba(167, 139, 250, 0.2)',
    borderRadius: '20px',
    padding: '22px',
    boxShadow: '0 14px 40px rgba(15, 23, 42, 0.25)',
  },
  sectionTitle: {
    margin: '0 0 18px',
    fontSize: '1.3rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  fieldLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontWeight: 600,
    color: '#e5e7eb',
  },
  input: {
    background: '#0f172a',
    border: '1px solid rgba(148, 163, 184, 0.3)',
    borderRadius: '12px',
    padding: '12px 14px',
    color: '#f8fafc',
    fontSize: '0.96rem',
    fontFamily: 'inherit',
  },
  textArea: {
    resize: 'vertical',
    minHeight: '120px',
  },
  actionsRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '8px',
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 18px',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  secondaryButton: {
    background: 'transparent',
    border: '1px solid rgba(167, 139, 250, 0.4)',
    color: '#e9d5ff',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '0.92rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  dangerButton: {
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.38)',
    color: '#fca5a5',
    borderRadius: '10px',
    padding: '8px 12px',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
  listPanel: {
    background: 'rgba(17, 24, 39, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.15)',
    borderRadius: '20px',
    padding: '22px',
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '18px',
  },
  resultCount: {
    background: 'rgba(139, 92, 246, 0.12)',
    color: '#d8b4fe',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    borderRadius: '999px',
    padding: '7px 12px',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  cardWrapper: {
    minHeight: '100%',
  },
  card: {
    minHeight: '100%',
    background: 'linear-gradient(180deg, rgba(26, 26, 38, 0.95), rgba(15, 23, 42, 0.9))',
    border: '1px solid rgba(167, 139, 250, 0.18)',
    borderRadius: '18px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    transition: 'transform 0.2s ease, border-color 0.2s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: '2rem',
  },
  badge: {
    background: 'rgba(139, 92, 246, 0.12)',
    color: '#d8b4fe',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    borderRadius: '999px',
    padding: '6px 10px',
    fontSize: '0.72rem',
    fontWeight: 700,
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.25rem',
  },
  cardDesc: {
    margin: 0,
    color: '#cbd5e1',
    lineHeight: 1.6,
    flex: 1,
  },
  cardActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '6px',
  },
  emptyState: {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px dashed rgba(148, 163, 184, 0.35)',
    borderRadius: '16px',
    padding: '36px 18px',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: '1.1rem',
    marginBottom: '6px',
  },
  emptyText: {
    color: '#a8b3c7',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(2, 6, 23, 0.72)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 30,
  },
  modal: {
    width: '100%',
    maxWidth: '480px',
    background: '#111827',
    border: '1px solid rgba(167, 139, 250, 0.25)',
    borderRadius: '20px',
    padding: '24px',
  },
  modalHeader: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '14px',
  },
  modalIcon: {
    fontSize: '2.6rem',
  },
  modalBadge: {
    display: 'inline-block',
    background: 'rgba(139, 92, 246, 0.12)',
    color: '#d8b4fe',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    borderRadius: '999px',
    padding: '5px 9px',
    fontSize: '0.72rem',
    fontWeight: 700,
    marginBottom: '8px',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  modalText: {
    color: '#dbeafe',
    lineHeight: 1.7,
    marginBottom: '18px',
  },
};

export default Home;
