import { useRouter } from 'next/router'
import React from 'react'


const Pagination = ( { lastPage, styles } ) =>
{
    const router = useRouter()

    const currentPage = router.query.page || 1

    const handleChangePage = ( page ) =>
    {
        if ( page < 1 || page > lastPage )
        {
            return false
        }

        router.push( {
            pathname: router.pathname,
            query: { ...router.query, page: page },
        } )
    }

    var list = [];
    for ( var i = parseInt( currentPage ) - 4; i < parseInt( currentPage ) + 3; i++ )
    {
        if ( i >= lastPage || i <= -1 )
        {
            continue
        }
        list.push( i );
    }

    return (
        <div className={ styles.pagination }>




            <div className={ styles.pagination }>
                <ul>
                    <li onClick={ () => handleChangePage( currentPage ? parseInt( currentPage ) - 1 : 1 ) }>
                        <a><img alt='' src='/images/main/products-left.svg' /></a>
                    </li>
                    {
                        parseInt( currentPage ) - 4 > 0 && (
                            <li onClick={ () => handleChangePage( 1 ) }>
                                <a>
                                    1
                                </a>
                            </li> )
                    }

                    {
                        parseInt( currentPage ) - 4 > 1 && (
                            <li>
                                <a>
                                    ...
                                </a>
                            </li> )
                    }

                    {
                        list?.map( ( e, i ) => (
                            <li key={ e } onClick={ () => handleChangePage( e + 1 ) }>
                                <a className={ ` ${ !currentPage && e == 0 ? styles.active : '' } ${ currentPage == ( e + 1 ) && styles.active }` }>
                                    { e + 1 }
                                </a>
                            </li>
                        ) )
                    }

                    {
                        parseInt( lastPage ) - 4 > currentPage && (
                            <li >
                                <a>
                                    ...
                                </a>
                            </li> )
                    }

                    {
                        parseInt( lastPage ) - 3 > currentPage && (
                            <li onClick={ () => handleChangePage( lastPage ) }>
                                <a>
                                    { lastPage }
                                </a>
                            </li> )
                    }
                    <li onClick={ () => handleChangePage( currentPage ? parseInt( currentPage ) + 1 : 2 ) }>
                        <a><img alt='' src='/images/main/products-right.svg' /></a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Pagination
