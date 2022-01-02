import {$authHost, $host} from './index'

export const subscribe = async  (author_id, subscriber_id) => {
    try {
        const { data } = await $host.post('api/subscription/subscribe', { author_id, subscriber_id })
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const unsubscribe = async  (author_id, subscriber_id) => {
    try {
        const { data } = await $authHost.delete(`api/subscription/${author_id}/unsubscribe/${subscriber_id}`)
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const getAuthorSubscribers = async (author_id) => {
    const { data } = await $authHost.get(`api/subscription/author/` + author_id)
    return data
}

export const getUserSubscriptions = async (user_id) => {
    const { data } = await $authHost.get(`api/subscription/user/` + user_id)
    return data
}

export const isUserSubscribed  =  async (author_id, user_id)  => {
    const { data } = await $authHost.post(`api/subscription/check`,{author_id, user_id})
    return data
}

