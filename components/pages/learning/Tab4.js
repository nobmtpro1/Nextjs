import React from 'react'
import { PRODUCT_SESSION } from '../../../constants/route'

const Tab4 = ( { styles, tab,data } ) =>
{
    return (
        <div className={ `${ styles.content4 } ${ tab == 3 && styles.active }` }>
            <div className={ styles.cerfiticate }>
                <div className={ styles.title }>
                    Chứng chỉ
                </div>
                <div className={ styles.content }>
                    <div className={ styles.image }>
                        <img alt='' src={ process.env.IMG_URL + data?.session?.certificate_image } />
                    </div>
                    <div className={ styles.text }>
                        <ul>
                            <li>Khi đạt được toàn bộ chứng chỉ đơn của các bài học trong khóa học này, cùng với chứng chỉ đơn của bài thi (trắc nghiệm hoặc dự án giả lập), bạn sẽ nhận được chứng chỉ chuyên nghiệp.</li>
                            <li>Đây là loại chứng chỉ có giá trị nhất, chứng nhận quá trình học toàn diện và có lộ trình của bạn, gây ấn tượng khi sử dụng trong CV và ứng tuyển công việc.</li>
                        </ul>
                        <div className={ styles.button }>
                            <a target="_blank" rel="noreferrer" href={ data?.session?.certificate_link_file } className={ styles.link }>
                                <div className={ styles.image }>
                                    <img alt='' src='/images/main/learning-17.svg' />
                                </div>
                                <div className={ styles.text }>
                                    Tải về
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={ styles.related }>
                    <div className={ styles.title }>
                        Chứng chỉ bài học liên quan
                    </div>
                    <div className={ styles.description }>
                        Chinh phục thêm các bài học khác để bổ trợ kiến thức và “sưu tầm” thêm các chứng chỉ chuyên nghiệp.
                    </div>
                    <div className={ styles.items }>
                        {
                            data?.sessionRelated?.map( ( e, i ) => (
                                <div className={ styles.item } key={ i }>
                                    <div className={ styles.image }>
                                        <img alt='' src={ process.env.IMG_URL + e?.certificate_image } />
                                    </div>
                                    <div className={ styles.name }>
                                        { e?.name }
                                    </div>
                                    <div className={ styles.button }>
                                        <a target="_blank" rel="noreferrer" href={ PRODUCT_SESSION + e?.slug }>Xem thêm</a>
                                    </div>
                                </div>
                            ) )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tab4