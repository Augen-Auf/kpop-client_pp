import React, {useEffect, useState} from 'react';
import {fetchNews, getAllTags} from "../http/NewsAPI";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {getUserSubscriptionsNews} from "../http/SubscriptionAPI";
import {useAuth} from "../contexts/FirebaseAuthContext";

const News = () => {
    const { userStore } = useAuth();
    const history = useHistory();
    const [news, setNews] = useState([])
    const [tags, setTags] = useState([])
    const [activeTag, setActiveTag] = useState(null)
    const [activeSection, setActiveSection] = useState('all')

    const sections = [
        {title: 'Свежие новости', value: 'all'},
        {title: 'Лента', value: 'subscriptions'},
    ]

    const sortNewsByDate = (a, b) => {
        const aDate = moment(a.createdAt)
        const bDate = moment(b.createdAt)
        if(aDate.diff(bDate) > 0)
            return -1
        if(aDate.diff(bDate) < 0)
            return 1
        return 0
    }

    useEffect(async () => {

        let news = activeSection !== 'all' && userStore.isAuth ?
            await getUserSubscriptionsNews(userStore.dbUser.id) : await fetchNews()

        if(news && news.length > 0)
        {
            news = activeTag ? news.filter(item => item.tags && item.tags.find(tag => tag.id === activeTag)) : news

            news = news.map(item => {
                item.imageLink = item.image_id ? process.env.REACT_APP_API_URL + 'api/images/' + item.image_id : null
                return item
            })
        }
        setNews(news.sort(sortNewsByDate))

    },[activeSection, activeTag])

    useEffect(() => {
        getAllTags().then(r => {
            setTags(r)
        })
    }, [])

    return (
        <div className="w-full font-montserrat md:pb-8 pb-4 py-10">
            {userStore.isAuth &&
            <div className="w-1/4 tabs tabs-boxed mx-auto justify-center py-3 border border-primary bg-secondary">
                {
                    sections.map(section =>
                        <a className={`tab ${activeSection === section.value && 'tab-active'} text-lg`}
                           onClick={() => setActiveSection(section.value)}>
                            {section.title}
                        </a>
                    )
                }
            </div>
            }
            <div className="max-w-7xl mx-auto flex md:flex-row flex-col-reverse justify-between py-5">
                <div className="flex flex-col space-y-10 mb:w-3/4 w-full px-4 pb-10">
                    <div className="w-full grid grid-rows-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {news && news.length > 0 && news.slice(0,2).map( item =>
                            <div
                                className="py-5 rounded-md bg-pink bg-center row-span-3 flex items-end h-64 cursor-pointer"
                                onClick={() => {history.push('/news/'+item.id)}}
                                style={{backgroundImage: item.imageLink ? `url(${ item.imageLink })` : null, backgroundSize: 'cover'}}>
                                <div className="w-5/6 p-2 bg-yellow bg-opacity-80 hover:bg-pink">
                                <span>
                                    {item.title}
                                </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
                        { news && news.slice(2).map( item =>
                            <div
                                className="py-5 rounded-md bg-pink h-48 bg-center flex items-end cursor-pointer"
                                onClick={() => {history.push('/news/'+item.id)}}
                                style={{backgroundImage: item.imageLink ? `url(${ item.imageLink })` : null, backgroundSize: 'cover'}}>
                                <div className="w-full p-2 bg-yellow bg-opacity-80 hover:bg-pink">
                                <span className="text-xs">
                                    {item.title}
                                </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:sticky md:top-10 md:h-full flex flex-col space-y-4 md:w-1/4 w-full px-4 md:mb-0 mb-4">
                    <div className="w-full p-2 bg-yellow flex items-center justify-center rounded-md">
                        <span>Теги</span>
                    </div>
                    <div className="w-full flex flex-wrap justify-start">
                        {tags && tags.map(item =>
                            <div
                                className={`px-3 py-2 ${ activeTag === item.id ? 'bg-white' : 'hover:bg-white'} border border-gray-800 rounded-md m-2 cursor-pointer`}
                                onClick={() => setActiveTag(item.id === activeTag ? null: item.id)}
                            >
                                <span>
                                    { item.tag }
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
