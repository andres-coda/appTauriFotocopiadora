import { useState } from "react";
import useApi from "./useApi";

function usePostImg(url) {
    const {fetchData, loading, error, response} = useApi(url, 'POST');

    const postImg = async (bodyData) => {
        await fetchData(bodyData);
    }

    return { postImg, loading, error, response };
}

export default usePostImg;
