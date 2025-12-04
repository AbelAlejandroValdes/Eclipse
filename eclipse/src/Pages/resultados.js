import { useState } from "react";
import UploadBox from "../components/UploadBox";

function Resultados(){
    const [files, setFiles] = useState([]);
    
    return(
    <div>
      <header className="header">
        <h1>Plantilla: Documentos e Imagen</h1>
        <p>Usa el primer recuadro para colgar documentos y el segundo para procesar una imagen.</p>
      </header>

      <main className="grid">
        <section id="documentos" className="card">
          <h2>Colgar documentos</h2>
          <UploadBox files={files} onChange={setFiles} />
        </section>
      </main>
    </div>

    );
};

export default Resultados;