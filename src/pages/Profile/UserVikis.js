import React, {useEffect, useState} from 'react';
import moment from "moment";
import {useHistory, useLocation} from "react-router-dom";
import { getVikis } from "../../http/userAPI";
import {deleteVikis} from "../../http/VikiAPI";

const UserVikis = ({userId}) => {
    const [userVikis, setUserVikis] = useState([])
    const history = useHistory()
    const location = useLocation()

    const removeViki = async (id) => {
        deleteVikis(id).then(r => {
            history.push('/vikis')
        })
    }

    const getUserVikis = async (id) => {
        return await getVikis(id)
    }
    useEffect(() => {
        getUserVikis(userId).then(r => {
            console.log('userVikis', r)
            if(r && r.length > 0) {
                r = r.map(item => {
                    item.imageLink = item.image_id ? process.env.REACT_APP_API_URL + 'api/images/' + item.image_id : null
                    return item
                })
            }
            setUserVikis(r)
        })
    }, [])

    return (
        <div className="p-5 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-xl">Мои вики</span>
                {
                    !location.pathname.includes('/author') &&
                    <button className="bg-blue p-2 rounded-md hover:bg-pink focus:outline-none" onClick={() => {history.push('/create/vikis')}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                }
            </div>
            {
                userVikis && userVikis.length > 0 ?
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
                        {
                            userVikis.map( item =>
                                <div className="card-body p-4 bg-primary rounded">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex space-x-3 items-center">
                                            <div className="w-14 h-14 rounded bg-pink">
                                                {item.imageLink &&
                                                <img src={item.imageLink} className="object-cover rounded-md w-full h-full" alt=""/>
                                                }
                                            </div>
                                            <span className="font-semibold text-lg mr-3">{ item.name }</span>
                                        </div>
                                        {
                                            !location.pathname.includes('/author') &&
                                            <div className="flex space-x-2">
                                                <button className="btn btn-square btn-neural" onClick={() => {history.push('/update/vikis/'+item.id)}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button className="btn btn-square btn-neural" onClick={() => removeViki(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                    <p className="text-sm">{ moment(item.createdAt).format('DD.MM.YYYY') }</p>
                                    <div className="truncate">{item.short_description}</div>
                                    <div className="card-actions">
                                        <button className="btn btn-neutral" onClick={() => history.push('/news/' + item.id)}>Подробнее</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    :
                    <span>0 Новостей</span>
            }
        </div>
    );
}

export default UserVikis;
