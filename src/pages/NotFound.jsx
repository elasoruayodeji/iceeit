import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container empty-state">
      <h2 className="display" style={{ color: 'var(--cyan)' }}>404 — Whiteout</h2>
      <p>This page drifted off the glacier. Nothing exists at these coordinates.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-solid">Back to index</Link>
        <Link to="/shop" className="btn btn-ghost">Shop the drop</Link>
      </div>
    </div>
  );
}
