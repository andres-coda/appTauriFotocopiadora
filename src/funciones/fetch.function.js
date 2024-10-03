const fetchGet = async (url, setError) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        }
      })
      return await res.json();
    } catch (error) {
      console.error(`Error en el fetch al obtener los elementos`, error);
      setError(error);
      throw error;
  
    }
  }

  const fetchPost = async (url, bodi, setError) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify(bodi),
      });
      if (res.ok) {
        return await res.json();
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Error desconocido")
        console.error("Error en la solicitud HTTP:", res.status, res.statusText, errorData);
        throw new Error(errorData.message || "Error desconocido");
      }
    } catch (error) {
        setError(`Error en el fetch intentar agregar el elemento , ${error}`)
      console.error(`Error en el fetch intentar agregar el elemento `, error);
      throw error;
    }
  }
  
  const fetchPut = async (url, bodi, setError) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify(bodi),
      });
      if (res.ok) {
        return await res.json();
      } else {
        setError(`Error en la solicitud HTTP: ${res.status}, ${res.statusText}`)
        console.log("Error en la solicitud HTTP:", res.status, res.statusText);
      }
    } catch (error) {
        setError(`Error en el fetch al intentar editar el elemento  ${error}`)
      console.error(`Error en el fetch al intentar editar el elemento `, error);
      throw error;
    }
  }
  
  const fetchPatCh = async (url, bodi, setError) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify(bodi),
      });
      if (res.ok) {
        return await res.json();
      } else {
        setError(`Error en la solicitud HTTP: ${res.status}, ${res.statusText}`)
        console.log("Error en la solicitud HTTP:", res.status, res.statusText);
        throw new Error("Error en la solicitud HTTP:", res.status, res.statusText)
      }
    } catch (error) {
        setError(`Error en el fetch al intentar reactivar el elemento: ${error}`)
      console.error(`Error en el fetch al intentar reactivar el elemento `, error);
      throw error;
    }
  }
  
  const fetchDelete = async (url, setError) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        }
      });
      if (res.ok) {
        return await res.json();
      } else {
        setError(`Error en la solicitud HTTP: ${res.status}, ${res.statusText}`)
        console.log("Error en la solicitud HTTP:", res.status, res.statusText);
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al eliminar el producto');
      }
    } catch (error) {
        setError(`Error en el fetch al intentar borrar el elemento: ${error}`)
      console.error(`Error en el fetch al intentar borrar el elemento `, error);
      throw error;
    }
  }
  
  const fetchPostImg = async (url, formData) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: formData,
      });
  
      if (res.ok) {
        return await res.json();
      } else {
        setError(`Error en la solicitud HTTP: ${res.status}, ${res.statusText}`)
        console.log("Error en la solicitud HTTP:", res.status, res.statusText);
        throw new Error('Error en la solicitud HTTP');
      }
    } catch (error) {
        setError(`Error en el fetch: ${error}`)
      console.error(`Error en el fetch: `, error);
      throw error;
    }
  }  
  
  export { fetchGet, fetchPost, fetchPut, fetchPatCh, fetchDelete, fetchPostImg };