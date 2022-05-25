import React from 'react'

const Breadcrumb = ( { styles, name, image } ) =>
{
    return (
        <div className={ `${ styles.banner }` }>
            <div className={ styles.left }>
                <h1 className={ styles.text } dangerouslySetInnerHTML={{__html: name}}></h1>
            </div>
            <div className={ styles.right }>
                <div className={ styles.image }>
                    <img alt='' src={ image } />
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb