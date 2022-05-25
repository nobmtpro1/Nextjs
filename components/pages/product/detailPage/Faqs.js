import React from 'react'

const Faqs = ({styles,staticContent }) =>
{
    return (
        <div className={ styles.faqs }>
            <h2 className={ styles.title }>
                Những câu hỏi thường gặp
            </h2>
            <div className={ styles.body }>
                {
                    staticContent?.questions?.map( ( e, i ) => (
                        <div className={ styles.box } key={ i }>
                            <h3 className={ styles.title }>
                                { e?.question }
                            </h3>
                            <p className={ styles.content }>
                                { e?.answer }
                            </p>
                        </div>
                    ) )
                }
            </div>
            {/* <div className={ styles.button }>
            <a href='#' className={ styles.text }>
                Xem thêm
            </a>
        </div> */}
        </div>
    )
}

export default Faqs