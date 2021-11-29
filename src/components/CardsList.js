import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

function CardsList({items=[]}) {
    return (
        <>
            <Scrollbars
                autoHide
                renderView={({style, ...props}) => (<div className="lg:block grid sm:grid-cols-2  grid-cols-1 auto-rows-min gap-3" style={{ ...style }} {...props}/>)}
                renderThumbVertical={({style, ...props}) => (<div className="box bg-pink rounded" style={{ ...style }} {...props}/>)}>
            {
                items && items.map(item =>
                    (
                        <div className="card lg:flex-row lg:h-56 bg-yellow text-gray-800 lg:mb-3">
                            <img className="object-cover lg:w-80 lg:h-full h-44" src={ process.env.REACT_APP_API_URL + 'api/images/' + item.image_id }/>
                            <div className="card-body">
                                <h2 className="card-title lg:text-3xl">{item.title}</h2>
                                <p className="text-md flex-grow">{item.lid}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary">Читать</button>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            {
                items && items.map(item =>
                    (
                        <div className="card lg:flex-row lg:h-56 bg-yellow text-gray-800 lg:mb-3">
                            <img className="object-cover lg:w-80 lg:h-full h-44" src={ process.env.REACT_APP_API_URL + 'api/images/' + item.image_id }/>
                            <div className="card-body">
                                <h2 className="card-title lg:text-3xl">{item.title}</h2>
                                <p className="text-md flex-grow">{item.lid}</p>
                                <div className="card-actions">
                                    <button className="btn btn-primary">Читать</button>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            </Scrollbars>
        </>
    );
}

export default CardsList;
