import React, {useEffect, useState} from 'react';
import {getTestInfo, getUserTestResult} from "../../http/TestAPI";
import {useHistory, useParams} from "react-router-dom";
import TestSection from "./TestSection";
import {observer} from "mobx-react-lite";
import {useAuth} from "../../contexts/FirebaseAuthContext";

const TestPage = observer(() => {
    const { userStore } = useAuth();
    const { id } = useParams();
    const history = useHistory();
    const [testInfoObj, setTestInfoObj] = useState()
    const [stage, setStage] = useState('init')
    const [userResult, setUserResult] = useState(null)
    const [refresh, setRefresh] = useState(false)
    useEffect(async () => {
        const loadedTest = await getTestInfo(id)
        setTestInfoObj(loadedTest)
    },[])

    useEffect(async () => {
        if(userStore.isAuth) {
            const loadedUserScore = await getUserTestResult(userStore.dbUser.id, id)
            if (loadedUserScore) {
                setUserResult(loadedUserScore.score)
                setStage('complete')
            }
        }
    }, [userStore.isAuth])

    return (
        <div className="w-full">
            {testInfoObj &&
            <>
                <header className="bg-pink">
                    <div className="max-w-5xl mx-auto py-6 px-10">
                        <h1 className="text-3xl font-medium text-gray-900">{testInfoObj.name}</h1>
                    </div>
                </header>
                <div className="max-w-5xl container mx-auto mt-4 px-10 py-3 space-y-3 bg-white rounded">
                    <div className="w-full">
                        <p className="text-center font-semibold text-2xl">Описание теста</p>
                        <div className="my-4 text-lg">
                            { testInfoObj.description }
                        </div>
                        { stage === 'init' &&
                        <div className="w-full flex justify-center">
                            {
                                userStore.isAuth  ?
                                    <button className="btn btn-primary" onClick={() => setStage('process')}>
                                        Начать тест
                                    </button>
                                    :
                                    <button className="btn btn-primary" onClick={() => history.push('/login')}>
                                        Авторизироваться
                                    </button>
                            }

                        </div>

                        }
                    </div>
                    {stage === 'process' &&
                    <TestSection
                        testId={id}
                        userId={userStore.dbUser.id}
                        changeStage={setStage}
                        changeResult={setUserResult}
                        refreshTest={refresh}
                        updateRefresh={setRefresh}/>
                    }
                    {
                        stage === 'complete' &&
                        <div className="w-full flex flex-col justify-center items-center space-y-3">
                            <p className="text-center font-semibold">Ваш результат: { userResult }</p>
                            <button className="btn btn-primary w-48" onClick={() => {
                                setRefresh(true)
                                setStage('process')
                            }}>
                                Начать заново
                            </button>
                        </div>
                    }
                </div>
            </>
            }
        </div>
    );
})

export default TestPage;
