import styles from '../../styles/main/components/PopupShare.module.scss'
import React, { useEffect } from 'react'
import { FacebookShareButton } from "react-share";

const PopupShare = ( { active, setActive, title, content, url } ) =>
{

    useEffect( () =>
    {
        if ( typeof ZaloSocialSDK !== 'undefined' )
        {
            ZaloSocialSDK?.reload()
        }
    }, [] )


    const copyLink = () => 
    {
        navigator.clipboard.writeText( url );

        alert( "Đã copy link chia sẻ" );
    }
    return (
        <div className={ `${ styles.popup_discussion } ${ active && styles.active }` }>
            <div className={ styles.box }>
                <div className={ styles.title }>
                    <div className={ styles.text }>
                        { title }
                    </div>
                    <div className={ styles.close } onClick={ () => setActive( false ) }>
                        <img alt='' src='/images/main/learning-12.svg' />
                    </div>
                </div>
                <div className={ styles.content }>
                    { content }
                </div>
                <div className={ styles.images }>
                    {/* <div className="zalo-share-button" data-href={url} data-oaid="579745863508352884" data-layout="4" data-color="white" data-customize="false"></div> */ }
                    <div className={ `${ styles.image } zalo-share-button` } data-href={ url } data-oaid="579745863508352884" data-layout="4" data-color="white" data-customize="false">
                        <img alt='' src='/images/zalo.svg' />
                    </div>

                    <FacebookShareButton
                        url={ url }
                        className={ styles.image }
                    >
                        <div className={ styles.image }>
                            <img alt='' src='/images/fb.svg' />
                        </div>
                    </FacebookShareButton>

                    <div className={ styles.image } onClick={ copyLink }>
                        <img alt='' src='/images/link.svg' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupShare
