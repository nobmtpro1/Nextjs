import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import Slider from "react-slick";
import { DOCUMENT_PODCAST } from '../../../../constants/route';
import { slug } from '../../../../utils/helper'


const settings = {
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 2,
	slidesToScroll: 2,
	draggable: true,
	arrows: false,
};

const Related = ({styles, href, name, data }) =>
{

    const router = useRouter()

    return (
        <div className={ `${ styles.related }` }>
            <div className={ `${ styles.top }` }>
                <h2 className={ `${ styles.title }` }>{name} liên quan</h2>
                <Link passHref href={ href }><a className={ `${ styles.more }` } href="#">Xem thêm <span className={ `${ styles.image }` }> <img alt='' src="/images/document-glossary-detail-more?.png" /> </span></a></Link>
            </div>
            <div className={ styles.items }>
                {
                    data?.map( ( e, i ) => (
                        <div className={ styles.item } key={ i }>
                            <div className={ styles.image }>
                                <img alt='' src={ process.env.IMG_URL + e?.image } />
                            </div>

                            <h3 className={ styles.name }>{ e?.name }</h3>
                            <div className={ styles.category }>
                                <span>{ e?.category.name }</span>
                            </div>
                            <div className={ styles.description }>
                                { e?.description }
                            </div>
                            <div className={ styles.button }><Link passHref href={ href == DOCUMENT_PODCAST ? DOCUMENT_PODCAST : href + slug( e?.name ) + '-' + e?.id }><a href="#">Xem ngay</a></Link></div>
                        </div>
                    ) )
                }
            </div>
            <div className={ styles.items_mb }>
                <Slider { ...settings }>
                    {
                        data?.map( ( e, i ) => (
                            <div className={ styles.item } key={ i } onClick={ () => router.push( href == DOCUMENT_PODCAST ? DOCUMENT_PODCAST : href + slug( e?.name ) + '-' + e?.id ) } >
                                <div className={ styles.image }>
                                    <img alt='' src={ process.env.IMG_URL + e?.image } />
                                </div>

                                <h3 className={ styles.name }>{ e?.name }</h3>
                                <div className={ styles.category }>
                                    <span>{ e?.category.name }</span>
                                </div>
                            </div>
                        ) )
                    }
                </ Slider >
            </div>
        </div>
    )
}

export default Related