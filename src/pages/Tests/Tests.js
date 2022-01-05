import React from 'react';
import {difference} from "next/dist/build/utils";

const Tests = () => {

    const tests = [
        {
            name: "Test 1",
            description: "Учитывая ключевые сценарии поведения, выбранный нами инновационный путь, " +
                "в своём классическом представлении, допускает внедрение инновационных методов управления процессами." +
                "Равным образом, новая модель организационной деятельности играет важную роль в формировании " +
                "существующих финансовых и административных условий.",
            createdAt: "2022-01-05T11:18:35Z"
        },
        {
            name: "Test 2",
            description: "А также многие известные личности набирают популярность среди определенных слоев населения," +
                " а значит, должны быть превращены в посмешище, хотя само их существование приносит несомненную " +
                "пользу обществу. Приятно, граждане, наблюдать, как сделанные на базе интернет-аналитики выводы " +
                "формируют глобальную экономическую сеть и при этом - в равной степени предоставлены сами себе.",
            createdAt: "2021-01-05T11:18:35Z"
        },
        {
            name: "Test 3",
            description: "Многие известные личности рассмотрены исключительно в разрезе маркетинговых и финансовых " +
                "предпосылок. Но многие известные личности превращены в посмешище, " +
                "хотя само их существование приносит несомненную пользу обществу.",
            createdAt: "2022-01-03T11:18:35Z"
        },
        {
            name: "Test 4",
            description: "Являясь всего лишь частью общей картины, диаграммы связей ограничены исключительно образом " +
                "мышления. Принимая во внимание показатели успешности, новая модель организационной деятельности " +
                "способствует повышению качества позиций, занимаемых участниками в отношении поставленных задач.",
            createdAt: "2022-01-05T11:18:35Z"
        },
        {
            name: "Test 5",
            description: "Сторонники тоталитаризма в науке объединены в целые кластеры себе подобных. Мы вынуждены " +
                "отталкиваться от того, что повышение уровня гражданского сознания обеспечивает широкому кругу " +
                "(специалистов) участие в формировании как самодостаточных, " +
                "так и внешне зависимых концептуальных решений.",
            createdAt: "2021-12-05T11:18:35Z"
        },
    ]

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
                                <figure>
                                    <img src="https://picsum.photos/id/1005/400/250"/>
                                </figure>
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
                                        <button className="btn btn-primary">Подробнее</button>
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
