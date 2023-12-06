import axios from './axios';

export default async(username, password)=>{
    return axios({
        method:"get",
        url:"getAccess",
        auth:{username,password}
        })
        .then((res)=> res.data)
        // .then((res)=>console.log(res));
}