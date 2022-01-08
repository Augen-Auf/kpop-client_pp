import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import QuestionsList from "./QuestionsList";
import {useForm} from "react-hook-form";
import {createTest, getTest, updateTest} from "../../http/TestAPI";
import {useHistory, useParams} from "react-router-dom";
import {useAuth} from "../../contexts/FirebaseAuthContext";

const CreateTestPage = observer(() => {

    const { id } = useParams()
    const { userStore } = useAuth();
    const history = useHistory();
    const [questions, setQuestions] = useState([])
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(async () => {

        if(id) {
            const test = await getTest(id)
            setValue('name', test.name)
            setValue('description', test.description)
            const questionsArray = await JSON.parse(test.questions)
            console.log(questionsArray)
            setQuestions([...questionsArray])
        }

    }, [])

    const changeQuestions = (questionNumber, changeValue, action) => {
        let newQuestions = questions
        switch (action) {
            case 'append':
                newQuestions.push({ question: "", answers: []})
                break
            case 'change':
                newQuestions[questionNumber].question = changeValue
                break
            case 'delete':
                newQuestions.splice(questionNumber, 1)
                break
        }
        console.log(newQuestions)
        setQuestions([...newQuestions])
    }
    const changeAnswers = (questionNumber, answerNumber, changeValue, action) => {
        let newQuestions = questions
        switch (action) {
            case 'append':
                newQuestions[questionNumber].answers.push({value: null, correct: false})
                break
            case 'change':
                newQuestions[questionNumber].answers[answerNumber].value = changeValue
                break
            case 'setCorrect':
                newQuestions[questionNumber].answers[answerNumber].correct = changeValue
                break
            case 'delete':
                newQuestions[questionNumber].answers.splice(answerNumber, 1)
                break
        }
        console.log(newQuestions)
        setQuestions([...newQuestions])
    }


    const createNewTest = async ({name, description}) => {
        if(questions.length > 0 &&
            questions.filter(item => item.answers.length === 0 ||
                item.answers.filter( answer => answer.value === null).length > 0 ||
                item.answers.filter( answer => answer.correct === false ).length === item.answers.length).length === 0) {

            const result = id ?
                await updateTest(name, description, JSON.stringify(questions), id) :
                await createTest(name, description, JSON.stringify(questions), userStore.dbUser.id)

            if (result) {
                history.push('/tests')
            }

        }
    }

    return (
        <div className="w-full font-montserrat md:pb-8 pb-4">
            <div className="max-w-7xl mx-auto py-10 px-3 bg-white mt-4 rounded-md">
                <form onSubmit={handleSubmit(createNewTest)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Название теста</span>
                        </label>
                        <input type="text" className="input input-primary input-bordered" { ...register("name", {required: 'Обязательное поле для заполнения'})}/>
                        {
                            errors.name &&
                            <label className="label">
                                <span className="label-text-alt text-red-500">{ errors.name.message }</span>
                            </label>
                        }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Описание теста</span>
                        </label>
                        <textarea className="textarea h-24 textarea-bordered textarea-primary" { ...register("description", {required: 'Обязательное поле для заполнения'})}/>
                        {
                            errors.description &&
                            <label className="label">
                                <span className="label-text-alt text-red-500">{ errors.description.message }</span>
                            </label>
                        }
                    </div>

                    <QuestionsList questions={questions} changeQuestions={changeQuestions} changeAnswers={changeAnswers}  />

                    <div className="w-full text-center">
                        <button className="btn btn-primary"  type="submit">
                            { id ? 'Обновить тест' : 'Создать тест' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default CreateTestPage;
