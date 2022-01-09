import React, {useEffect, useState} from 'react';
import {difference} from "next/dist/build/utils";
import {getAllTests} from "../../http/TestAPI";
import {useHistory} from "react-router-dom";

const Tests = () => {

    const history = useHistory();
    const [tests, setTests] = useState([])

    useEffect(async () => {
        const loadedTests =  await getAllTests()
        setTests(loadedTests)
    }, [])


    const differenceBetweenDates = (textDate) => {
        const date = new Date(textDate)
        return Math.ceil(Math.abs( new Date() - date )/ (1000 * 60 * 60 * 24));
    }


    return (
        <div className="w-full font-montserrat md:pb-8 pb-4">
            <div className="max-w-7xl mx-auto py-10 px-3 grid grid-cols-3 gap-4">

                {
                    tests.sort((t1,t2) => {
                        return new Date(t2.createdAt) - new Date(t1.createdAt);
                    }).map( test => {
                        return (
                            <div className="card card-bordered bg-secondary shadow-lg">
                                <div className="card-body flex-grow">
                                    <h2 className="card-title">{ test.name }
                                        {
                                            differenceBetweenDates(test.createdAt) < 3 &&
                                            <div className="badge mx-2 badge-primary">
                                                НОВОЕ
                                            </div>
                                        }
                                    </h2>
                                    <div className={ `flex-grow ${test.description.length > 300 ? "text-wrap" : ""}`}>
                                        { test.description.length > 100 ? test.description.slice(0, 100) + '...' : test.description }
                                    </div>
                                    <div className="justify-end card-actions">
                                        <button className="btn btn-primary" onClick={() => history.push('/tests/' + test.id)}>Подробнее</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Tests;
