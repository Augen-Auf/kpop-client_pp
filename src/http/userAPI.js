import {$authHost, $host} from './index'

export const createUser = async  (uid, nickname) => {
    try {
        const {data} = await $host.post('api/user/', {uid, nickname})
        return data
    }
    catch (e) {
       throw new Error(e.response.data.message)
    }
};

export const getUser = async  (uid) => {
    try {
        const { data } = await $host.get('api/user/' + uid);
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const updateUser = async (uid, nickname) => {

    try {
        const { data } = await $authHost.put('api/user/' + uid,{nickname});
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
}

export const changePassword = async (userId, oldPassword, newPassword) => {
    console.log(userId)
    try {
        const { data } = await $authHost.post('api/user/password/change', {userId, oldPassword, newPassword});
        localStorage.removeItem('token');
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
}

export const getAvatar = async (id) => {
    try {
        const { data } = await $authHost.get('api/avatar/' + id);
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
}

export const getNews = async (id) => {
    const { data } = await $authHost.post(`api/user/news`, {userId: id})
    console.log(data)
    return data
}

export const getComments = async (id) => {
    const { data } = await $authHost.post(`api/user/comments`, {userId: id})
    console.log(data)
    return data
}

export const getArticles = async (id) => {
    const { data } = await $authHost.post(`api/user/articles`, {userId: id})
    console.log(data)
    return data
}

export const getVikis = async (id) => {
    const { data } = await $authHost.post(`api/user/vikis`, {userId: id})
    console.log(data)
    return data
}

