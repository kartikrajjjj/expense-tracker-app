import http from "./http";

const fetcher = async (url) =>{
    try{
        const{data} = await http.get(url);
        return data;
    } catch(err){
        return null;
    }
}
export default fetcher;
