import Head from 'next/head'
import React from 'react'

const HeadTag = ( { title, description, keywords, image } ) =>
{
    return (
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ description } />
            <meta name="keywords" content={ keywords } />
            <meta property="og:title" content={ title } />
            <meta property="og:description" content={ description } />
            <meta property="og:image" content={ process?.env?.IMG_URL + image } />
        </Head>
    )
}

export default HeadTag