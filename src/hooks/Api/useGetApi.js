
import { useEffect } from 'react'
import useApi from './useApi';


function useGetApi(apiUrl, adapter){
    const {fetchData, loading, error, response} = useApi(apiUrl, 'GET', adapter);
    
    useEffect(() => {
        const getData = async () => {
            await fetchData();
        };
        if (!apiUrl) return
        
        getData();
      
    }, [apiUrl]); 

    return { loading, error, response };
}

export default useGetApi;