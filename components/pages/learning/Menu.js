import axios from '../../../sevices/axios'
import React from 'react'
import router from 'next/router'

const Menu = ( { styles, setTab, tab, data, setShowShare, setData } ) =>
{
    const session = data?.session
    const wishlist = data?.wishlist

    const handleWishlist = () =>
    {
        axios.post( 'page/learning/wishlist/' + router.query.id ).then( response =>
        {
            setData( prev => ( {
                ...prev,
                wishlist: response?.data ? [ ...prev.wishlist, session?.id ] : prev.wishlist?.filter( x => x != session?.id )
            } ) )
        } ).catch( error => { } )
    }


    return (
        <div className={ styles.box }>
            
            <div className={ styles.left }>
                <div className={ `${ styles.text } ${ tab == 0 && styles.active }` } onClick={ () => setTab( 0 ) }>
                    Tổng quan
                </div>
                <div className={ `${ styles.text } ${ tab == 1 && styles.active }` } onClick={ () => setTab( 1 ) }>
                    Thảo luận
                </div>
                <div className={ `${ styles.text } ${ tab == 2 && styles.active }` } onClick={ () => setTab( 2 ) }>
                    Tài liệu
                </div>
                <div className={ `${ styles.text } ${ tab == 3 && styles.active }` } onClick={ () => setTab( 3 ) }>
                    Chứng chỉ
                </div>
                <div className={ `${ styles.text } ${ tab == 4 && styles.active }` } onClick={ () => setTab( 4 ) }>
                    Đánh giá
                </div>
            </div>
            <div className={ styles.right }>
                <a style={ { cursor: 'pointer' } } className={ styles.button } onClick={ handleWishlist }>
                    <div className={ styles.image }>
                        {
                            wishlist?.includes( session?.id )
                                ?
                                <img alt='' src='/images/main/learning-saved.svg' />
                                :
                                <img alt='' src='/images/main/learning-save.svg' />
                        }
                    </div>
                    <div className={ styles.text }>
                        Lưu
                    </div>
                </a>
                <a style={ { cursor: 'pointer' } } className={ styles.button } onClick={ () => setShowShare( prev => !prev ) }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/learning-share.svg' />
                    </div>
                    <div className={ styles.text } >
                        Chia sẽ
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Menu