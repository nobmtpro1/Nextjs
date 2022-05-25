import styles from '../../styles/account/view_public.module.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Layout from '../../components/layouts/LayoutAccount'
import Head from 'next/head'
import axios from '../../sevices/axios'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { toPng } from 'html-to-image';

const Index = () =>
{

    const [ data, setData ] = useState( null )

    const { data: dataUser } = useSelector( state => state.account.user )

    useEffect( () =>
    {
        axios.get( 'page/account/profile' ).then( response =>
        {
            setData( response.data )
        } ).catch( error =>
        {
        } )
    }, [] )


    const ref = useRef( null )

    const onButtonClick = useCallback( () =>
    {
        if ( ref.current === null )
        {
            return
        }

        ref.current.className = styles.contain;

        toPng( ref.current, { cacheBust: true, } )
            .then( ( dataUrl ) =>
            {
                const link = document.createElement( 'a' )
                link.download = 'my-image-name.png'
                link.href = dataUrl
                link.click()
                ref.current.classList.remove( styles.contain )
            } )
            .catch( ( err ) =>
            {
            } )
    }, [ ref ] )

    return (
        <>
            <Head>
                <title>AIM E-learning | Xem công khai</title>
            </Head>
            <div className={ styles.view_public_page }>
                <div className={ styles.download }>
                    <div className={ styles.left }>Hồ sơ cá nhân</div>
                    <a href='#' onClick={ onButtonClick }><span className={ styles.image }><img alt='' src='/images/account-view-public-10.svg' /></span>Tải về</a>
                </div>
                <div ref={ ref } >
                    <div className={ styles.info }>
                        <div className={ styles.avatar }>
                            <img alt="" src={ dataUser?.avatar?.includes( 'https:/' ) ? dataUser?.avatar : dataUser?.avatar ? process.env.IMG_URL + dataUser.avatar : '/images/avatar-default.png' } />
                        </div>
                        <div className={ styles.personal }>
                            <div className={ styles.name }>
                                { data?.profile?.first_name }   { data?.profile?.last_name }
                            </div>
                            <div className={ styles.small }>
                                <div className={ styles.image }>
                                    <img alt="" src="/images/account-view-public-1.svg" />
                                </div>
                                <div className={ styles.text }>
                                    { moment( data?.profile?.birthday ).format( 'DD/MM/YYYY' ) }
                                </div>
                            </div>
                            <div className={ styles.small }>
                                <div className={ styles.image }>
                                    <img alt="" src="/images/account-view-public-2.svg" />
                                </div>
                                <div className={ styles.text }>
                                    { data?.profile?.email }
                                </div>
                            </div>
                            <div className={ styles.small }>
                                <div className={ styles.image }>
                                    <img alt="" src="/images/account-view-public-3.svg" />
                                </div>
                                <div className={ styles.text }>
                                    { data?.profile?.phone }
                                </div>
                            </div>
                            <div className={ styles.small }>
                                <div className={ styles.image }>
                                    <img alt="" src="/images/account-view-public-4.svg" />
                                </div>
                                <div className={ styles.text }>
                                    { data?.profile?.address }
                                </div>
                            </div>
                        </div>
                        <div className={ styles.description }>
                            <div className={ styles.title }>
                                <div className={ styles.image }>
                                    <img alt="" src="/images/account-view-public-5.svg" />
                                </div>
                                <div className={ styles.text }>
                                    Giới thiệu
                                </div>
                            </div>
                            <div className={ styles.content }>
                                {
                                    data?.profile?.job && <><b>Công việc:</b>  { data?.profile?.job } <br /></>
                                }
                                {
                                    data?.profile?.level && <><b>Cấp độ:</b> { data?.profile?.level } <br /></>
                                }
                                {
                                    data?.profile?.certificate && <> <b>Bằng cấp cao nhất:</b>  { data?.profile?.certificate } <br /></>
                                }
                                {
                                    data?.profile?.university && <> <b>Trường:</b>  { data?.profile?.university } <br /></>
                                }
                                {
                                    data?.profile?.major && <> <b>Chuyên ngành:</b>  { data?.profile?.major } <br /></>
                                }

                                { data?.profile?.description }
                            </div>
                        </div>
                    </div>
                    <div className={ styles.main_content }>
                        <div className={ styles.left }>
                            {
                                data?.skill?.length > 0 && <div className={ styles.item }>
                                    <div className={ styles.top }>
                                        <div className={ styles.image }>
                                            <img alt="" src="/images/account-view-public-6.svg" />
                                        </div>
                                        <div className={ styles.text }>
                                            Kỹ năng
                                        </div>
                                    </div>
                                    <div className={ styles.skill }>
                                        {
                                            data?.skill?.map( ( e, i ) => (
                                                <div className={ styles.box } key={ i }>
                                                    { e?.skill }
                                                </div>
                                            ) )
                                        }
                                    </div>
                                </div>
                            }

                            <div className={ styles.item }>

                                <div className={ styles.top }>
                                    <div className={ styles.image }>
                                        <img alt="" src="/images/account-view-public-7.svg" />
                                    </div>
                                    <div className={ styles.text }>
                                        Học vấn
                                    </div>
                                </div>
                                <div className={ styles.education }>
                                    {
                                        data?.education?.map( ( e, i ) => (
                                            <div className={ styles.box } key={ i }>
                                                {
                                                    e?.university && <div className={ styles.title }>{ e?.university }</div>
                                                }
                                                {
                                                    e?.city && <div className={ styles.text }>Thành phố: { e?.city }</div>
                                                }
                                                {
                                                    e?.from && <div className={ styles.text }>Thời gian: { e?.from } - { e?.to }</div>
                                                }
                                                {
                                                    e?.degree && <div className={ styles.text }>Bằng cấp: { e?.degree }</div>
                                                }
                                                {
                                                    e?.major && <div className={ styles.text }>Chuyên ngành: { e?.major }</div>
                                                }

                                                {
                                                    e?.certificate && <div className={ styles.text }>Chứng chỉ: { e?.certificate }</div>
                                                }
                                            </div>
                                        ) )
                                    }
                                    {/* <div className={ styles.box }>
                                    <div className={ styles.title }>Trường Đại học A</div>
                                    <div className={ styles.label }><span>Offline</span> </div>
                                    <div className={ styles.text }>Thời gian: 2015 - 2019</div>
                                    <div className={ styles.text }>Chuyên ngành: Thiết kế đồ họa</div>
                                    <div className={ styles.text }>Chứng chỉ: Cử nhân thiết kế đồ họa</div>
                                    <div className={ styles.title }>Trường Đại học A</div>
                                    <div className={ styles.label }><span>Offline</span> </div>
                                    <div className={ styles.text }>Thời gian: 2015 - 2019</div>
                                    <div className={ styles.text }>Chuyên ngành: Thiết kế đồ họa</div>
                                    <div className={ styles.text }>Chứng chỉ: Cử nhân thiết kế đồ họa</div>
                                </div> */}
                                </div>
                            </div>
                            {
                                data?.education?.find( e => e?.prize?.length > 0 ) && <div className={ styles.item }>
                                    <div className={ styles.top }>
                                        <div className={ styles.image }>
                                            <img alt="" src="/images/account-view-public-8.svg" />
                                        </div>
                                        <div className={ styles.text }>
                                            Giải thưởng
                                        </div>
                                    </div>
                                    <div className={ styles.award }>
                                        {
                                            data?.education?.map( ( e, i ) => (
                                                <div className={ styles.text } key={ i }>{ e?.prize }</div>
                                            ) )
                                        }
                                    </div>
                                </div>
                            }

                        </div>
                        <div className={ styles.right }>
                            <div className={ styles.item }>
                                <div className={ styles.top }>
                                    <div className={ styles.image }>
                                        <img alt="" src="/images/account-view-public-9.svg" />
                                    </div>
                                    <div className={ styles.text }>
                                        Kinh nghiệm làm việc
                                    </div>
                                </div>
                                <div className={ styles.exp }>
                                    {
                                        data?.exp?.map( ( e, i ) => (
                                            <div className={ styles.box } key={ i }>
                                                {
                                                    e?.company && <div className={ styles.title }>{ e?.company }</div>
                                                }
                                                {
                                                    e?.position && <div className={ styles.text }><span className={ styles.bold }>Vị trí:</span> { e?.position }</div>
                                                }
                                                {
                                                    e?.from && <div className={ styles.text }><span className={ styles.bold }>Thời gian:</span> { e?.from } - { e?.to }</div>
                                                }
                                                {
                                                    e?.description && <div className={ styles.text }><span className={ styles.bold }>Mô tả: </span>{ e?.description }</div>
                                                }
                                                {
                                                    e?.achievement && <div className={ styles.text }><span className={ styles.bold }>Thành tựu:</span> { e?.achievement }</div>
                                                }

                                            </div>
                                        ) )
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}


export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout  header={ page.props.header } styles={ styles }>
            { page }
        </Layout>
    )
}



export async function getStaticProps ()
{
    return {
        props: {},
    }
}