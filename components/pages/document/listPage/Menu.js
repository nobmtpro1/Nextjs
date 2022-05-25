import { useRouter } from 'next/router'
import React from 'react'
import Slider from 'react-slick'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: false
};

const Menu = ( { styles, category, pathname } ) =>
{
    const router = useRouter()
    const categoryId = router.query.category

    const handleChangeCategory = ( id ) =>
    {
        router.push( {
            pathname: pathname,
            query: {
                ...router.query,
                page: 1,
                category: id
            }
        } )
    }

    return (
        <>
            <div className={ `${ styles.menu }` }>
                <Slider { ...settings }>
                    {
                        category?.map( ( e, i ) => (
                            <div key={ i } className={ `${ styles.slide_item }` } onClick={ () => handleChangeCategory( e.id ) }>
                                <div className={ `${ styles.text } ${ categoryId == e.id && styles.active }` }>{ e.name }</div>
                            </div>
                        ) )
                    }
                </Slider>
            </div>

            <div className={ styles.menu_mobile }>
                <select value={ categoryId || "" } className={ styles.select } onChange={ ( e ) => handleChangeCategory( e.target.value ) }>
                    <option value="">All filter</option>
                    {
                        category?.map( ( e, i ) => (
                            <option key={ i } onClick={ () => handleChangeCategory( e.id ) } value={ e.id }>{ e.name }</option>
                        ) )
                    }
                </select>
            </div>
        </>
    )
}

export default Menu