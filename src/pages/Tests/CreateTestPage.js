import React, {useState} from 'react';
import { useForm, useFieldArray } from "react-hook-form";

const CreateTestPage = () => {

    const [questions, setQuestions] = useState([])

    const changeQuestions = (questionNumber, changeValue, action) => {
        let newQuestions = questions
        switch (action) {
            case 'append':
                newQuestions.push({ question: "", answers: {},  correct_answers: {}})
                break
            case 'change':
                newQuestions[questionNumber].question = changeValue
               break
            case 'delete':
                newQuestions.splice(questionNumber, 1)
                break
        }
        console.log(newQuestions)
        setQuestions(newQuestions)
    }

    const changeAnswers = (questionNumber, answerNumber, changeValue, action) => {
        let newQuestions = questions
        switch (action) {
            case 'append':
                newQuestions[questionNumber].answers.append(null)
                newQuestions[questionNumber].correct_answers.append(null)
                break
            case 'change':
                newQuestions[questionNumber].answers[answerNumber] = changeValue
                break
            case 'delete':
                delete newQuestions[questionNumber].answers[answerNumber]
                break
        }
        console.log(newQuestions)
        setQuestions(newQuestions)
    }


    return (
        <div className="w-full font-montserrat md:pb-8 pb-4">
            <div className="max-w-7xl mx-auto py-10 px-3 bg-white">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Название теста</span>
                    </label>
                    <input type="text" className="input input-primary input-bordered"/>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Описание теста</span>
                    </label>
                    <textarea className="textarea h-24 textarea-bordered textarea-primary"/>
                </div>


                <div className="my-5">
                    {
                        questions.length > 0 && questions.map((question, index) => {
                            return  (
                                <div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Вопрос {index + 1}</span>
                                        </label>
                                        <input
                                            key={'question_' + index} // important to include key with field's id
                                            type="text"
                                            className="input input-primary input-bordered"
                                            onChange={(e) => changeQuestions(index, e.target.value, 'append')}
                                        />
                                    </div>

                                    {
                                       Object.entries(questions[index].answers).map((pair, answerIndex) => {
                                            return  (
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">В {answerIndex + 1}</span>
                                                    </label>
                                                    <input type="checkbox" />
                                                    <input
                                                        key={'answer_' + answerIndex} // important to include key with field's id
                                                        type="text"
                                                        className="input input-primary input-bordered"
                                                        onChange={(e) => changeAnswers(index, pair[0], e.target.value, 'change')}
                                                    />
                                                    <button className="btn btn-primary"
                                                            onClick={() => changeAnswers(index, pair[0], null, 'delete')}>Del</button>
                                                </div>
                                            )
                                        })
                                    }

                                    <button className="btn btn-primary my-2"
                                            onClick={() => changeAnswers(index, null, null, 'append')}>
                                        Добавить ответ
                                    </button>
                                    <button
                                        className="btn btn-primary my-2"
                                        onClick={() => changeQuestions(null, null, 'delete')}>Удалить</button>
                                    <hr className="my-3"/>
                                </div>
                            )
                        })
                    }

                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => changeQuestions(null, null, 'append')}>Добавить вопрос
                </button>
            </div>
        </div>
    );
};

export default CreateTestPage;
