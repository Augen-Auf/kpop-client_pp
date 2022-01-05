import React from 'react';
import {observer} from "mobx-react-lite";
import {useAuth} from "../contexts/FirebaseAuthContext";
import {useParams} from "react-router-dom";
import defaultAvatar from '../style/img/devault_avatar.jpg'

const UserPage = observer( () => {

    const { userStore } =  useAuth()
    const { id } = useParams()

    return (
        <>
            <header className="bg-pink">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-medium text-gray-900">{'Страница пользователя'}</h1>
                </div>
            </header>
            <div className="w-full z-0 font-montserrat font-normal py-14">
                <div className="flex flex-col w-3/5 h-full mx-auto space-y-5">
                    <div className="rounded w-full bg-secondary shadow-lg px-10 py-5 flex">
                        <div className="flex flex-grow flex-col space-y-3">
                            <div className="avatar">
                                <div
                                    className="w-36 h-36 p-px bg-opacity-10 mask mask-squircle bg-base-content">
                                    <img src={ defaultAvatar}  className="mask mask-squircle"/>
                                </div>
                            </div>
                            <p className="text-4xl font-bold">{ userStore.dbUser.nickname }</p>
                            <p> На портале с { userStore.dbUser.createdAt }</p>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row lg:space-x-7 lg:space-y-0 space-y-5 flex-col justify-between">
                        <div className="flex-grow">
                            <div className="h-60 w-full bg-secondary flex items-center shadow-lg rounded">
                                <p className="w-full text-center">Здесь еще нет публикаций</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 w-full flex flex-col space-y-5">
                            <div className="bg-secondary w-full rounded shadow-lg p-2 space-y-3">
                                <p className="font-semibold">Подписчики</p>
                                <div className="w-full flex flex-col items-start space-y-1">
                                    {
                                        [1,2,3,4,5].map( sub => {
                                            return (
                                                <div className="flex space-x-2 items-center p-1 bg-primary w-full rounded hover:bg-primary-focus">
                                                    <div className="avatar">
                                                        <div
                                                            className="w-8 h-8 p-px bg-opacity-10 mask mask-squircle bg-base-content">
                                                            <img src={ defaultAvatar}  className="mask mask-squircle"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Бебра1488
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="font-semibold hover:text-primary cursor-pointer">
                                    Показать все
                                </div>
                            </div>
                            <div className="bg-secondary w-full rounded shadow-lg p-2 space-y-3">
                                <p className="font-semibold">Подписки</p>
                                <div className="w-full flex flex-col items-start space-y-1">
                                    {
                                        [1,2,3,4,5].map( sub => {
                                            return (
                                                <div className="flex space-x-2 items-center p-1 bg-primary w-full rounded hover:bg-primary-focus">
                                                    <div className="avatar">
                                                        <div
                                                            className="w-8 h-8 p-px bg-opacity-10 mask mask-squircle bg-base-content">
                                                            <img src={ defaultAvatar}  className="mask mask-squircle"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Бебра1488
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="font-semibold hover:text-primary cursor-pointer">
                                    Показать все
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
});

export default UserPage;
