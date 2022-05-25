import React, { useEffect, useState } from 'react'
import styles from '../../../styles/layout/footer.module.scss'

const Header = ( props ) =>
{
	const [ footer, setFooter ] = useState( null )

	useEffect( () =>
	{
		if ( props.footer )
		{
			setFooter( {
				description: props.footer.find( e => e.key == 'description' )?.value,
				address: props.footer.find( e => e.key == 'address' )?.value,
				phone: props.footer.find( e => e.key == 'phone' )?.value,
				email: props.footer.find( e => e.key == 'email' )?.value,
				facebook: props.footer.find( e => e.key == 'facebook' )?.value,
				instagram: props.footer.find( e => e.key == 'instagram' )?.value,
				youtube: props.footer.find( e => e.key == 'youtube' )?.value,
				linkedin: props.footer.find( e => e.key == 'linkedin' )?.value,
				spotify: props.footer.find( e => e.key == 'spotify' )?.value,
				tiktok: props.footer.find( e => e.key == 'tiktok' )?.value,
				copyright: props.footer.find( e => e.key == 'copyright' )?.value,
				tax: props.footer.find( e => e.key == 'tax' )?.value,
				name: props.footer.find( e => e.key == 'name' )?.value,
			} )
		}
	}, [ props.footer ] )

	return (
		<div className={ styles.footer_container }>
			<div className={ styles.footer }>
				<div className={ styles.top_1 }>
					<div className={ styles.col_2 }>
						<div className={ styles.logo_3 }>
							<img alt='' src='/images/footer-logo.svg' />
						</div>
						<div className={ styles.text_3 }>
							{ footer?.description }
						</div>
					</div>
					<div className={ styles.col_2 }>
						<ul>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/danh-cho-ca-nhan">Đào tạo đại chúng</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/danh-cho-doanh-nghiep">Đào tạo theo yêu cầu</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/khoa-hoc">Các khóa học</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/uu-dai">Chính sách ưu đãi</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/cuoc-thi-va-giai-thuong">Cuộc thi và giải thưởng</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/ket-noi-tuyen-dung">Kết nối tuyển dụng</a>
							</li>
						</ul>
					</div>
					<div className={ styles.col_2 }>
						<ul>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/blog">Blog</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/dinh-huong-nghe-nghiep">Video định hướng nghề nghiệp</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/ebook">Kho ebook</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/test-digital">Digital test</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/do-an-tot-nghiep">Đồ án tốt nghiệp</a>
							</li>
							<li>
								<a target="_blank" rel="noreferrer" href="https://aimacademy.vn/vi/su-kien">Sự kiện</a>
							</li>
						</ul>
					</div>
					<div className={ styles.col_2 }>
						<div className={ styles.title_3 }>
							LIÊN HỆ
						</div>
						<div className={ styles.text_3 }>
							{ footer?.name }
						</div>
						<div className={ styles.text_3 }>
							MST: { footer?.tax }
						</div>
						<div className={ styles.text_3 }>
							Địa chỉ :  { footer?.address }
						</div>
						<div className={ styles.text_3 }>
							Điện thoại : <a href={ `tel:${ footer?.phone }` }>{ footer?.phone }</a>
						</div>
						<div className={ styles.text_3 }>
							Email: { footer?.email }
						</div>
						<div className={ styles.social_3 }>
							<a href={ footer?.facebook } className={ styles.image_4 } target="_blank" rel="noreferrer">
								<img alt='' src='/images/footer-facebook.svg' />
							</a>
							<a href={ footer?.instagram } className={ styles.image_4 } target="_blank" rel="noreferrer">
								<img alt='' src='/images/instagram.svg' />
							</a>
							<a href={ footer?.youtube } className={ styles.image_4 } target="_blank" rel="noreferrer">
								<img alt='' src='/images/footer-social-3.svg' />
							</a>
							<a href={ footer?.linkedin } className={ styles.image_4 } target="_blank" rel="noreferrer">
								<span>in</span>
							</a>
							<a href={ footer?.spotify } className={ styles.image_4 } target="_blank" rel="noreferrer">
								<img alt='' src='/images/footer-social-5.svg' />
							</a>
							<a href={ footer?.tiktok } className={ styles.image_4 } target="_blank" rel="noreferrer">
								<img alt='' src='/images/tiktok.svg' />
							</a>
						</div>
						<div className={ styles.images_3 }>
							<a href='http://online.gov.vn/Home/WebDetails/88974?AspxAutoDetectCookieSupport=1' className={ styles.image_4 } target="_blank" rel="noreferrer">
								<img alt='' src='/images/footer-bo-cong-thuong.png' />
							</a>
							<a href='#' className={ styles.image_4 }>
								<img alt='' src='/images/footer-go-top.svg' />
							</a>
						</div>
					</div>
				</div>
				<div className={ styles.bot_1 }>
					<div className={ styles.text_2 }>
						© Copyright AIM Academy 2021
					</div>
					<a href='https://aimacademy.vn/vi/dieu-kien-dieu-khoan' className={ styles.text_2 } target="_blank" rel="noreferrer">
						Điều khoản và điều kiện
					</a>
					<a href='https://aimacademy.vn/vi/chinh-sach-bao-mat' className={ styles.text_2 } target="_blank" rel="noreferrer">
						Chính sách bảo mật
					</a>
				</div>
			</div>
		</div>
	)
}

export default Header
