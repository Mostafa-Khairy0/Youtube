import axios from './axios';

export default async(email, oldPassword, newPassword)=>{
    return axios({
        method:"post",
        url:"setAccess",
        data:{email, oldPassword, newPassword}
        })
        .then((res)=> res.data)
        // .then((res)=>console.log(res));
}