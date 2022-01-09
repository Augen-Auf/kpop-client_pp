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

export const getUserInfo = async  (id) => {
    try {
        const { data } = await $host.get('api/user/info/' + id);
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const updateUser = async (uid, nickname, email, avatarImage, avatarAction) => {

    try {

        let formData = new FormData()
        formData.append('nickname', nickname)
        if(email)
            formData.append('email', email)
        formData.append('img', avatarImage)
        formData.append('avatarAction', avatarAction)

        const { data } = await $authHost.put('api/user/' + uid + '/change', formData, {headers: {
                'Content-Type': 'multipart/form-data'
            }});
        console.log('data', data)
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
}

export const changePassword = async (uid, newPassword) => {
    try {
        const { data } = await $authHost.post('api/user/' + uid + '/password/change', { newPassword });
        return data
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
    const { data } = await $authHost.post(`api/user/news`, {id: id})
    console.log(data)
    return data
}

export const getComments = async (id) => {
    const { data } = await $authHost.post(`api/user/comments`, {id: id})
    console.log(data)
    return data
}

export const getArticles = async (id) => {
    const { data } = await $authHost.post(`api/user/articles`, {id: id})
    console.log(data)
    return data
}

export const getVikis = async (id) => {
    const { data } = await $authHost.post(`api/user/vikis`, {id: id})
    console.log(data)
    return data
}

