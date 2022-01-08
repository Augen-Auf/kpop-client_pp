import React, {useEffect, useState} from 'react';
import {createTestResult, getTest, getTestQuestions} from "../../http/TestAPI";

const TestSection = ({ testId, userId, changeStage, changeResult, refreshTest, updateRefresh }) => {
    const [questions,  setQuestions] = useState([])
    const [userAnswers, setUserAnswers] = useState(null)

    useEffect(async () => {
        await loadQuestions()
    },  [])

    useEffect(async () => {
        if(refreshTest)
        {
            await loadQuestions()
            updateRefresh(false)
        }
    }, [refreshTest])

    const loadQuestions = async () => {
        const questionsArray = await getTestQuestions(testId)
        const answerObj = {}

        questionsArray.forEach((question, index) => {
            answerObj[index] = []
        })
        setQuestions([...questionsArray])
        setUserAnswers({...answerObj})
    }

    const makeAnswer = (question, answer) => {
        const currentUserAnswers = userAnswers[question]

        if (currentUserAnswers.includes(answer)) {
            currentUserAnswers.splice(currentUserAnswers.indexOf(answer), 1)
        }
        else {
            currentUserAnswers.push(answer)
        }

        setUserAnswers({...userAnswers})
    }

    const getScore = async () => {

        if(Object.entries(userAnswers).filter(item => item[1].length === 0).length === 0) {
            const result = await createTestResult(userAnswers, userId, testId)
            changeResult(result.score)
            changeStage('complete')
            console.log(result)
        }
    }

    return (
        <div className="w-full">
            <hr className="my-4"/>
            <div className="w-full space-y-5">
                {
                    userAnswers && questions.map((question, questionIndex) => (
                        <div key={"question_" + questionIndex} className="border border-primary shadow-md border-primary p-3 rounded-md">
                            <p className="text-center font-semibold text-lg mb-2">Вопрос {questionIndex + 1}: { question.question }</p>
                            <div className="grid grid-cols-2 gap-4">
                                {
                                    questions[questionIndex].answers.map((answer, answerIndex) =>
                                        <div
                                            className={`${userAnswers[questionIndex].includes(answer) ? "bg-primary"  : "bg-secondary"} 
                                    border border-primary p-2 rounded`}
                                            key={"answer_" + answerIndex}
                                            onClick={() => makeAnswer(questionIndex, answer)}>
                                            { answer }
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    ))
                }
            </div>
            <div className="w-full flex justify-center my-4">
                <button className="btn btn-primary" onClick={() => getScore()}>
                    Сдать тест
                </button>
            </div>
        </div>
    );
};

export default TestSection;
