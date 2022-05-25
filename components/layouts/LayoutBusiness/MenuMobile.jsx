import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BUSINESS_FAQS, BUSINESS_NOTIFICATION, BUSINESS_OVERVIEW, BUSINESS_PROFILE, BUSINESS_STUDY_PLAN, BUSINESS_UPDATE_ACCOUNT, HOME } from '../../../constants/route'
import styles from '../../../styles/account/sidebar.module.scss'
import Link from 'next/link'
import { logout } from '../../../redux/accountSlice'

const MenuMobile = ( { styles, isOwner } ) =>
{
	const dispatch = useDispatch()
	const router = useRouter()
	const pathname = router.asPath

	const handleLogout = () =>
	{
		dispatch( logout() )
		window.location.href = HOME
	}

	useEffect( () =>
	{
		var li1 = document
			.querySelector( "." + styles.menu_mb )
			.getElementsByClassName( styles.li1 );
		Array.from( li1 ).forEach( function ( e )
		{
			e.addEventListener( "click", function ()
			{
				if ( e.classList.contains( styles.active ) )
				{
					e.classList.remove( styles.active );
				} else
				{
					e.classList.add( styles.active );
				}
			} );
		} );
	}, [ styles ] );

	return (
		<div className={ styles.menu_mb }>
			<ul className={ styles.ul1 }>
				<Link href={ BUSINESS_OVERVIEW } passHref>
					<li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_OVERVIEW ) || BUSINESS_OVERVIEW.includes( pathname ) ) && styles.active }` }>
						<div className={ styles.image1 }>
							<img alt='' src="/images/over_mb.svg" />
						</div>
						<div className={ styles.text1 }>Tổng quan</div>
					</li>
				</Link>
				<Link href={ BUSINESS_STUDY_PLAN } passHref>
					<li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_STUDY_PLAN ) || BUSINESS_STUDY_PLAN.includes( pathname ) ) && styles.active }` }>
						<div className={ styles.image1 }>
							<img alt='' src="/images/plan_mb.svg" />
						</div>
						<div className={ styles.text1 }>Kế hoạch học tập</div>
					</li>
				</Link>
				{
					isOwner && <Link href={ BUSINESS_PROFILE } passHref>
						<li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_PROFILE ) || BUSINESS_PROFILE.includes( pathname ) ) && styles.active }` }>
							<div className={ styles.image1 }>
								<img alt='' src="/images/profile_mb.svg" />
							</div>
							<div className={ styles.text1 }>Hồ sơ</div>
						</li>
					</Link>
				}

				<Link href={ BUSINESS_UPDATE_ACCOUNT } passHref>
					<li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_UPDATE_ACCOUNT ) || BUSINESS_UPDATE_ACCOUNT.includes( pathname ) ) && styles.active }` }>
						<div className={ styles.image1 }>
							<img alt='' src="/images/account-menu-mobile-7.svg" />
						</div>
						<div className={ styles.text1 }>Tài khoản</div>
					</li>
				</Link>
				<Link href={ BUSINESS_NOTIFICATION } passHref>
					<li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_NOTIFICATION ) || BUSINESS_NOTIFICATION.includes( pathname ) ) && styles.active }` }>
						<div className={ styles.image1 }>
							<img alt='' src="/images/account-menu-mobile-6.svg" />
						</div>
						<div className={ styles.text1 }>Thông báo</div>
					</li>
				</Link>
				<Link href={ BUSINESS_FAQS } passHref>
					<li className={ `${ styles.li1 } ${ ( pathname.includes( BUSINESS_FAQS ) || BUSINESS_FAQS.includes( pathname ) ) && styles.active }` }>
						<div className={ styles.image1 }>
							<img alt='' src="/images/account-menu-mobile-8.svg" />
						</div>
						<div className={ styles.text1 }>Hỗ trợ</div>
					</li>
				</Link>

				<li className={ styles.li1 } onClick={ handleLogout }>
					<div className={ styles.image1 }>
						<img alt='' src="/images/account-menu-mobile-9.svg" />
					</div>
					<div className={ styles.text1 }>Đăng xuất</div>
				</li>
			</ul>
		</div>
	);
};

export default MenuMobile;
