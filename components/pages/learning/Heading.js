import Link from 'next/link'
import React from 'react'
import { HOME } from '../../../constants/route'

const Heading = ( { styles, session } ) =>
{
	return (
		<>
			<div className={ styles.breadcrumb_mb }>
				<Link href={ HOME } passHref>
					<div className={ styles.link }>
						Trang chủ
					</div>
				</Link>
				<div className={ styles.link }>
					Vào học
				</div>
			</div>
			<div className={ styles.name }>
				Bài học { session?.name }
			</div>
			<div className={ styles.category }>
				<div className={ styles.text }>
					<span>Thuộc khóa { session?.course[ 0 ]?.name }</span>
				</div>
				<div className={ styles.text }>
					<span>{ session?.course[ 0 ]?.course_category?.name }</span>
				</div>
				<div className={ styles.text }>
					Hoàn thành bài học (+{ session?.aim_coin } AIM coin)
				</div>
			</div>
		</>
	)
}

export default Heading