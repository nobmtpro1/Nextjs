import styles from '../../styles/account/profile.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layouts/LayoutAccount'
import axios from '../../sevices/axios'
import { ACCOUNT_VIEW_PROFILE, LINK_PRIVACY_POLICY } from '../../constants/route'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Index = () =>
{
    const [ profile, setProfile ] = useState( {
        lastName: "",
        firstName: "",
        address: "",
        birthday: "",
        email: "",
        phone: "",
        description: "",
        job: "",
        level: "",
        certificate: "",
        university: "",
        major: "",
    } )

    const [ skill, setSkill ] = useState( [ "" ] )

    const [ exp, setExp ] = useState( [
        {
            company: "",
            position: "",
            from: "",
            to: "",
            description: "",
            achievement: "",
        }
    ] )

    const [ education, setEducation ] = useState( [
        {
            university: "",
            city: "",
            from: "",
            to: "",
            degree: "",
            major: "",
            certificate: "",
            prize: "",
        }
    ] )

    useEffect( () =>
    {
        axios.get( 'page/account/profile' ).then( response =>
        {
            var { profile: profileData, exp: expData, education: educationData, skill: skillData } = response.data
            setProfile( {
                lastName: profileData?.last_name || "",
                firstName: profileData?.first_name || "",
                address: profileData?.address || "",
                birthday: profileData?.birthday || "",
                email: profileData?.email || "",
                phone: profileData?.phone || "",
                description: profileData?.description || "",
                job: profileData?.job || "",
                level: profileData?.level || "",
                certificate: profileData?.certificate || "",
                university: profileData?.university || "",
                major: profileData?.major || "",
            } )

            var expArr = []
            expData?.forEach( e =>
            {
                expArr.push( {
                    company: e?.company || "",
                    position: e?.position || "",
                    from: e?.from || "",
                    to: e?.to || "",
                    description: e?.description || "",
                    achievement: e?.achievement || "",
                } )
            } )
            if ( expArr.length > 0 )
            {
                setExp( expArr )
            }

            var educationArr = []
            educationData?.forEach( e =>
            {
                educationArr.push( {
                    university: e?.university || "",
                    city: e?.city || "",
                    from: e?.from || "",
                    to: e?.to || "",
                    degree: e?.degree || "",
                    major: e?.major || "",
                    certificate: e?.certificate || "",
                    prize: e?.prize || "",
                } )
            } )
            if ( educationArr.length > 0 )
            {
                setEducation( educationArr )
            }

            var skillArr = []
            skillData?.forEach( e =>
            {
                skillArr.push( e?.skill || "" )
            } )
            if ( skillArr.length > 0 )
            {
                setSkill( skillArr )
            }

        } ).catch( error =>
        {

        } )
    }, [] )

    const handleSubmitProfile = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/account/profile/submit-profile', { ...profile } ).then( response =>
        {
            alert( 'L??u th??nh c??ng' )
        } ).catch( error =>
        {
            alert( 'L??u th???t b???i' )
        } )
    }

    const handleSubmitExp = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/account/profile/submit-exp', { exp } ).then( response =>
        {
            alert( 'L??u th??nh c??ng' )
        } ).catch( error =>
        {
            alert( 'L??u th???t b???i' )
        } )
    }

    const handleSubmitEducation = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/account/profile/submit-education', { education } ).then( response =>
        {
            alert( 'L??u th??nh c??ng' )
        } ).catch( error =>
        {
            alert( 'L??u th???t b???i' )
        } )
    }

    const handleSubmitSkill = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/account/profile/submit-skill', { skill } ).then( response =>
        {
            alert( 'L??u th??nh c??ng' )
        } ).catch( error =>
        {
            alert( 'L??u th???t b???i' )
        } )
    }

    const hanldeAddExp = ( e ) =>
    {
        e.preventDefault()
        setExp( prev => ( [
            ...prev,
            {
                company: "",
                position: "",
                from: "",
                to: "",
                description: "",
                achievement: "",
            }
        ] ) )
    }

    const hanldeAddEducation = ( e ) =>
    {
        e.preventDefault()
        setEducation( prev => ( [
            ...prev,
            {
                university: "",
                city: "",
                from: "",
                to: "",
                degree: "",
                major: "",
                certificate: "",
                prize: "",
            }
        ] ) )
    }

    const handleAddSkill = ( e ) =>
    {
        e.preventDefault()
        setSkill( prev => ( [
            ...prev,
            ""
        ] ) )
    }

    const handleDeleteExp = ( e, i ) =>
    {
        e.preventDefault()
        setExp( prev => ( [
            ...prev.slice( 0, i ),
            ...prev.slice( i + 1 ),
        ] ) )
    }

    const handleDeleteEducation = ( e, i ) =>
    {
        e.preventDefault()
        setEducation( prev => ( [
            ...prev.slice( 0, i ),
            ...prev.slice( i + 1 ),
        ] ) )
    }

    const handleDeleteSkill = ( e, i ) =>
    {
        e.preventDefault()
        setSkill( prev => ( [
            ...prev.slice( 0, i ),
            ...prev.slice( i + 1 ),
        ] ) )
    }

    // UI
    useEffect( () =>
    {
        const dot = document.getElementsByClassName( styles.box_dot )
        Array.from( dot ).forEach( e =>
        {
            const popup = e.getElementsByClassName( styles.popup_container )[ 0 ]
            e.querySelector( 'img' ).addEventListener( 'click', function ()
            {

                if ( popup?.classList.contains( styles.show ) )
                {
                    popup?.classList.remove( styles.show )
                } else
                {
                    popup?.classList.add( styles.show )
                }
            } )

            window.addEventListener( 'click', function ( x )
            {
                if ( !e?.contains( x.target ) && popup?.classList.contains( styles.show ) )
                {
                    popup?.classList.remove( styles.show )
                }
            } )
        } )
    }, [] )

    return (
        <>
            <Head>
                <title>AIM E-learning | H??? s??</title>
            </Head>
            <div className={ styles.profile }>
                <div className={ styles.title }>
                    C???p nh???t h??? s?? c?? nh??n
                </div>
                <div className={ styles.description }>
                    Vui l??ng ??i???n th??ng tin ch??nh x??c ????? s??? d???ng l??m ch???ng ch??? kh??a h???c.
                </div>
                <div className={ styles.boxes }>
                    <div className={ styles.left }>
                        <div className={ styles.box }>
                            <div className={ styles.top }>
                                <div className={ styles.box_title }>
                                    H??? s??
                                </div>
                                <div className={ styles.box_dot }>
                                    <img alt="" className={ styles.box_dot_img } src="/images/account-profile-dot.svg" />
                                    <Link href={ ACCOUNT_VIEW_PROFILE } passHref>
                                        <a href='#' className={ styles.popup_container }>
                                            <span>
                                                Xem c??ng khai
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <form className={ styles.bot } onSubmit={ handleSubmitProfile }>
                                <div className={ styles.input_group }>
                                    <input placeholder='H???' className={ styles.input } value={ profile?.firstName } onChange={ e => setProfile( prev => ( { ...prev, firstName: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='T??n' className={ styles.input } value={ profile?.lastName } onChange={ e => setProfile( prev => ( { ...prev, lastName: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='?????a ch???' className={ styles.input } value={ profile?.address } onChange={ e => setProfile( prev => ( { ...prev, address: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input type="date" placeholder='Ng??y sinh' className={ styles.input } value={ profile?.birthday } onChange={ e => setProfile( prev => ( { ...prev, birthday: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input type="email" placeholder='Email' className={ styles.input } value={ profile?.email } onChange={ e => setProfile( prev => ( { ...prev, email: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='S??? ??i???n tho???i' className={ styles.input } value={ profile?.phone } onChange={ e => setProfile( prev => ( { ...prev, phone: e.target.value } ) ) } />
                                </div>
                                <div className={ `${ styles.input_group } ${ styles.textarea } ` }>
                                    <textarea placeholder='Gi???i thi???u' className={ styles.input } value={ profile?.description } onChange={ e => setProfile( prev => ( { ...prev, description: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='C??ng vi???c' className={ styles.input } value={ profile?.job } onChange={ e => setProfile( prev => ( { ...prev, job: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='C???p ?????' className={ styles.input } value={ profile?.level } onChange={ e => setProfile( prev => ( { ...prev, level: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='B???ng c???p cao nh???t' className={ styles.input } value={ profile?.certificate } onChange={ e => setProfile( prev => ( { ...prev, certificate: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Tr?????ng' className={ styles.input } value={ profile?.university } onChange={ e => setProfile( prev => ( { ...prev, university: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Chuy??n ng??nh' className={ styles.input } value={ profile?.major } onChange={ e => setProfile( prev => ( { ...prev, major: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.policy }>
                                    Khi ??i???n v?? l??u th??ng tin, b???n ???? ?????c v?? ch???p thu???n <a href={LINK_PRIVACY_POLICY} target="_blank" rel="noreferrer" className={ styles.link }>Ch??nh s??ch b???o m???t.</a>
                                </div>
                                <div className={ styles.button }>
                                    <button > L??u</button>
                                </div>
                            </form>
                        </div>
                        <div className={ styles.box }>
                            <div className={ styles.top }>
                                <div className={ styles.box_title }>
                                    K??? n??ng
                                </div>
                                <div className={ styles.box_dot }>
                                    <img alt="" src="/images/account-profile-dot.svg" />
                                    <Link href={ ACCOUNT_VIEW_PROFILE } passHref>
                                        <a href='#' className={ styles.popup_container }>
                                            <span>
                                                Xem c??ng khai
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <form className={ styles.bot } onSubmit={ handleSubmitSkill }>

                                {
                                    skill?.map( ( e, i ) => (
                                        <React.Fragment key={ i }>
                                            {
                                                i > 0 && <div className={ styles.button_delete }>
                                                    <button onClick={ ( e ) => handleDeleteSkill( e, i ) } > Xo??</button>
                                                </div>
                                            }
                                            <div className={ styles.input_group }>
                                                <input placeholder='K??? n??ng' className={ styles.input } value={ skill[ i ] } onChange={ e => setSkill( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    e.target.value
                                                    ,
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                        </React.Fragment>
                                    ) )
                                }


                                <div className={ styles.policy }>
                                    Khi ??i???n v?? l??u th??ng tin, b???n ???? ?????c v?? ch???p thu???n <a href={LINK_PRIVACY_POLICY} target="_blank" rel="noreferrer" className={ styles.link }>Ch??nh s??ch b???o m???t.</a>
                                </div>
                                <div className={ styles.button }>
                                    <button > L??u</button>
                                    <button onClick={ handleAddSkill } > Th??m</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={ styles.right }>
                        <div className={ styles.box }>
                            <div className={ styles.top }>
                                <div className={ styles.box_title }>
                                    Kinh nghi???m l??m vi???c
                                </div>
                                <div className={ styles.box_dot }>
                                    <img alt="" src="/images/account-profile-dot.svg" />
                                    <Link href={ ACCOUNT_VIEW_PROFILE } passHref>
                                        <a href='#' className={ styles.popup_container }>
                                            <span>
                                                Xem c??ng khai
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <form className={ styles.bot } onSubmit={ handleSubmitExp }>

                                {
                                    exp?.map( ( e, i ) => (
                                        <React.Fragment key={ i }>
                                            {
                                                i > 0 && <div className={ styles.button_delete }>
                                                    <button onClick={ ( e ) => handleDeleteExp( e, i ) } > Xo??</button>
                                                </div>
                                            }
                                            <div className={ styles.input_group }>
                                                <input placeholder='C??ng ty' className={ styles.input } value={ exp[ i ]?.company } onChange={ e => setExp( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        company: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ styles.input_group_container }>
                                                <div className={ styles.input_group }>
                                                    <input placeholder='Ch???c v???' className={ styles.input } value={ exp[ i ]?.position } onChange={ e => setExp( prev => ( [
                                                        ...prev.slice( 0, i ),
                                                        {
                                                            ...prev[ i ],
                                                            position: e.target.value
                                                        },
                                                        ...prev.slice( i + 1 ),
                                                    ] ) ) } />
                                                </div>
                                                <div className={ styles.input_group }>
                                                    <select className={ styles.input_select } value={ exp[ i ]?.from } onChange={ e => setExp( prev => ( [
                                                        ...prev.slice( 0, i ),
                                                        {
                                                            ...prev[ i ],
                                                            from: e.target.value
                                                        },
                                                        ...prev.slice( i + 1 ),
                                                    ] ) ) }>
                                                        <option value="" disabled>T???</option>
                                                        {
                                                            [ ...Array( new Date().getFullYear() ).keys() ].map( e =>
                                                            {
                                                                if ( e > 1999 )
                                                                {
                                                                    return ( <option key={ e } value={ e + 1 } >{ e + 1 }</option> )
                                                                }
                                                            } )
                                                        }
                                                    </select>
                                                </div>
                                                <div className={ styles.input_group }>
                                                    <select className={ styles.input_select } value={ exp[ i ]?.to } onChange={ e => setExp( prev => ( [
                                                        ...prev.slice( 0, i ),
                                                        {
                                                            ...prev[ i ],
                                                            to: e.target.value
                                                        },
                                                        ...prev.slice( i + 1 ),
                                                    ] ) ) }>
                                                        <option value="" disabled>?????n</option>
                                                        {
                                                            [ ...Array( new Date().getFullYear() ).keys() ].map( e =>
                                                            {
                                                                if ( e > 1999 )
                                                                {
                                                                    return ( <option key={ e } value={ e + 1 } >{ e + 1 }</option> )
                                                                }
                                                            } )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={ `${ styles.input_group } ${ styles.textarea } ${ styles.small }` }>
                                                <textarea placeholder='M?? t???' className={ `${ styles.input } ` } value={ exp[ i ]?.description } onChange={ e => setExp( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        description: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ `${ styles.input_group } ${ styles.textarea } ${ styles.small }` }>
                                                <textarea placeholder='Th??nh t???u' className={ `${ styles.input } ` } value={ exp[ i ]?.achievement } onChange={ e => setExp( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        achievement: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                        </React.Fragment>
                                    ) )
                                }


                                <div className={ styles.policy }>
                                    Khi ??i???n v?? l??u th??ng tin, b???n ???? ?????c v?? ch???p thu???n <a href={LINK_PRIVACY_POLICY} target="_blank" rel="noreferrer" className={ styles.link }>Ch??nh s??ch b???o m???t.</a>
                                </div>
                                <div className={ styles.button }>
                                    <button > L??u</button>
                                    <button onClick={ hanldeAddExp } > Th??m</button>
                                </div>
                            </form>
                        </div>
                        <div className={ styles.box }>
                            <div className={ styles.top }>
                                <div className={ styles.box_title }>
                                    H???c v???n
                                </div>
                                <div className={ styles.box_dot }>
                                    <img alt="" src="/images/account-profile-dot.svg" />
                                    <Link href={ ACCOUNT_VIEW_PROFILE } passHref>
                                        <a href='#' className={ styles.popup_container }>
                                            <span>
                                                Xem c??ng khai
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <form className={ styles.bot } onSubmit={ handleSubmitEducation }>
                                {
                                    education?.map( ( e, i ) => (
                                        <React.Fragment key={ i }>
                                            {
                                                i > 0 && <div className={ styles.button_delete }>
                                                    <button onClick={ ( e ) => handleDeleteEducation( e, i ) } > Xo??</button>
                                                </div>
                                            }
                                            <div className={ styles.input_group }>
                                                <input placeholder='Tr?????ng' className={ styles.input } value={ education[ i ]?.university } onChange={ e => setEducation( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        university: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ styles.input_group_container }>
                                                <div className={ styles.input_group }>
                                                    <input placeholder='Th??nh ph???' className={ styles.input } value={ education[ i ]?.city } onChange={ e => setEducation( prev => ( [
                                                        ...prev.slice( 0, i ),
                                                        {
                                                            ...prev[ i ],
                                                            city: e.target.value
                                                        },
                                                        ...prev.slice( i + 1 ),
                                                    ] ) ) } />
                                                </div>
                                                <div className={ styles.input_group }>
                                                    <select className={ styles.input_select } value={ education[ i ]?.from } onChange={ e => setEducation( prev => ( [
                                                        ...prev.slice( 0, i ),
                                                        {
                                                            ...prev[ i ],
                                                            from: e.target.value
                                                        },
                                                        ...prev.slice( i + 1 ),
                                                    ] ) ) } >
                                                        <option>T???</option>
                                                        {
                                                            [ ...Array( new Date().getFullYear() ).keys() ].map( e =>
                                                            {
                                                                if ( e > 1999 )
                                                                {
                                                                    return ( <option key={ e } value={ e + 1 } >{ e + 1 }</option> )
                                                                }
                                                            } )
                                                        }
                                                    </select>
                                                </div>
                                                <div className={ styles.input_group }>
                                                    <select className={ styles.input_select } value={ education[ i ]?.to } onChange={ e => setEducation( prev => ( [
                                                        ...prev.slice( 0, i ),
                                                        {
                                                            ...prev[ i ],
                                                            to: e.target.value
                                                        },
                                                        ...prev.slice( i + 1 ),
                                                    ] ) ) } >
                                                        <option>?????n</option>
                                                        {
                                                            [ ...Array( new Date().getFullYear() ).keys() ].map( e =>
                                                            {
                                                                if ( e > 1999 )
                                                                {
                                                                    return ( <option key={ e } value={ e + 1 } >{ e + 1 }</option> )
                                                                }
                                                            } )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={ `${ styles.input_group } ${ styles.textarea } ${ styles.small }` }>
                                                <textarea placeholder='B???ng c???p' className={ `${ styles.input } ` } value={ education[ i ]?.degree } onChange={ e => setEducation( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        degree: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ `${ styles.input_group } ${ styles.textarea } ${ styles.small }` }>
                                                <textarea placeholder='Chuy??n ng??nh' className={ `${ styles.input } ` } value={ education[ i ]?.major } onChange={ e => setEducation( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        major: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ styles.input_group }>
                                                <input placeholder='Ch???ng ch???' className={ styles.input } value={ education[ i ]?.certificate } onChange={ e => setEducation( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        certificate: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ styles.input_group }>
                                                <input placeholder='Gi???i th?????ng' className={ styles.input } value={ education[ i ]?.prize } onChange={ e => setEducation( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        prize: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                        </React.Fragment>
                                    ) )
                                }
                                <div className={ styles.policy }>
                                    Khi ??i???n v?? l??u th??ng tin, b???n ???? ?????c v?? ch???p thu???n <a href={LINK_PRIVACY_POLICY} target="_blank" rel="noreferrer" className={ styles.link }>Ch??nh s??ch b???o m???t.</a>
                                </div>
                                <div className={ styles.button }>
                                    <button > L??u</button>
                                    <button onClick={ hanldeAddEducation }> Th??m</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default Index

Index.getLayout = function getLayout ( page )
{
    return (
        <Layout header={ page.props.header } styles={ styles }>
            { page }
        </Layout>
    )
}



export async function getStaticProps ()
{
    return {
        props: {},
    }
}