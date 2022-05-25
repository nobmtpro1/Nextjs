import Link from 'next/link'
import React from 'react'
import { DOCUMENT_BLOG, DOCUMENT_EBOOK, DOCUMENT_GLOSSARY, DOCUMENT_PODCAST, DOCUMENT_PROJECT, DOCUMENT_TEST, DOCUMENT_YOUTUBE } from '../../../../constants/route'

const MoreDocument = ( { styles, except } ) =>
{

    var data = [
        {
            name: "Glossary",
            href: DOCUMENT_GLOSSARY,
            image: "/images/document-glossary-box-7.png",
        },

        {
            name: "Ebook",
            href: DOCUMENT_EBOOK,
            image: "/images/document-glossary-box-5.png",
        },

        {
            name: "Đồ án tốt nghiệp",
            href: DOCUMENT_PROJECT,
            image: "/images/document-glossary-box-2.png",
        },
        {
            name: "Digital test",
            href: DOCUMENT_TEST,
            image: "/images/document-glossary-box-4.png",
        },
        {
            name: "Youtube",
            href: DOCUMENT_YOUTUBE,
            image: "/images/document-glossary-box-3.png",
        },
        {
            name: "Podcast",
            href: DOCUMENT_PODCAST,
            image: "/images/document-glossary-box-1.png",
        },


    ]

    return (
        <div className={ `${ styles.more_document }` }>
            <h1 className={ `${ styles.heading }` }>Khám phá kho tài liệu</h1>
            <div className={ `${ styles.boxes }` }>

                {
                    data?.filter( x => x.href != except )?.map( ( e, i ) => (
                        <Link key={i} passHref href={ e?.href }>
                            <a href="#" className={ `${ styles.box }` }>
                                <div className={ `${ styles.image }` }>
                                    <img alt='' src={ e?.image } />
                                </div>
                                <div className={ `${ styles.text }` }>
                                    { e?.name }
                                </div>
                            </a>
                        </Link>
                    ) )
                }

                <a target="_blank" rel="noreferrer" href={ DOCUMENT_BLOG } className={ `${ styles.box }` }>
                    <div className={ `${ styles.image }` }>
                        <img alt='' src="/images/document-glossary-box-6.png" />
                    </div>
                    <div className={ `${ styles.text }` }>
                        Blog
                    </div>
                </a>
            </div>
        </div>
    )
}

export default MoreDocument