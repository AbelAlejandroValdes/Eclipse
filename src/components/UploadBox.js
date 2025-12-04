export default function UploadBox({ files, onChange }) {
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    onChange(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    onChange(dropped);
  };

  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      className="upload-box"
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      onDrop={handleDrop}
    >
      <label className="upload-label">
        <input
          type="file"
          multiple
          onChange={handleFiles}
          className="file-input"
          accept=".pdf,.doc,.docx,.txt,image/*"
        />
        <span>Haz clic para seleccionar archivos o arrástralos aquí</span>
      </label>

      {files?.length > 0 ? (
        <ul className="file-list">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              <strong>{f.name}</strong> — {(f.size / 1024).toFixed(1)} KB
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">No hay documentos subidos aún.</p>
      )}
    </div>
  );
}
