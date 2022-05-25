import axios from '../../../sevices/axios';
import router from 'next/router';
import React from 'react'
import { DOCUMENT_GLOSSARY } from '../../../constants/route';
import { slug } from '../../../utils/helper';

const Tab3 = ( { styles, tab, data } ) =>
{

    const handleDownloadPodcast = ( id, name ) =>
    {
        axios.get( 'page/learning/download-podcast/' + router.query.id + '/' + id ).then( response =>
        {
            const url = window.URL.createObjectURL( new Blob( [ response.data ] ) );
            const link = document.createElement( 'a' );
            link.href = url;
            link.setAttribute( 'download', name ); //or any other extension
            document.body.appendChild( link );
            link.click();
        } ).catch( error => { } )
    }

    return (
        <div className={ `${ styles.content3 } ${ tab == 2 && styles.active }` }>
            <div className={ styles.podcast }>
                <div className={ styles.title }>
                    Podcast bài học
                </div>
                <div className={ styles.links }>
                    {
                        data?.session?.document_file?.map( ( e, i ) => (
                            <div className={ styles.link } key={ i } onClick={ () => handleDownloadPodcast( e.id, e?.file ) }>
                                <div className={ styles.left }>
                                    <img alt='' src='/images/main/learning-14.svg' />
                                </div>
                                <div className={ styles.mid }>
                                    { e?.file.replace( 'podcast/', '' ) }
                                </div>
                                <div className={ styles.right }>
                                    <img alt='' src='/images/main/learning-15.svg' />
                                </div>
                            </div>
                        ) )
                    }
                </div>
            </div>
            <div className={ styles.glossary }>
                <div className={ styles.title }>
                    Thuật ngữ trong bài học
                </div>
                <div className={ styles.boxes }>
                    {
                        data?.session?.document_glossary?.map( ( e, i ) => (
                            <a target="_blank" rel="noreferrer" href={ DOCUMENT_GLOSSARY + slug( e.name ) + '-' + e.id } className={ styles.box } key={ i } style={ { cursor: 'pointer' } } >
                                { e?.name }
                            </a>
                        ) )
                    }
                </div>
            </div>
            <div className={ styles.banner_1 }>
                <div className={ styles.title }>
                    Kho tài liệu AIM
                </div>
                <div className={ styles.description }>
                    Khám phá nguồn tài liệu tham khảo phong phú từ AIM Academy với nhiều hình thức trực quan, sinh động như blog, glossary, ebook, video, podcast, v.v..
                </div>
                <div className={ styles.button }>
                    <a target="_blank" rel="noreferrer" href={ DOCUMENT_GLOSSARY } className={ styles.link }>
                        Xem ngay
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Tab3