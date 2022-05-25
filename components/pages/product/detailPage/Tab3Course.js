import React from 'react'
import Session from './Session'

const Tab3Course = ( { styles, tab, course } ) =>
{
    return (
        <>
            <div className={ styles.content } hidden={ tab == 2 ? false : true }>
                <h2 className={ styles.title }>
                    Nội dung
                </h2>
                <div className={ styles.box }>
                    <span>Có 8 bài học trong khóa học { course?.name }</span>
                </div>

                <div className={ `${ styles.sessions } ${ styles.active }` }>
                    {
                        course?.session?.map( ( e, i ) => (
                            <div className={ styles.session } key={ i } >
                                <div className={ styles.number }>{ ( i + 1 ) < 10 ? "0" + ( i + 1 ) : ( i + 1 ) }</div>
                                <Session data={ e } course={ course } />
                            </div>
                        ) )
                    }
                </div>

                {/* <div className={ styles.more_session }>
                                Xem thêm
                            </div> */}
            </div>

            <div className={ styles.defination } hidden={ tab == 2 ? false : true }>
                <h2 className={ styles.title }>
                    Biên soạn nội dung
                </h2>
                <div className={ styles.content }>
                    <div className={ styles.image }>
                        <img alt='' src='/images/main/product-9.png' />
                    </div>
                    <div className={ styles.image_mb }>
                        <img alt='' src='/images/main/product-9-mb.png' />
                    </div>
                    <div className={ styles.text }>
                        <ul>
                            <li>AIM Academy là trung tâm đào tạo thực tế hàng đầu các môn học về Marketing & Communication, là người bạn đồng hành đáng tin cậy của nhiều thế hệ marketers suốt hơn 10 năm hoạt động. </li>
                            <li>Giáo trình và bài học có sự xây dựng và đóng góp của nhiều chuyên gia trong ngành.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={ styles.business } hidden={ tab == 2 ? false : true }>
                <h2 className={ styles.title }>
                    Đối tác
                </h2>
                <div className={ styles.content }>
                    <div className={ styles.col }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/product-20.png' />
                            <img alt='' src='/images/main/product-21.png' />
                        </div>
                        <div className={ styles.text }>
                            Đại diện chính thức tại Việt Nam
                        </div>
                    </div>
                    <div className={ styles.col }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/product-22.png' />
                        </div>
                        <div className={ styles.text }>
                            Đại diện đào tạo
                        </div>
                    </div>
                    <div className={ styles.col }>
                        <div className={ styles.image }>
                            <img alt='' src='/images/main/product-23.png' />
                        </div>
                        <div className={ styles.text }>
                            Đồng tổ chức
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Tab3Course