import React from 'react';
import { useState } from 'react';

const Question = ( { styles, data } ) =>
{
    const [ hide, setHide ] = useState( true )
    return (
        <div className={ styles.box_sp }>
            <h4>{ data?.question }</h4>
            <div className={ styles.content }>
                <p className={ hide ? styles.hide : '' } dangerouslySetInnerHTML={ { __html: data?.answer } }>

                </p>
                {
                    ( hide && data?.answer?.length > 166 ) && <div className={ styles.watch_more }>
                        <div>
                            <a style={ { cursor: 'pointer' } } onClick={ () => setHide( false ) }>xem thêm</a>
                        </div>
                        <div className={ styles.img_content }>
                            <img alt='' src="/images/down.svg" />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};

export default Question;
