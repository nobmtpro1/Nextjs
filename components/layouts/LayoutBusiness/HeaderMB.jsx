import React, { useEffect, useState } from 'react'

const Header = ( { styles } ) =>
{

    const [ active, setActive ] = useState( false )

    useEffect( () =>
    {
        var li1 = document.querySelector( '.' + styles.header_mb ).getElementsByClassName( styles.li1 )
        Array.from( li1 ).forEach( function ( e )
        {
            e.addEventListener( 'click', function ()
            {
                if ( e.classList.contains( styles.active ) )
                {
                    e.classList.remove( styles.active )
                } else
                {
                    e.classList.add( styles.active )
                }
            } )
        } )
    }, [styles] )

    return (
        <div className={ styles.header_mb } >
            <div className={ styles.icon_menu } onClick={ () => setActive( prev => !prev ) }>
                <img alt='' src='/images/account-header-mobile-1.svg' />
            </div>
            <div className={ styles.logo }>
                <img alt='' src='/images/account-header-mobile-2.svg' />
            </div>
            <div className={ styles.search }>
                <input type="text" />
                <div className={ styles.icon_search }>
                    <img alt='' src='/images/account-header-mobile-3.svg' />
                </div>
            </div>
            <div className={ styles.cart }>
                <div className={ styles.image }>
                    <img alt='' src='/images/account-header-mobile-4.svg' />
                </div>
                <div className={ styles.badge }>
                    <span>12</span>
                </div>
            </div>
            <div className={ styles.avatar } onClick={ () => setActive( prev => !prev ) }>
                <img alt='' src='/images/account-header-mobile-5.svg' />
            </div>
            <div className={ `${ styles.explore } ${ active ? styles.active : '' }` }>
                <div className={ styles.top }>
                    <div className={ styles.avatar }>
                        <img alt='' src="/images/account-avatar.png" />
                    </div>
                    <div className={ styles.right }>
                        <div className={ styles.name }>
                            Hi, Tran Van Tai
                        </div>
                        <div className={ styles.welcome }>
                            M???ng b???n tr??? l???i
                        </div>
                    </div>
                </div>
                <div className={ styles.bot }>
                    <ul className={ styles.ul1 }>
                        <li className={ `${ styles.li1 } ${ styles.active }` }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-1.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                H??? s??
                            </div>
                        </li>
                        <li className={ `${ styles.li1 } ${ styles.dropdown } ${ styles.active }` }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-2.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                Ch????ng tr??nh h???c
                                <ul className={ styles.ul2 }>
                                    <li className={ styles.li2 }>
                                        <div className={ styles.image2 }>
                                            <img alt='' src="/images/account-menu-mobile-10.svg" />
                                        </div>
                                        <div className={ `${ styles.text2 } ${ styles.active }` }>
                                            Elearning
                                        </div>
                                    </li>
                                    <li className={ styles.li2 }>
                                        <div className={ styles.image2 }>
                                            <img alt='' src="/images/account-menu-mobile-11.svg" />
                                        </div>
                                        <div className={ styles.text2 }>
                                            H???c offline
                                        </div>
                                    </li>
                                    <li className={ styles.li2 }>
                                        <div className={ styles.image2 }>
                                            <img alt='' src="/images/account-menu-mobile-12.svg" />
                                        </div>
                                        <div className={ styles.text2 }>
                                            Virtual class
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={ `${ styles.li1 } ${ styles.dropdown }` }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-3.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                ??u ????i c???a b???n
                                <ul className={ styles.ul2 }>
                                    <li className={ styles.li2 }>
                                        <div className={ styles.image2 }>
                                            <img alt='' src="/images/account-menu-mobile-13.svg" />
                                        </div>
                                        <div className={ styles.text2 }>
                                            AIM coin
                                        </div>
                                    </li>
                                    <li className={ styles.li2 }>
                                        <div className={ styles.image2 }>
                                            <img alt='' src="/images/account-menu-mobile-14.svg" />
                                        </div>
                                        <div className={ styles.text2 }>
                                            Voucher
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={ styles.li1 }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-4.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                ????n h??ng
                            </div>
                        </li>
                        <li className={ styles.li1 }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-5.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                ???? l??u
                            </div>
                        </li>
                        <li className={ styles.li1 }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-6.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                Th??ng b??o
                            </div>
                        </li>
                        <li className={ styles.li1 }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-7.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                T??i kho???n
                            </div>
                        </li>
                        <li className={ styles.li1 }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-8.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                H??? tr???
                            </div>
                        </li>
                        <li className={ styles.li1 }>
                            <div className={ styles.image1 }>
                                <img alt='' src="/images/account-menu-mobile-9.svg" />
                            </div>
                            <div className={ styles.text1 }>
                                ????ng xu???t
                            </div>
                        </li>
                    </ul>
                    <a href='#' className={ styles.business }>
                        <div className={ styles.text_bold }>D??nh cho doanh nghi???p</div>
                        <div className={ styles.text_normal }>Gi???i ph??p h???c t???p to??n di???n</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header