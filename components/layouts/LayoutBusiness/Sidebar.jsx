import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BUSINESS_FAQS, BUSINESS_NOTIFICATION, BUSINESS_OVERVIEW, BUSINESS_PROFILE, BUSINESS_STUDY_PLAN, BUSINESS_UPDATE_ACCOUNT, HOME } from '../../../constants/route'
import styles from '../../../styles/account/sidebar.module.scss'
import Link from 'next/link'
import { logout } from '../../../redux/accountSlice'

const Sidebar = ( { isOwner } ) =>
{
    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = router.asPath

    const handleLogout = () =>
    {
        dispatch( logout() )
        window.location.href = HOME
    }


    return (
        <div className={ styles.sidebar } >
            <Link href={ HOME } passHref>
                <a href="#" className={ styles.logo }>
                    <img alt='' src="/images/account-logo.svg" />
                </a>
            </Link>

            <div className={ styles.menu }>
                <ul className={ styles.ul1 }>
                    <Link href={ BUSINESS_OVERVIEW } passHref>
                        <li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_OVERVIEW ) || BUSINESS_OVERVIEW.includes( pathname ) ) && styles.active }` }>
                            <div className={ styles.li_content }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/sd1.svg" />
                                </div>
                                <div className={ styles.text }>
                                    <a>Tổng quan</a>
                                </div>
                            </div>
                        </li>
                    </Link>

                    <Link href={ BUSINESS_STUDY_PLAN } passHref>
                        <li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_STUDY_PLAN ) || BUSINESS_STUDY_PLAN.includes( pathname ) ) && styles.active }` }>
                            <div className={ styles.li_content }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/sd2.svg" />
                                </div>
                                <div className={ styles.text } >
                                    <a>Kế hoạch học tập</a>
                                </div>
                            </div>
                        </li>
                    </Link>

                    {
                        isOwner && <Link href={ BUSINESS_PROFILE } passHref>
                            <li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_PROFILE ) || BUSINESS_PROFILE.includes( pathname ) ) && styles.active }` }>
                                <div className={ styles.li_content }>
                                    <div className={ styles.image }>
                                        <img alt='' src="/images/sd3.svg" />
                                    </div>
                                    <div className={ styles.text }>
                                        <a>Hồ sơ</a>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    }

                    <Link href={ BUSINESS_UPDATE_ACCOUNT } passHref>
                        <li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_UPDATE_ACCOUNT ) || BUSINESS_UPDATE_ACCOUNT.includes( pathname ) ) && styles.active }` }>
                            <div className={ styles.li_content }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/sd4.svg" />
                                </div>
                                <div className={ styles.text }>
                                    <a>Tài khoản</a>
                                </div>
                            </div>
                        </li>
                    </Link>
                    <Link href={ BUSINESS_NOTIFICATION } passHref>
                        <li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_NOTIFICATION ) || BUSINESS_NOTIFICATION.includes( pathname ) ) && styles.active }` }>
                            <div className={ styles.li_content }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/sd5.svg" />
                                </div>
                                <div className={ styles.text }>
                                    <a>Thông báo</a>
                                </div>
                            </div>
                        </li>
                    </Link>
                    <Link href={ BUSINESS_FAQS } passHref>
                        <li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_FAQS ) || BUSINESS_FAQS.includes( pathname ) ) && styles.active }` }>
                            <div className={ styles.li_content }>
                                <div className={ styles.image }>
                                    <img alt='' src="/images/sd6.svg" />
                                </div>
                                <div className={ styles.text }>
                                    <a href='/concern_support'>Hỗ trợ</a>
                                </div>
                            </div>
                        </li>
                    </Link>

                    <li className={ styles.li1 } onClick={ handleLogout }>
                        <div className={ styles.li_content }>
                            <div className={ styles.image }>
                                <img alt='' src="/images/sd7.svg" />
                            </div>
                            <div className={ styles.text }>
                                <a>Đăng xuất</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar