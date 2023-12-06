import axios from './axios';

export default async()=>{
    return axios({
        method:"get",
        url:"projects/getUsers",
        })
        .then((res)=> res.data.users)
        // .then((res)=>console.log(res));
}