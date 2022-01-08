import {$authHost, $host} from './index'

export const createTest = async  (name, description, questions, author_id) => {
    try {
        const {data} = await $authHost.post('api/tests/', { name, description, questions, author_id })
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const updateTest = async  (name, description, questions, test_id) => {
    try {
        const {data} = await $authHost.put('api/tests/' + test_id, { name, description, questions })
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const getTest = async  (id) => {
    try {
        const { data } = await $host.get('api/tests/' + id);
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const getTestQuestions = async (id) => {
    try {
        const { data } = await $host.get('api/tests/' + id + '/questions');
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const getTestInfo = async  (id) => {
    try {
        const { data } = await $host.get('api/tests/info/' + id);
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const getAllTests = async  () => {
    try {
        const { data } = await $host.get('api/tests/');
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const getAllUserTests = async (id) => {
    try {
        const { data } = await $host.get('api/tests/user/' + id);
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const deleteTest = async (id) => {
    try {
        const { data } = await $host.delete('api/tests/' + id);
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
};

export const createTestResult = async (answers, user_id, test_id) => {
    try {
        const  { data } = await $authHost.post('api/tests/score/create',{answers, user_id, test_id})
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
}

export const getUserTestResult =  async (user_id, test_id) => {
    try {
        const  { data } = await $authHost.post('api/tests/score',{user_id, test_id})
        return data
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
}
