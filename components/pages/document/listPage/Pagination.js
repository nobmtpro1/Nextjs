import { useRouter } from 'next/router'
import React from 'react'


const Pagination = ( { lastPage,styles } ) =>
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
            <ul className={ styles.ul }>
                <li className={ styles.li } onClick={ () => handleChangePage( currentPage ? parseInt( currentPage ) - 1 : 1 ) }>
                    <a className={ styles.prev }>
                        <img alt='' src="/images/left_pg.png" />
                    </a>
                </li>

                {
                    parseInt( currentPage ) - 4 > 0 && (
                        <li className={ styles.li } onClick={ () => handleChangePage( 1 ) }>
                            <a className={ `${ styles.link }` }>
                                1
                            </a>
                        </li> )
                }

                {
                    parseInt( currentPage ) - 4 > 1 && (
                        <li className={ styles.li }>
                            <a className={ `${ styles.link }` }>
                                ...
                            </a>
                        </li> )
                }

                {
                    list?.map( ( e, i ) => (
                        <li className={ styles.li } key={ e } onClick={ () => handleChangePage( e + 1 ) }>
                            <a className={ `${ styles.link } ${ !currentPage && e == 0 ? styles.active : '' } ${ currentPage == ( e + 1 ) && styles.active }` }>
                                { e + 1 }
                            </a>
                        </li>
                    ) )
                }

                {
                    parseInt( lastPage ) - 4 > currentPage && (
                        <li className={ styles.li }>
                            <a className={ `${ styles.link }` }>
                                ...
                            </a>
                        </li> )
                }

                {
                    parseInt( lastPage ) - 3 > currentPage && (
                        <li className={ styles.li } onClick={ () => handleChangePage( lastPage ) }>
                            <a className={ `${ styles.link }` }>
                                { lastPage }
                            </a>
                        </li> )
                }

                <li className={ styles.li } onClick={ () => handleChangePage( currentPage ? parseInt( currentPage ) + 1 : 2 ) }>
                    <a className={ styles.next }>
                        <img alt='' src="/images/right_pg.png" />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination
