import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const createNews = async (formData) => {
    try {
        const { data } = await $authHost.post('api/news', formData);
        return data
    } catch (e) {
        throw Error(e);
    }

};

export const updateNews = async (news_id, formData) => {
    try {
        const { data } = await $authHost.put('api/news/' + news_id, formData);
        console.log(data)
        return data
    } catch (e) {
        throw Error(e);
    }

};

export const getOneNew = async (id) => {
    try {
        const { data } = await $host.get('api/news/' + id);
        return data
    } catch (e) {
        throw Error(e);
    }

};

export const deleteNews = async (id) => {
    try {
        const { data } = await $host.delete('api/news/' + id);
        return data
    } catch (e) {
        throw Error(e);
    }
}

export const fetchNews = async  () => {
    const {data} = await $host.get('api/news');
    return data
};

export const getNewsReactions = async (newsId) => {
    const { data } = await $host.get(`api/news/${newsId}/reactions`)
    return data
}

export const setNewsReaction = async (user_id, newsId, choice) => {
    const { data } = await $host.post(`api/news/${newsId}/reactions`, {user_id, choice})
    return data
}

export const getAllTags = async () => {
    const { data } = await $host.get(`api/tags`)
    return data
}

export const searchNews = async (query) => {
    const {data} = await $host.post('api/news/search',  {query:  query})
    return data
}
