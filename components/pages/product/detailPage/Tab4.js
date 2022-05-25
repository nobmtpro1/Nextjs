import React from 'react'

const Tab4 = ({styles,tab,data}) =>
{
    return (
        <div className={ styles.cerfiticate } hidden={ tab == 3 ? false : true }>
            <h2 className={ styles.title }>
                Chứng chỉ
            </h2>
            <div className={ styles.content }>
                <div className={ styles.image }>
                    <img alt='' src={ process.env.IMG_URL + data?.certificate_image } />
                </div>
                <div className={ styles.text }>
                    <ul>
                        <li>Khi hoàn thành 100% thời lượng bài học cũng như làm đúng 100% các bài kiểm tra đi kèm, bạn sẽ nhận được chứng chỉ đơn cho bài học này.</li>
                        <li>Nếu chưa vượt qua các bài kiểm tra, bạn hãy xem lại bài, ôn lại kiến thức để làm đúng và nhận chứng chỉ nhé.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Tab4