import React from 'react'

const FooterText = ( { styles, staticContent } ) =>
{
    return (
        <div className={ `${ styles.footer_text }` }>
            <h2 className={ `${ styles.title }` }>
                { staticContent?.footer_text?.title }
            </h2>
            <div className={ `${ styles.content }` } dangerouslySetInnerHTML={ { __html: staticContent?.footer_text?.content } }>
            </div>
        </div>
    )
}

export default FooterText