import React from 'react';

const QuestionsList = ({questions, changeQuestions, changeAnswers}) => {
    return (
        <div className="my-5 space-y-6">
            {
                questions.map((question, index) => (
                    <div key={"question_" + index} className="bordered shadow-md border-primary p-2 rounded-md">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Вопрос {index + 1}</span>
                            </label>
                            <input
                                key={'question_' + index} // important to include key with field's id
                                type="text"
                                className="input input-primary input-bordered"
                                value={question.question}
                                onChange={(e) => changeQuestions(index, e.target.value, 'change')}
                            />
                        </div>

                        {
                            questions[index].answers.map((answer, answerIndex) =>
                                <div className="form-control" key={"answer_"+answerIndex}>
                                    <label className="label">
                                        <span className="label-text">Ответ {answerIndex + 1}</span>
                                    </label>
                                    <div className="flex space-x-3 items-center">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-lg"
                                               checked={answer.correct}
                                               onChange={(e) => changeAnswers(index, answerIndex, e.target.checked, 'setCorrect')} />
                                        <input
                                            key={'answer_' + answerIndex} // important to include key with field's id
                                            type="text"
                                            className="input input-primary input-bordered flex-grow"
                                            value={answer.value}
                                            onChange={(e) => changeAnswers(index, answerIndex, e.target.value, 'change')}
                                        />
                                        <button type="button" className="btn btn-primary btn-square"
                                                onClick={() => changeAnswers(index, answerIndex, null, 'delete')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        <button type="button" className="space-x-2 btn btn-sm btn-primary mt-3" onClick={() => changeAnswers(index, null, null, 'append')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Добавить ответ</span>
                        </button>
                        <div className="mt-3">
                            <button
                                type="button"
                                className="btn btn-primary my-2"
                                onClick={() => changeQuestions(null, null, 'delete')}>
                                Удалить вопрос
                            </button>
                        </div>
                    </div>

                ))
            }
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => changeQuestions(null, null, 'append')}>Добавить вопрос
            </button>
        </div>
    );
}

export default QuestionsList;
