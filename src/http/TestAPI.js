import {$authHost, $host} from './index'

export const createTest = async  (name, description, questions, answers, correct_answers) => {
    try {
        const {data} = await $host.post('api/user/', { name, description, questions, answers, correct_answers })
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

export const getAllTests = async  (id) => {
    try {
        const { data } = await $host.get('api/tests/');
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

export const createTestResult = async (score, user_id, post_id) => {
    try {
     const  { data } = await $authHost.post('api/tests/score',{score, user_id, post_id})
    }
    catch (e) {
        throw new Error(e.response.data.message)
    }
}
