import React, { useState } from 'react';
import './imgCargar.css'
import { subirImagen } from '../../../../servicios/libro.service';

const ImgCargar = ({ urlImg, setUrlImg }) => {
  const [imgSelec, setImgSelec] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [estadoSubida, setEstadoSubida] = useState('');
  const [ btnSubir, setBtnSubir] = useState(true)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgSelec(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleQuitarImg = () => {
    setUrlImg("");
    setImgSelec(null);
    setPreviewImg(null);
    setBtnSubir(true)
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    setBtnSubir(false);
    if (!imgSelec) {
      setEstadoSubida('Por favor selecciona un archivo.');
      return;
    }
    const formData = new FormData();
    formData.append('image', imgSelec);
    await subirImagen(formData, setUrlImg, setBtnSubir, setEstadoSubida);
  };

  return (
    <div className='cargar-imagen'>
      {previewImg != null  || urlImg != "" ? (
        <>
          <img id='imgUrl' src={urlImg != ""? urlImg: previewImg} alt={'imagen'} />
          <div className='cargar-imagen-botonera'>
            <button className='cargar-imagen-btn' onClick={handleQuitarImg}>Quitar imagen</button>
            {btnSubir ? <button className='cargar-imagen-btn' onClick={handleUpload}>Subir imagen</button> : null }
          </div>
        </>
      ) : (
        <div className='cargar-imagen-dos'>
          <label htmlFor="imagen" className="carga-imagen-label-dos">Seleccionar imágen</label>
          <input id='imagen-dos' type='file' onChange={handleFileChange} placeholder='Seleccionar imagen' />
        </div>
      )}
    </div>
  );
};

export default ImgCargar;
