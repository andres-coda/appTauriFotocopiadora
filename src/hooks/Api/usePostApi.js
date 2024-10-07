import useApi from "./useApi";

function usePostApi(url, adapter) {
    const {fetchData, loading, error, response} = useApi(url, 'POST', adapter);

    const postData = async (bodyData) => {
        await fetchData(JSON.stringify(bodyData));
    }

    return { postData, loading, error, response };
}

export default usePostApi;
