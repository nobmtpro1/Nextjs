import Link from 'next/link'
import React, { useState } from 'react'
import { BUSINESS_HOME, DOCUMENT_BLOG, DOCUMENT_EBOOK, DOCUMENT_GLOSSARY, DOCUMENT_PODCAST, DOCUMENT_PROJECT, DOCUMENT_TEST, DOCUMENT_YOUTUBE, LOGIN, PRODUCT_COURSE, PRODUCT_SESSION } from "../../../../constants/route";
import ProductCourseHeaderMb from './ProductCourseHeaderMb';
import ProductSessionHeaderMb from './ProductSessionHeaderMb';


const MenuMb = ( { styles, props, openHeaderMb, data } ) =>
{
    const [ openSubMenu1, setOpenSubMenu1 ] = useState( false )
    const [ openSubMenu2, setOpenSubMenu2 ] = useState( false )
    const [ openDropdown, setOpenDropdown ] = useState( false )

    return (
        <div className={ `${ styles.header_mb }` }>
            <ul className={ `${ styles.ul_1 } ${ openHeaderMb ? styles.active : '' }` }>
                {
                    !data && <li className={ styles.li_2 }>
                        <Link href={ LOGIN } passHref>
                            <a href='#' className={ styles.link_3 }>Login/Register</a>
                        </Link>
                    </li>
                }

                <li className={ styles.li_2 }>
                    <Link href={ BUSINESS_HOME } passHref>
                        <a href='#' className={ styles.link_3 }>Dành cho doanh nghiệp</a>
                    </Link>
                </li>
                <li className={ `${ styles.li_2 } ${ openSubMenu1 ? styles.active : '' }` }>
                    <a href='#' onClick={ () => setOpenSubMenu1( prev => !prev ) } className={ `${ styles.link_3 } ${ styles.dropdown_icon_3 }` }>Khám phá</a>
                    <div className={ styles.dropdown_3 }>
                        <ul className={ styles.ul_4 }>
                            {
                                props?.header?.category?.map( ( e, i ) => (
                                    <li className={ styles.li_5 } key={ i }>
                                        <span className={ styles.text_6 } onClick={ () => setOpenDropdown( prev => prev === i ? false : i ) }>{ e.name }</span>
                                        <div className={ `${ styles.dropdown_7 } ${ openDropdown === i ? styles.active : '' }` }>
                                            <div className={ styles.item_8 }>
                                                <div className={ styles.top_9 }>
                                                    <div className={ styles.title_10 }>
                                                        Khóa học
                                                    </div>
                                                    <Link href={ PRODUCT_COURSE.slice( 0, -1 ) + '?category=' + e.id } passHref>
                                                        <a href='#' className={ styles.all_10 }>
                                                            Xem tất cả
                                                        </a>
                                                    </Link>
                                                </div>
                                                {
                                                    e?.course[ 0 ] && <ProductCourseHeaderMb styles={ styles } data={ e?.course[ 0 ] } />
                                                }
                                            </div>
                                            <div className={ styles.item_8 }>
                                                <div className={ styles.top_9 }>
                                                    <div className={ styles.title_10 }>
                                                        Bài học
                                                    </div>
                                                    <Link href={ PRODUCT_SESSION.slice( 0, -1 ) + '?category=' + e.id } passHref>
                                                        <a href='#' className={ styles.all_10 }>
                                                            Xem tất cả
                                                        </a>
                                                    </Link>
                                                </div>
                                                {
                                                    e?.session[ 0 ] && <ProductSessionHeaderMb styles={ styles } data={ e?.session[ 0 ] } />
                                                }
                                            </div>
                                        </div>
                                    </li>
                                ) )
                            }
                            <li className={ styles.li_5 }>
                                <Link href={ PRODUCT_SESSION } passHref>
                                    <a className={ `${ styles.text_6 } ${ styles.all_6 }` }>Xem tất cả</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className={ `${ styles.li_2 } ${ openSubMenu2 ? styles.active : '' }` }>
                    <a href='#' onClick={ () => setOpenSubMenu2( prev => !prev ) } className={ `${ styles.link_3 } ${ styles.dropdown_icon_3 }` }>Tài liệu</a>
                    <div className={ styles.dropdown_3 }>
                        <ul className={ styles.ul_4 }>
                            <li className={ styles.li_5 }>
                                <Link href={ DOCUMENT_GLOSSARY } passHref>
                                    <a href='#' className={ styles.text_6 }>Glossary</a>
                                </Link>
                            </li>
                            <li className={ styles.li_5 }>
                                <Link href={ DOCUMENT_EBOOK } passHref>
                                    <a href='#' className={ styles.text_6 }>Ebook</a>
                                </Link>
                            </li>
                            <li className={ styles.li_5 }>
                                <Link href={ DOCUMENT_PROJECT } passHref>
                                    <a href='#' className={ styles.text_6 }>Đồ án tốt nghiệp</a>
                                </Link>
                            </li>
                            <li className={ styles.li_5 }>
                                <Link href={ DOCUMENT_TEST } passHref>
                                    <a href='#' className={ styles.text_6 }>Bài test digital</a>
                                </Link>
                            </li>
                            <li className={ styles.li_5 }>
                                <Link href={ DOCUMENT_YOUTUBE } passHref>
                                    <a href='#' className={ styles.text_6 }>Video</a>
                                </Link>
                            </li>
                            <li className={ styles.li_5 }>
                                <Link href={ DOCUMENT_PODCAST } passHref>
                                    <a href='#' className={ styles.text_6 }>Podcast</a>
                                </Link>
                            </li>
                            <li className={ styles.li_5 }>
                                <Link href={ DOCUMENT_BLOG } passHref>
                                    <a href='#' className={ styles.text_6 }>Blog</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default MenuMb