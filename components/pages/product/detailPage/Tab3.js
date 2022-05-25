import React from 'react'

const Tab3 = ( { styles, tab, data } ) =>
{
    return (
        <>
            <div className={ styles.longtext } hidden={ tab == 2 ? false : true }>
                <h2 className={ styles.title }>
                    Nội dung
                </h2>
                <div className={ styles.content } dangerouslySetInnerHTML={ { __html: data?.content } }>

                </div>
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
        </>
    )
}

export default Tab3