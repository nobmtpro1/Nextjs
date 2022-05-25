import React from 'react'

const BannerMb = ( { styles, image } ) =>
{
    return (
        <div className={ styles.banner_mb }>
            <img alt='' src={ process.env.IMG_URL + image } />
        </div>
    )
}

export default BannerMb