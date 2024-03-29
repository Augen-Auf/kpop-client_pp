import React, {useContext, useEffect, useState} from 'react';
import { useAuth } from "../contexts/FirebaseAuthContext";
import { Fragment } from 'react'
import Modal from 'react-modal';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import {
    ARTICLES_ROUTE,
    LOGIN_ROUTE,
    MUSIC_ROUTE,
    NEWS_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    TESTS_ROUTE,
    STATISTICS_ROUTE,
    TRENDS_ROUTE, VIKIS_ROUTE
} from "../utils/consts";

import {observer} from "mobx-react-lite";
import {Link, useHistory, useLocation} from "react-router-dom";
import {publicRoutes, authRoutes} from "../routes";
import Search from "./Search";
import defaultAvatar from "../style/img/devault_avatar.jpg"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

Modal.setAppElement('#root');

const NavBar = observer(() => {

    const { userStore, signOut } = useAuth();
    const location = useLocation();
    const history = useHistory()
    const [avatar,setAvatar] = useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const routesList = [ ...publicRoutes, ...authRoutes ]
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const navigation = [
        {title:'НОВОСТИ', link:NEWS_ROUTE},
        {title:'ВИКИ', link:VIKIS_ROUTE},
        {title:'ТРЕНДЫ', link:TRENDS_ROUTE},
        {title:'МУЗЫКА', link:MUSIC_ROUTE},
        {title:'АНАЛИЗ', link:STATISTICS_ROUTE},
        {title:'ТЕСТЫ', link:TESTS_ROUTE},

    ];
    const unauth_profile = [{title:'Войти', link: LOGIN_ROUTE}, {title:'Зарегистрироваться', link: REGISTRATION_ROUTE}];
    const currentSectionTitle = routesList.find( item => location.pathname === item.path)?.name

    const logOut = async () => {
        await signOut()
        userStore.setDbUser({});
        userStore.setFirebaseUser({});
        userStore.setIsAuth(false);
        localStorage.removeItem('token')
        history.push(LOGIN_ROUTE)
    };

    const profile = [
        {title:'Мой профиль', link: PROFILE_ROUTE},
        {title:'Выйти', func: () => logOut()}
    ];

    useEffect(() => {
        setAvatar(userStore.isAuth ?
            userStore.dbUser.avatarId ?
                process.env.REACT_APP_API_URL + 'api/avatar/' + userStore.dbUser.avatarId : defaultAvatar
            :
            null)
    }, [userStore.isAuth])

    return (
        <div className='font-montserrat font-medium'>
            <>
                <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
                    <div className="justify-between flex items-center h-full md:bg-transparent bg-blue-dark md:px-0 px-4">
                        <div className="flex md:hidden w-1/12 justify-start">
                            {/* Mobile menu button */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none bg-pink inline-flex items-center justify-center p-2 rounded-md hover:text-white">

                                {mobileMenuOpen ? (
                                    <XIcon className="block h-6 w-6 rounded-md" aria-hidden="true" />
                                ) : (
                                    <MenuIcon className="block h-6 w-6 rounded-md" aria-hidden="true" />
                                )}
                            </button>
                        </div>

                        <div className="flex-shrink-0 md:w-2/12 w-7/12 flex justify-center">
                            <img
                                className="h-12 w-90 md:ml-0 ml-12"
                                src="img/Logo.svg"/>
                        </div>
                        <div className="hidden md:block w-8/12">
                            <div className="flex items-center justify-end">
                                {navigation.map((item, itemIdx) =>
                                    <Fragment key={'menu-item_' + itemIdx}>
                                        <Link to={item.link} className={`text-black bg-blue-dark ${location.pathname === item.link ? 'bg-pink':'hover:bg-pink'} px-5 py-5 text-sm font-medium`}>
                                            {item.title}
                                        </Link>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className="w-3/12 flex md:justify-around justify-between md:ml-10">
                            <Fragment>
                                <button
                                    className="btn btn-primary btn-square rounded-full bg-pink cursor-pointer text-black"
                                    onClick={openModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 px-2 py-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                <input type="checkbox" id="my-modal-3" className="modal-toggle"/>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    className="mx-auto modal-box rounded-box max-w-full xl:w-3/4 w-4/5 h-4/5 flex flex-col"
                                    contentLabel="Example Modal"
                                >
                                    <Search close={closeModal}/>
                                </Modal>
                            </Fragment>
                            <div className="flex items-center">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    {({ open }) => (
                                        <>
                                            <div>
                                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <div className="rounded-full h-10 w-10 bg-pink flex justify-center items-center">
                                                        {
                                                            avatar ?
                                                                <img
                                                                    src={avatar}
                                                                    className="object-cover rounded-full w-full h-full" alt=""/>
                                                                :
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                                </svg>

                                                        }
                                                    </div>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    {
                                                        userStore.isAuth ?
                                                            profile.map((item, itIdx) => (
                                                                <Menu.Item key={'main_' + itIdx}>
                                                                    {({ active }) => (
                                                                        <a
                                                                            href={item.link}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                            onClick={item.func}
                                                                            // onClick={() => history.push(PROFILE_ROUTE)}
                                                                        >
                                                                            {item.title}
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                            )) :
                                                            unauth_profile.map((item,itIdx) => (
                                                                <Menu.Item key={'main_' + itIdx}>
                                                                    {({ active }) => (
                                                                        <a
                                                                            href={item.link}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {item.title}
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                            ))
                                                    }
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                    </div>
                    { mobileMenuOpen && <div className="md:hidden w-full bg-blue-dark">
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {navigation.map((item, itemIdx) =>
                                <a
                                    key={item.link}
                                    href={item.link}
                                    className="text-black hover:bg-pink hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {item.title}
                                </a>
                            )}
                        </div>
                    </div> }
                </div>
            </>
            {currentSectionTitle &&
            <header className="bg-pink">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-medium text-gray-900">{ currentSectionTitle }</h1>
                </div>
            </header>
            }
        </div>
    );
});

export default NavBar;
