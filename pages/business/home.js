import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/concern_dashboard/concern.module.scss";
import Slider from "react-slick";
import Layout from "../../components/layouts/Layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { BUSINESS_OVERVIEW, BUSINESS_THANKS, HOME } from "../../constants/route";
import axios from "../../sevices/axios";
import Head from 'next/head'

const settings3 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    arrows: true,
};

const settings4 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
    ],
};

const Index = ( props ) =>
{
    const router = useRouter()
    const { user } = useSelector( state => state.account )
    const [ form, setForm ] = useState( {
        name: '',
        email: '',
        phone: '',
        company: '',
        companySize: '',
        numberOfLearners: '',
        need: '',
    } )
    const content = props?.data?.content
    const seo = JSON.parse( props?.data?.seo?.value || '' )

    useEffect( () =>
    {
        if ( user?.data?.is_business == 1 ||  user?.data?.is_business_admin == 1)
        {
            router.push( BUSINESS_OVERVIEW )
        }
    }, [ router, user ] )

    const handleSubmit = ( e ) =>
    {
        e.preventDefault()
        axios.post( `page/business/home/submit`, form ).then( response =>
        {
            router.push( {
                pathname: BUSINESS_THANKS,
                query: {
                    name: form?.name,
                    phone: form?.phone,
                    email: form?.email,
                },
            } )
        } ).catch( error =>
        { } )
    }

    return (
        <>
            <Head>
                <title>{ seo?.title }</title>
                <meta name="description" content={ seo?.description } />
                <meta name="keywords" content={ seo?.keywords } />
                <meta property="og:title" content={ seo?.title } />
                <meta property="og:description" content={ seo?.description } />
                <meta property="og:image" content={ process.env.IMG_URL + seo?.image } />
            </Head>
            <div className={ styles.container_homepage }>
                <div className={ styles.hompage_concern }>
                    <div className={ styles.banner_1 }>
                        <div className={ styles.background_2 }>
                            <img alt='' src={ process.env.IMG_URL + content?.banner?.image } />
                        </div>
                        <div className={ styles.title_2 }>{ content?.banner?.title_normal }</div>
                        <div className={ styles.description_2 }>
                            { content?.banner?.title_color }
                        </div>
                        <p className={ styles.desc_p }>
                            { content?.banner?.description }
                        </p>
                        <div className={ styles.buttons_2 }>
                            <a href="#contact" className={ styles.advise }> Tư vấn ngay</a>
                        </div>
                    </div>

                    <div className={ styles.wrapper_box_1 }>
                        <div className={ styles.box_1 }>
                            <div className={ styles.item }>
                                <div className={ styles.img_box }>
                                    <img alt='' src="/images/it1.svg" />
                                </div>
                                <div className={ styles.content_item }>
                                    <h4>    { content?.box[ 0 ]?.title }</h4>
                                    <p>
                                        { content?.box[ 0 ]?.content }
                                    </p>
                                </div>
                            </div>
                            <div className={ styles.item }>
                                <div className={ styles.img_box }>
                                    <img alt='' src="/images/it2.svg" />
                                </div>
                                <div className={ styles.content_item }>
                                    <h4>    { content?.box[ 1 ]?.title }</h4>
                                    <p>
                                        { content?.box[ 1 ]?.content }
                                    </p>
                                </div>
                            </div>
                            <div className={ styles.item }>
                                <div className={ styles.img_box }>
                                    <img alt='' src="/images/it3.svg" />
                                </div>
                                <div className={ styles.content_item }>
                                    <h4>    { content?.box[ 2 ]?.title }</h4>
                                    <p>
                                        { content?.box[ 2 ]?.content }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={ styles.wrapper_box_2 }>
                        <div className={ styles.img_2 }>
                            <img alt='' src="/images/business/home-manager.jpg" />
                        </div>
                        <div className={ styles.content_box_2 }>
                            <h1>Tính năng quản trị ưu việt</h1>
                            {
                                content?.management?.map( ( e, i ) => (
                                    <div className={ styles.item } key={ i }>
                                        <div className={ styles.tick }>
                                            <img alt='' src="/images/tick.svg" />
                                        </div>
                                        <div className={ styles.desc }>
                                            <p>
                                                { e }
                                            </p>
                                        </div>
                                    </div>
                                ) )
                            }
                        </div>
                    </div>

                    <div className={ styles.wrapper_box_3 }>
                        <div className={ styles.content_box_2 }>
                            <h1>Xem video minh họa</h1>
                            <div className={ styles.vd_p } dangerouslySetInnerHTML={ { __html: content?.video?.description } }>

                            </div>
                        </div>
                        <a href={ content?.video?.link } target="_blank" rel="noreferrer" className={ styles.img_box_3 }>
                            <div className={ styles.playVD }>
                                <img alt='' src="/images/vd.svg" />
                            </div>
                            <div className={ styles.play }>
                                <img alt='' src="/images/play.svg" />
                            </div>
                        </a>
                    </div>

                    <div className={ `${ styles.area2_mb }` }>
                        <div className={ styles.grid_img }>
                            <div className={ styles.grid_img1 }>
                                <img alt='' src="/images/business/home-grid-1.jpg" />
                            </div>
                            <div className={ styles.grid_img1 }>
                                <img alt='' src="/images/business/home-grid-2.jpg" />
                            </div>
                        </div>
                        <div className={ styles.img_box }>
                            <img alt='' src="/images/business/home-grid-3.jpg" />
                        </div>
                        <div className={ styles.content_box }>
                            <h1>Lộ trình học và hoàn thiện kỹ năng chuyên nghiệp</h1>
                            {
                                content?.study_route_mb?.map( ( e, i ) => (
                                    <div className={ styles.item } key={ i }>
                                        <div className={ styles.tick }>
                                            <img alt='' src="/images/tick.svg" />
                                        </div>
                                        <div className={ styles.desc }>
                                            <p>
                                                { e }
                                            </p>
                                        </div>
                                    </div>
                                ) )
                            }
                        </div>
                    </div>

                    <div className={ styles.area3_mb }>
                        <div className={ styles.img_area }>
                            <img alt='' src="/images/business/home-study.png" />
                        </div>
                        <div className={ styles.content_box }>
                            <h1>LMS - Hệ thống quản lý học tập </h1>
                            <p>
                                { content?.lms_mb?.content }
                            </p>
                            <div className={ styles.btn_watch_vd }>
                                <a target="_blank" rel="noreferrer" href={ content?.lms_mb?.link }>Xem video</a>
                            </div>
                        </div>
                    </div>

                    <div className={ styles.area4_mb }>
                        <div className={ styles.img_box }>
                            <img alt='' src="/images/business/home-benefit.jpg" />
                        </div>
                        <div className={ styles.content_box }>
                            <h1>Ưu điểm học doanh nghiệp</h1>
                            {
                                content?.advantages_mb?.map( ( e, i ) => (
                                    <div className={ styles.item } key={ i }>
                                        <div className={ styles.tick }>
                                            <img alt='' src="/images/tick.svg" />
                                        </div>
                                        <div className={ styles.desc }>
                                            <p>
                                                { e }
                                            </p>
                                        </div>
                                    </div>
                                ) )
                            }
                        </div>
                    </div>

                    <div className={ `${ styles.area5_1 }` } id="main-page-products">
                        <Slider { ...settings3 }>
                            {
                                content?.slide?.map( ( e, i ) => (
                                    <div className={ `${ styles.slide_item }` } key={ i }>
                                        <div className={ `${ styles.slide_container }` }>
                                            <div className={ `${ styles.image }` }>
                                                <img alt='' src={ process.env.IMG_URL + e?.image } />
                                            </div>
                                            <div className={ styles.img_mb }>
                                                <img alt='' src={ process.env.IMG_URL + e?.image } />
                                            </div>
                                            <div className={ `${ styles.text }` }>
                                                <div className={ `${ styles.content }` }>
                                                    { e?.content }
                                                </div>
                                                <div className={ `${ styles.name }` }>  { e?.name }</div>
                                                <div className={ `${ styles.description }` }>
                                                    { e?.description }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) )
                            }
                        </Slider>
                    </div>

                    <div className={ `${ styles.area5_mb }` }>
                        <div className={ `${ styles.head_2 }` }>Khách hàng tin tưởng</div>
                        <div className={ `${ styles.body_2 }` }>
                            <div className={ `${ styles.col_3 }` }>
                                <div className={ `${ styles.head_4 }` }>
                                    <div className={ `${ styles.image_5 }` }>
                                        <img alt='' src="/images/home-8.png" />
                                    </div>
                                    <div className={ `${ styles.image_5 }` }>
                                        <img alt='' src="/images/home-9.png" />
                                    </div>
                                </div>
                                <div className={ `${ styles.body_4 }` }>
                                    <span>
                                        Đại diện chính thức
                                        <br />
                                        tại Việt Nam
                                    </span>
                                </div>
                            </div>
                            <div className={ `${ styles.col_3 }` }>
                                <div className={ `${ styles.head_4 }` }>
                                    <div className={ `${ styles.image_5 }` }>
                                        <img alt='' src="/images/home-10.png" />
                                    </div>
                                </div>
                                <div className={ `${ styles.body_4 }` }>
                                    <span>Đại diện đào tạo</span>
                                </div>
                            </div>
                            <div className={ `${ styles.col_3 }` }>
                                <div className={ `${ styles.head_4 }` }>
                                    <div className={ `${ styles.image_5 }` }>
                                        <img alt='' src="/images/home-11.png" />
                                    </div>
                                </div>
                                <div className={ `${ styles.body_4 }` }>
                                    <span>Đồng tổ chức</span>
                                </div>
                            </div>
                        </div>

                        <div className={ `${ styles.logos }` }>
                            {
                                content?.business?.map( ( e, i ) => (
                                    <div className={ `${ styles.image }` } key={ i }>
                                        <img alt='' src={ process.env.IMG_URL + e } />
                                    </div>
                                ) )
                            }
                        </div>
                    </div>

                    <div className={ `${ styles.area6_1 }` }>
                        <div className={ styles.title }>
                            <h1>Các doanh nghiệp đã tin tưởng đồng hành</h1>
                        </div>
                        <div className={ `${ styles.slide_2 }` } id="home-page-logo">
                            <Slider { ...settings4 }>
                                {
                                    content?.business?.map( ( e, i ) => (
                                        <div className={ `${ styles.slide_item }` } key={ i }>
                                            <div className={ `${ styles.image }` }>
                                                <img alt='' src={ process.env.IMG_URL + e } />
                                            </div>
                                        </div>
                                    ) )
                                }
                            </Slider>
                        </div>
                    </div>

                    <div className={ styles.area7_1 } id="contact">
                        <div className={ styles.img_contact_mb }>
                            <img alt='' src="/images/business/home-contact.jpg" />
                        </div>
                        <div className={ styles.form_contact }>
                            <h1>Liên hệ tư vấn</h1>
                            <form className={ styles.form } onSubmit={ handleSubmit }>
                                <input
                                    required
                                    type="text"
                                    placeholder="Họ tên người liên hệ*"
                                    className={ styles.input_text }
                                    value={ form?.name }
                                    onChange={ e => setForm( prev => ( { ...prev, name: e.target.value } ) ) }
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="Email công việc*"
                                    className={ styles.input_text }
                                    value={ form?.email }
                                    onChange={ e => setForm( prev => ( { ...prev, email: e.target.value } ) ) }
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="Số điện thoại*"
                                    className={ styles.input_text }
                                    value={ form?.phone }
                                    onChange={ e => setForm( prev => ( { ...prev, phone: e.target.value } ) ) }
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="Công ty*"
                                    className={ styles.input_text }
                                    value={ form?.company }
                                    onChange={ e => setForm( prev => ( { ...prev, company: e.target.value } ) ) }
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="Quy mô công ty*"
                                    className={ styles.input_text }
                                    value={ form?.companySize }
                                    onChange={ e => setForm( prev => ( { ...prev, companySize: e.target.value } ) ) }
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="Số lượng người học (dự kiến)*"
                                    className={ styles.input_text }
                                    value={ form?.numberOfLearners }
                                    onChange={ e => setForm( prev => ( { ...prev, numberOfLearners: e.target.value } ) ) }
                                />
                                <textarea
                                    required
                                    placeholder="Nhu cầu đào tạo*"
                                    className={ `${ styles.input_text } ${ styles.input_educate }` }
                                    value={ form?.need }
                                    onChange={ e => setForm( prev => ( { ...prev, need: e.target.value } ) ) }
                                ></textarea>

                                <p className={ styles.p_pivancy }>
                                    Khi điền và gửi thông tin, bạn đã đọc và chập thuận{ " " }
                                    <a href="#">Chính sách bảo mật.</a>
                                </p>
                                <button type="submit" className={ styles.btn_register }>
                                    Gửi đăng ký
                                </button>
                            </form>
                        </div>
                        <div className={ styles.img_contact }>
                            <img alt='' src="/images/business/home-contact-pc.jpg" style={ { height: 'auto' } } />
                        </div>
                    </div>

                    <div className={ `${ styles.footer_text }` }>
                        <div className={ `${ styles.title }` }>
                            { content?.footer_text?.title }
                        </div>
                        <div className={ `${ styles.content }` } dangerouslySetInnerHTML={ { __html: content?.footer_text?.content } }>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } footer={ page.props.footer }>
            { page }
        </Layout>
    )
}

export async function getStaticProps ( context )
{
    var data = null;

    await fetch( process.env.API_URL + 'page/business/home' )
        .then( response => response.json() )
        .then( result =>
        {
            data = result
        } )
        .catch( error => { } )


    // if ( !data )
    // {
    //     return {
    //         notFound: true
    //     }
    // }

    return {
        props: {
            data
        }, // will be passed to the page component as props
        revalidate: 1,
    }
}