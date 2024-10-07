import useApi from "./useApi";

function useDeleteApi(url) {
    const {fetchData, loading, error, response} = useApi(url, 'DELETE');

    const deletedId= async () => {
        await fetchData();
    }

    return { deletedId, loading, error, response };
}

export default useDeleteApi;