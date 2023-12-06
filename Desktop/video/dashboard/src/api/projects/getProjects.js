import axios from '../axios';
export default async()=>{
    return axios({url:"projects/getAll"})
        .then((res)=> res.data.projects)
        // .then((res)=> {
        //     for(let i=0; i<120; i++)
        //         res.push(res[0])
        //     return res
        // })
        // .then((res)=>console.log(res));
}