import React, { useEffect, useState } from 'react'
import axios from '../../../sevices/axios'

const PopupReview = ( { styles, active, setActive, handleAddReview, contentReview, setContentReview } ) =>
{

    const handleAdd = () =>
    {
        var design = document.querySelector( '.design_star' )
        var starDesign = design.querySelectorAll( `.${ styles.active }` ).length
        var content = document.querySelector( '.content_star' )
        var starContent = content.querySelectorAll( `.${ styles.active }` ).length
        var appli = document.querySelector( '.appli_star' )
        var starAppli = appli.querySelectorAll( `.${ styles.active }` ).length

        handleAddReview( starDesign, starContent, starAppli )
    }

    useEffect( () =>
    {
        const star = document.querySelectorAll( `.${ styles.rates } .${ styles.rate } .${ styles.right } span` )
        Array.from( star ).forEach( e =>
        {
            e.addEventListener( 'mouseover', function ()
            {
                var all = e.parentElement.querySelectorAll( 'span' )
                for ( var i = 0; i < all.length; i++ )
                {
                    if ( all[ i ] == e )
                    {
                        for ( var x = 0; x <= i; x++ )
                        {
                            all[ x ].classList.add( styles.active )
                        }

                        for ( var x = i + 1; x < ( parseInt( i ) + 5 ); x++ )
                        {
                            if ( x <= 5 )
                            {
                                all[ x ]?.classList?.remove( styles.active )
                            }
                        }
                    }
                }
            } )
        } )
    }, [ styles ] )

    return (
        <div className={ `${ styles.popup_discussion } ${ active && styles.active }` }>
            <div className={ styles.box }>
                <div className={ styles.close }>
                    <div className={ styles.button } onClick={ () => setActive( false ) }>
                        <img alt='' src='/images/main/learning-12.svg' />
                    </div>
                </div>
                <div className={ styles.rates }>
                    <div className={ styles.rate }>
                        <div className={ styles.left }>
                            Thi???t k??? tr???c quan
                        </div>
                        <div className={ `${ styles.right } design_star` }>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className={ styles.rate }>
                        <div className={ styles.left }>
                            N???i dung ph?? h???p
                        </div>
                        <div className={ `${ styles.right } content_star` }>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className={ styles.rate }>
                        <div className={ styles.left }>
                            T??nh ???ng d???ng
                        </div>
                        <div className={ `${ styles.right } appli_star` }>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div className={ styles.input }>
                    <textarea required value={ contentReview } onChange={ e => setContentReview( e.target.value ) } placeholder='Nh???p th???o lu???n t???i ????y...' ></textarea>
                </div>
                <div className={ styles.button } onClick={ handleAdd }>
                    Th??m ????nh gi??
                </div>
            </div>
        </div>
    )
}

export default PopupReview
