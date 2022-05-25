import React from 'react'

const Video = ( { styles, scormUrl } ) =>
{
    return (
        <div className={ styles.video }>
            <div className={ styles.left }>
                <div className={ styles.top }>
                    {
                        scormUrl && <iframe
                            src={ scormUrl }
                        >
                        </iframe>
                    }
                </div>
            </div>
        </div>
    )
}

export default Video