import './Loading.css';

export default function Loading() {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
      <div>Loading data...</div>
    </div>
  );
}
