import React from 'react'

const BannerMembership = ( { styles, mobile } ) =>
{
    if ( mobile )
    {
        return (
            <div className={ styles.banner_mb_3 }>
                <div className={ styles.title_5 }>
                    Nâng cấp gói học chỉ từ 299.000 VNĐ
                </div>
                <div className={ styles.price_5 }>
                    <div className={ styles.new_6 }>
                        Chỉ từ 299.000đ/tháng
                    </div>
                    <div className={ styles.old_6 }>
                        399.000đ/tháng
                    </div>
                </div>
                <div className={ styles.button_5 }>
                    <a href='#'><span>Nâng cấp</span></a>
                </div>
            </div>
        )
    } else
    {
        return (
            <div className={ styles.banner_3 }>
                <div className={ styles.title_4 }>
                    Nâng cấp gói học chỉ từ 299.000 VNĐ
                </div>
                <div className={ styles.description_4 }>
                    Sao không học thoải mái hơn với gói membership thời hạn 12 tháng? Vừa tiết kiệm về giá, vừa vô tư khám phá kho khóa học đồ sộ của AIM Academy.
                </div>
                <div className={ styles.price_4 }>
                    <div className={ styles.new_5 }>
                        Chỉ từ 299.000đ/tháng
                    </div>
                    <div className={ styles.old_5 }>
                        399.000đ/tháng
                    </div>
                </div>
                <div className={ styles.save_4 }>
                    Tiết kiệm hơn 60%
                </div>
            </div>
        )
    }

}

export default BannerMembership