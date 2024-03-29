import React, {useContext, useEffect, useState} from 'react';
import {Dialog} from "@headlessui/react";
import {EMAIL_REGEX, LOGIN_ROUTE} from "../../utils/consts";
import {useForm} from "react-hook-form";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import {observer} from "mobx-react-lite";
import {getAvatar, updateUser} from "../../http/userAPI";
import defaultAvatar from "../../style/img/devault_avatar.jpg";
import {useHistory} from "react-router-dom";

const UpdateProfileForm = observer(({openForm}) => {

    const {userStore, signOut} = useAuth();
    const history = useHistory()

    const [avatar, setAvatar] = useState(userStore.dbUser.avatarId)
    const [avatarAction, setAvatarAction] = useState(null)
    const {register, handleSubmit, formState: { errors }, setValue} = useForm({
        defaultValues: {
            name: userStore.dbUser.nickname,
            email: userStore.firebaseUser.providerData[0].providerId === 'password' ? userStore.firebaseUser.email : null
        }
    });

    useEffect(() => {
        setAvatar(userStore.isAuth && userStore.dbUser.avatarId ?
            process.env.REACT_APP_API_URL + 'api/avatar/' + userStore.dbUser.avatarId : null)
    }, [])

    const removeAvatar = () => {
        setAvatar(null)
        setAvatarAction('remove')
    }
    const changeAvatar = (e) => {
        console.log(e.target.files);
        setAvatarAction('set')
        setValue('avatarImage', e.target.files[0])
        setAvatar(URL.createObjectURL(e.target.files[0]))
    }

    const changeUserData = async ({name, email, avatarImage}) => {
        console.log({name, email, avatarImage})
        const userData = await updateUser(userStore.firebaseUser.uid, name, email, avatarImage, avatarAction)
        if(email) {
            await signOut()
            history.push(LOGIN_ROUTE)
            userStore.setDbUser({});
            userStore.setFirebaseUser({});
            userStore.setIsAuth(false);
            localStorage.removeItem('token')

        }
        else {
            userStore.setDbUser(userData);
            openForm(false)
        }

    }

    const close = () => {
        setValue('name', userStore.dbUser.nickname);
        setValue('email', userStore.firebaseUser.email);
        openForm(false)
    }


    return (
        <>
            <Dialog.Title as="p" className="text-lg font-semibold">Редактировать профиль</Dialog.Title>
            <div className="flex flex-col space-y-3">
                <form className="flex flex-col space-y-3" onSubmit={handleSubmit(changeUserData)}>
                    <div>
                        <div className="mx-auto bg-gray-400 aspect-w-16 aspect-h-8 w-1/2 rounded-md">
                            <img src={avatar ?? defaultAvatar} alt="" className="rounded-md object-cover"/>
                        </div>
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                        <label>Аватар</label>
                        <label
                            className="flex justify-center items-center space-x-2 px-4 py-2 bg-white text-pink rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-pink hover:text-white">
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                            </svg>
                            <span className="text-base leading-normal">Выберите фото</span>
                            <input type='file' className="hidden" onChange={(e) => changeAvatar(e)}/>
                        </label>
                        <button type="button" className="px-3 py-2 bg-pink rounded-md focus:outline-none" onClick={() => removeAvatar()}>Сбросить</button>
                    </div>

                    <div className="flex flex-col w-full">
                        <label>Имя</label>
                        <input className="px-3 py-2 border rounded-md focus:outline-none focus:border-pink"
                               {...register('name', {required: "Поле имя не заполнено"})}/>
                    </div>

                    {
                        userStore.isAuth && userStore.firebaseUser.providerData[0].providerId === 'password' &&
                        <div className="flex flex-col w-full">
                            <label>Почта</label>
                            <input className="px-3 py-2 border rounded-md focus:outline-none focus:border-pink"
                               {...register('email', {
                                   required: "Поле email не заполнено",
                                   pattern: {value: EMAIL_REGEX, message: "В поле введен не email"}
                               })}/>
                        </div>
                    }
                    <div className="flex space-x-5">
                        <button className="px-3 py-2 bg-pink rounded-md focus:outline-none" type="button" onClick={() => close()}>Закрыть</button>
                        <button className="px-3 py-2 bg-pink rounded-md focus:outline-none" type="submit">Изменить</button>
                    </div>
                </form>
            </div>
        </>
    );
});

export default UpdateProfileForm;
