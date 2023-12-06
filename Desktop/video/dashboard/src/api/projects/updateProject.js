import axios from '../axios';
export default async(id,formData)=>{
    return axios({
        method: 'post',
        url:"projects/updateProject/"+id,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
    })
        .then((res)=> res.data)
        // .then((res)=>console.log(res));
}