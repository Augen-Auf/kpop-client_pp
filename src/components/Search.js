import React, {useState} from 'react';
import CardsList from "./CardsList";
import {useForm} from "react-hook-form";
import {EMAIL_REGEX} from "../utils/consts";

import {searchNews} from "../http/NewsAPI";

const Search = ({modalLabel}) => {
    const {register, handleSubmit} = useForm();
    const [searchedNews, setSearchedNews]  = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const sendQuery = async (data) => {
        if(data.searchQuery.trim() !== '') {
            setIsEmpty(false)
            setSearchedNews([])
            const news = await searchNews(data.searchQuery)
            news && news.length > 0 ? setSearchedNews(news) : setIsEmpty(true)
        }
    }

    return (
        <div className="modal items-center">
            <div className="modal-box rounded-box max-w-full xl:w-3/4 w-4/5 h-4/5 flex flex-col">
                <h1 className="py-5 text-4xl text-center">Поиск</h1>
                <form action="" onSubmit={handleSubmit(sendQuery)}>
                    <div className="form-control">
                        <div className="relative">
                            <input type="text" placeholder="Найти..." className="w-full pr-16 input input-bordered border-pink"
                                   {...register('searchQuery')}/>
                                <button type="submit" className="absolute top-0 right-0 rounded-l-none btn bg-pink hover:bg-pink hover:border-pink border-pink">
                                    Поиск
                                </button>
                        </div>
                    </div>
                </form>
                <div className="flex-grow my-3 w-full">
                    { !isEmpty && <CardsList items={ searchedNews }/> }
                    { isEmpty && <p className="text-center text-2xl py-4">Ничего не найдено</p> }
                </div>
                <div className="modal-action bottom-0">
                    <label htmlFor={modalLabel} className="btn">Закрыть</label>
                </div>
            </div>
        </div>
    );
};

export default Search;
