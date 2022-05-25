import React from 'react'
import Slider from "react-slick";

const settings4 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
    ],
};

const Area6 = ( { styles, staticContent } ) =>
{
    return (

        <div className={ `${ styles.area6_1 }` }>
            <h2 className={ `${ styles.head_2 }` }>
                { staticContent?.area6?.title }
            </h2>
            <div className={ `${ styles.body_2 }` }>
                <div className={ `${ styles.col_3 }` }>
                    <div className={ `${ styles.head_4 }` }>
                        <div className={ `${ styles.image_5 }` }>
                            <img alt='' src='/images/main/home-8.png' />
                        </div>
                        <div className={ `${ styles.image_5 }` }>
                            <img alt='' src='/images/main/home-9.png' />
                        </div>
                    </div>
                    <h3 className={ `${ styles.body_4 }` }>
                        <span>AIM Academy là <br />
                            đại diện chính thức tại Việt Nam</span>
                    </h3>
                </div>
                <div className={ `${ styles.col_3 }` }>
                    <div className={ `${ styles.head_4 }` }>
                        <div className={ `${ styles.image_5 }` }>
                            <img alt='' src='/images/main/home-10.png' />
                        </div>
                    </div>
                    <h3 className={ `${ styles.body_4 }` }>
                        <span>AIM Academy là <br />
                            đại diện đào tạo</span>
                    </h3>
                </div>
                <div className={ `${ styles.col_3 }` }>
                    <div className={ `${ styles.head_4 }` }>
                        <div className={ `${ styles.image_5 }` }>
                            <img alt='' src='/images/main/home-11.png' />
                        </div>
                    </div>
                    <h3 className={ `${ styles.body_4 }` }>
                        <span>AIM Academy là <br />
                            đồng tổ chức</span>
                    </h3>
                </div>
            </div>
            <div className={ `${ styles.slide_2 }` } id='home-page-logo'>
                <Slider { ...settings4 }>
                    {
                        staticContent?.area6?.image?.map( ( e, i ) => (
                            <div className={ `${ styles.slide_item }` } key={ i }>
                                <div className={ `${ styles.image }` }>
                                    <img alt='' src={ process.env.IMG_URL + e } />
                                </div>
                            </div>
                        ) )
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Area6