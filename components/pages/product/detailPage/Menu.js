import React from 'react'

const Menu = ( { styles, tab, setTab,hideTab } ) =>
{
    return (
        <div className={ styles.anchor }>
            <a style={ { cursor: 'pointer' } } className={ `${ styles.text } ${ tab == 0 && styles.active } ` } onClick={ () => setTab( 0 ) }>
                Lợi ích
            </a>
            <a style={ { cursor: 'pointer' } } className={ `${ styles.text } ${ tab == 1 && styles.active } ` } onClick={ () => setTab( 1 ) }>
                Đối tượng
            </a>
            <a style={ { cursor: 'pointer' } } className={ `${ styles.text } ${ tab == 2 && styles.active } ` } onClick={ () => setTab( 2 ) }>
                Nội dung
            </a>
            <a style={ { cursor: 'pointer' } } className={ `${ styles.text } ${ tab == 3 && styles.active } ` } onClick={ () => setTab( 3 ) }>
                Chứng chỉ
            </a>
            <a style={ { cursor: 'pointer', display: hideTab == 4 ? 'none' : 'initial' } } className={ `${ styles.text } ${ tab == 4 && styles.active } ` } onClick={ () => setTab( 4 ) }>
                Đánh giá
            </a>
        </div>
    )
}
    
export default Menu