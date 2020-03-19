

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});
import Swal from 'sweetalert2';

export default {
    get(endpoint, data){
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data){
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data){
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data){
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method='get', data=null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {   
        var title, txt; 
        if (err.response.status === 401) {
           title = 'Unathorized!';
           txt = 'You don\'t have permission for this action...'; 
        } else {
            title = 'Ooops..';
            txt = 'Something went wrong...';
        }
        Swal.fire({
            icon: 'error',
            title: title,
            text: txt
        });
        return {failed: true};
    }
}

