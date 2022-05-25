import React, { useState } from 'react'
import styles from '../../styles/main/components/banner_membership.module.scss'
import Link from 'next/link'
import { CART_MEMBERSHIP } from '../../constants/route'

const BannerMembership = () =>
{

    return (
        <div className={ styles.container }>
            <h2 className={ styles.title }>
                Tham khảo thêm gói membership
            </h2>
            <p className={ styles.description }>
                Sao không học thoải mái hơn với gói membership thời hạn 12 tháng? Vừa tiết kiệm về giá, vừa vô tư khám phá kho khóa học đồ sộ của AIM Academy.
            </p>
            <div className={ styles.button }>
                <Link href={ CART_MEMBERSHIP } passHref>
                    <a href='#'><span>Mua ngay</span></a>
                </Link>
            </div>
        </div>
    )
}

export default BannerMembership
