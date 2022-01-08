import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import moment from "moment";
import {deleteTest, getAllUserTests} from "../../http/TestAPI";
import {deleteNews} from "../../http/NewsAPI";

const UserTests = ({userId}) => {
    const history = useHistory()
    const location = useLocation()
    const [userTests, setUserTests] = useState([])


    useEffect(async () => {
        const tests = await getAllUserTests(userId)
        setUserTests(tests)
    }, [])

    const deleteUserTest = async (id) => {
        const data = await deleteTest(id)
        setUserTests(userTests.filter(item => item.id !== id))
    }

    return (
        <div className="p-5 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-xl">Мои тесты</span>
                {
                    !location.pathname.includes('/author') &&
                    <button className="btn btn-neural btn-square" onClick={() => history.push('/create/tests')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                }
            </div>
            {userTests && userTests.length > 0 ?
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
                    {
                        userTests.map( test =>
                            <div className="card-body p-4 bg-primary rounded">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-semibold text-lg truncate mr-3">{test.name}</span>
                                    {
                                        !location.pathname.includes('/author') &&
                                        <div className="flex space-x-2">
                                            <button className="btn btn-square btn-neural" onClick={() => history.push('/update/tests/' + test.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button className="btn btn-square btn-neural" onClick={() => deleteUserTest(test.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    }
                                </div>
                                <div className="truncate">{test.description}</div>
                                <div className="card-actions">
                                    <button className="btn btn-neutral" onClick={() => history.push('/tests/' + test.id)}>Подробнее</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                : <span>0 Тестов</span>
            }
        </div>
    );
};

export default UserTests;
