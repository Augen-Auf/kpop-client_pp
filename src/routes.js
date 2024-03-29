import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    PORTAL_ROUTE,
    NEWS_ROUTE,
    NEWS_PAGE_ROUTE,
    VIKIS_ROUTE,
    CREATE_NEWS_ROUTE,
    STATISTICS_ROUTE,
    MUSIC_ROUTE,
    TRENDS_ROUTE,
    ARTICLES_ROUTE,
    UPDATE_NEWS_ROUTE,
    CREATE_VIKI_ROUTE,
    UPDATE_VIKI_ROUTE,
    VIKI_PAGE_ROUTE,
    SEARCH_ROUTE,
    USER_PAGE_ROUTE,
    TESTS_ROUTE,
    CREATE_TEST_ROUTE,
    TEST_PAGE_ROUTE,
    UPDATE_TEST_ROUTE,
    AUTHOR_ROUTE
} from "./utils/consts";

import Admin from "./pages/Admin";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth";
import Portal from "./pages/Portal";
import News from "./pages/News";
import NewsPage from "./pages/NewsPage";
import Vikis from "./pages/Vikis/Vikis";
import CreateNews from './pages/CreateNews';
import Statistics from './pages/Statistics'
import Music from "./pages/Music";
import Trends from "./pages/Trends";
import Articles from "./pages/Articles";
import CreateUpdateViki from "./pages/Vikis/CreateUpdateViki";
import VikiPage from "./pages/Vikis/VikiPage";
import Search from "./components/Search";
import UserPage from "./pages/UserPage";
import Tests from "./pages/Tests/Tests";
import CreateTestPage from "./pages/Tests/CreateTestPage";
import TestPage from "./pages/Tests/TestPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        name: 'Админ-панель',
        Component: Admin
    },
    {
        path: PROFILE_ROUTE,
        name: 'Профиль',
        Component: Profile
    },
    {
        path: CREATE_VIKI_ROUTE,
        name: 'Создать вики-страничку',
        Component: CreateUpdateViki
    },
    {
        path: UPDATE_VIKI_ROUTE,
        name: 'Обновить вики-страничку',
        Component: CreateUpdateViki
    },
    {
        path: CREATE_NEWS_ROUTE,
        name: 'Создать новость',
        Component: CreateNews
    },
    {
        path: UPDATE_NEWS_ROUTE,
        name: 'Изменить новость',
        Component: CreateNews
    },
    {
        path: CREATE_TEST_ROUTE,
        name: 'Создать тест',
        Component: CreateTestPage
    },
    {
        path: UPDATE_TEST_ROUTE,
        name: 'Обновить тест',
        Component: CreateTestPage
    },
];

export const publicRoutes = [
    {
        path: SEARCH_ROUTE,
        name: 'Поиск',
        Component: Search
    },
    {
        path: TESTS_ROUTE,
        name: 'Тесты',
        Component: Tests
    },
    {
        path: TEST_PAGE_ROUTE,
        name: 'Страница теста',
        Component: TestPage
    },
    {
        path: USER_PAGE_ROUTE,
        name: 'Страница пользователя',
        Component: Profile
    },
    {
        path: VIKIS_ROUTE,
        name: 'Вики',
        Component: Vikis
    },
    {
        path: VIKI_PAGE_ROUTE,
        name: 'Информация об исполнителе',
        Component: VikiPage
    },
    {
        path: REGISTRATION_ROUTE,
        name: 'Регистрация',
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        name: 'Авторизация',
        Component: Auth
    },
    {
        path: PORTAL_ROUTE,
        name: 'Портал',
        Component: Portal
    },
    {
        path: AUTHOR_ROUTE,
        name: 'Страница автора',
        Component: Profile
    },
    {
        path: NEWS_ROUTE,
        name: 'Новости',
        Component: News
    },
    {
        path: NEWS_PAGE_ROUTE,
        name: '',
        Component: NewsPage
    },
    {
        path: STATISTICS_ROUTE,
        name: 'Статистика и анализ',
        Component: Statistics
    },
    {
        path: MUSIC_ROUTE,
        name: 'Музыка',
        Component: Music
    },
    {
        path: TRENDS_ROUTE,
        name: 'Тренды',
        Component: Trends
    },
    {
        path: ARTICLES_ROUTE,
        name: 'Статьи',
        Component: Articles
    },
];
