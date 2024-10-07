import useApi from "./useApi";

function usePatchApi(url, adapter) {
    const {fetchData, loading, error, response} = useApi(url, 'PATCH', adapter);

    const patchData = async (bodyData) => {
        await fetchData(JSON.stringify(bodyData));
    }

    return { patchData, loading, error, response };
}

export default usePatchApi;
