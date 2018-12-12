import axios from './axios';
export default function ({ url,
    method = 'post',
    data = {},
    params }) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: method,
            data,
            params,
          

        }).then((res) => {
            console.log(res.data)
            if (res.data && res.data.status == 200) {

                resolve({ res: res.data.data, ok: true })
            } else {

                resolve({ res: res.data.msg, ok: false })
            }
        }).catch((error) => {

            reject(error)

        }).finally(() => {
           
        })
    })
}






