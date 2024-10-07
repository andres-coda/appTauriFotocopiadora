import useApi from "./useApi";

function usePutApi(url, adapter=null) {
    const {fetchData, loading, error, response} = useApi(url, 'PUT', adapter);

    const putData = async (bodyData) => {
        await fetchData(JSON.stringify(bodyData));
    }

    return { putData, loading, error, response };
}

export default usePutApi;
