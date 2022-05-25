import styles from '../../styles/main/learning.module.scss'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { HOME, PRODUCT_SESSION } from '../../constants/route'
import PopupShare from '../../components/global/PopupShare';
import HeadTag from '../../components/global/HeadTag'
import Heading from '../../components/pages/learning/Heading';
import Video from '../../components/pages/learning/Video';
import Menu from '../../components/pages/learning/Menu';
import Info from '../../components/pages/learning/Info';
import Tab1 from '../../components/pages/learning/Tab1';
import SessionRelated from '../../components/pages/product/detailPage/SessionRelated';
import Tab2 from '../../components/pages/learning/Tab2'
import Tab3 from '../../components/pages/learning/Tab3'
import Tab4 from '../../components/pages/learning/Tab4'
import Tab5 from '../../components/pages/learning/Tab5'

const Index = () =>
{
    const router = useRouter()
    const [ data, setData ] = useState( null )
    const [ tab, setTab ] = useState( 0 )

    const [ showShare, setShowShare ] = useState( false )

    const session = data?.session

    useEffect( () =>
    {
        if ( router.query.id )
        {
            axios.get( 'page/learning/' + router.query.id ).then( response =>
            {
                setData( response.data )
            } ).catch( error =>
            {
                router.push( HOME )
            } )
        }
    }, [ router ] )

    useEffect( () =>
    {
        if ( data )
        {
            axios.post( 'page/learning/create-progress/' + router.query.id ).then( response =>
            { } ).catch( error => { } )
        }
    }, [ data ] )

    useEffect( () =>
    {
        if ( typeof ZaloSocialSDK !== 'undefined' )
        {
            ZaloSocialSDK?.reload()
        }
    }, [ session ] )

    useEffect( () =>
    {
        const moreButton = document.querySelectorAll( `.${ styles.input_disable } .${ styles.more }` )
        Array.from( moreButton ).forEach( e =>
        {
            var textarea = e.parentElement.querySelector( `.${ styles.text }` )
            e.addEventListener( 'click', function ()
            {
                textarea.classList.add( styles.active )
                e.remove()
            } )
        } )
    }, [ data ] )

    return (
        <div className={ styles.container }>

            <HeadTag title={ `AIM E-learning | ${ session?.name }` } />

            {
                session && <PopupShare
                    active={ showShare }
                    setActive={ setShowShare }
                    title="Chia sẻ bài học"
                    content="Chần chờ gì mà không chia sẻ bài học thú vị này đến nhiều người hơn?"
                    url={ process.env.BASE_URL + PRODUCT_SESSION + session?.slug }
                />
            }

            <div className={ styles.learning_page }>

                <div className={ styles.main_content }>
                    <Heading styles={ styles } session={ session } />
                    <Video styles={ styles } scormUrl={ data?.scormUrl } />
                </div>

                <div className={ styles.info }>

                    <Menu styles={ styles } tab={ tab } setTab={ setTab } data={ data } setData={ setData } setShowShare={ setShowShare } />

                    <div className={ styles.body }>
                        <div className={ styles.left }>
                            <Tab1 styles={ styles } data={ data } tab={ tab } />
                            <Tab2 styles={ styles } data={ data } tab={ tab } setData={ setData } />
                            <Tab3 styles={ styles } data={ data } tab={ tab } />
                            <Tab4 styles={ styles } data={ data } tab={ tab } />
                            <Tab5 styles={ styles } data={ data } tab={ tab } setData={ setData } />
                        </div>
                        <Info styles={ styles } data={ data } />
                    </div>
                </div>

                <SessionRelated styles={ styles } data={ data?.sessionRelated } />

            </div>
        </div >
    )
}

export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } footer={ page.props.footer } headerFixed={ true }>
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



