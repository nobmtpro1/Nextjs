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
            alert( 'Lưu thành công' )
        } ).catch( error =>
        {
            alert( 'Lưu thất bại' )
        } )
    }

    const handleSubmitExp = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/account/profile/submit-exp', { exp } ).then( response =>
        {
            alert( 'Lưu thành công' )
        } ).catch( error =>
        {
            alert( 'Lưu thất bại' )
        } )
    }

    const handleSubmitEducation = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/account/profile/submit-education', { education } ).then( response =>
        {
            alert( 'Lưu thành công' )
        } ).catch( error =>
        {
            alert( 'Lưu thất bại' )
        } )
    }

    const handleSubmitSkill = ( e ) =>
    {
        e.preventDefault()
        axios.post( 'page/account/profile/submit-skill', { skill } ).then( response =>
        {
            alert( 'Lưu thành công' )
        } ).catch( error =>
        {
            alert( 'Lưu thất bại' )
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
                <title>AIM E-learning | Hồ sơ</title>
            </Head>
            <div className={ styles.profile }>
                <div className={ styles.title }>
                    Cập nhật hồ sơ cá nhân
                </div>
                <div className={ styles.description }>
                    Vui lòng điền thông tin chính xác để sử dụng làm chứng chỉ khóa học.
                </div>
                <div className={ styles.boxes }>
                    <div className={ styles.left }>
                        <div className={ styles.box }>
                            <div className={ styles.top }>
                                <div className={ styles.box_title }>
                                    Hồ sơ
                                </div>
                                <div className={ styles.box_dot }>
                                    <img alt="" className={ styles.box_dot_img } src="/images/account-profile-dot.svg" />
                                    <Link href={ ACCOUNT_VIEW_PROFILE } passHref>
                                        <a href='#' className={ styles.popup_container }>
                                            <span>
                                                Xem công khai
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <form className={ styles.bot } onSubmit={ handleSubmitProfile }>
                                <div className={ styles.input_group }>
                                    <input placeholder='Họ' className={ styles.input } value={ profile?.firstName } onChange={ e => setProfile( prev => ( { ...prev, firstName: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Tên' className={ styles.input } value={ profile?.lastName } onChange={ e => setProfile( prev => ( { ...prev, lastName: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Địa chỉ' className={ styles.input } value={ profile?.address } onChange={ e => setProfile( prev => ( { ...prev, address: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input type="date" placeholder='Ngày sinh' className={ styles.input } value={ profile?.birthday } onChange={ e => setProfile( prev => ( { ...prev, birthday: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input type="email" placeholder='Email' className={ styles.input } value={ profile?.email } onChange={ e => setProfile( prev => ( { ...prev, email: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Số điện thoại' className={ styles.input } value={ profile?.phone } onChange={ e => setProfile( prev => ( { ...prev, phone: e.target.value } ) ) } />
                                </div>
                                <div className={ `${ styles.input_group } ${ styles.textarea } ` }>
                                    <textarea placeholder='Giới thiệu' className={ styles.input } value={ profile?.description } onChange={ e => setProfile( prev => ( { ...prev, description: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Công việc' className={ styles.input } value={ profile?.job } onChange={ e => setProfile( prev => ( { ...prev, job: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Cấp độ' className={ styles.input } value={ profile?.level } onChange={ e => setProfile( prev => ( { ...prev, level: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Bằng cấp cao nhất' className={ styles.input } value={ profile?.certificate } onChange={ e => setProfile( prev => ( { ...prev, certificate: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Trường' className={ styles.input } value={ profile?.university } onChange={ e => setProfile( prev => ( { ...prev, university: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.input_group }>
                                    <input placeholder='Chuyên ngành' className={ styles.input } value={ profile?.major } onChange={ e => setProfile( prev => ( { ...prev, major: e.target.value } ) ) } />
                                </div>
                                <div className={ styles.policy }>
                                    Khi điền và lưu thông tin, bạn đã đọc và chập thuận <a href={LINK_PRIVACY_POLICY} target="_blank" rel="noreferrer" className={ styles.link }>Chính sách bảo mật.</a>
                                </div>
                                <div className={ styles.button }>
                                    <button > Lưu</button>
                                </div>
                            </form>
                        </div>
                        <div className={ styles.box }>
                            <div className={ styles.top }>
                                <div className={ styles.box_title }>
                                    Kỹ năng
                                </div>
                                <div className={ styles.box_dot }>
                                    <img alt="" src="/images/account-profile-dot.svg" />
                                    <Link href={ ACCOUNT_VIEW_PROFILE } passHref>
                                        <a href='#' className={ styles.popup_container }>
                                            <span>
                                                Xem công khai
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
                                                    <button onClick={ ( e ) => handleDeleteSkill( e, i ) } > Xoá</button>
                                                </div>
                                            }
                                            <div className={ styles.input_group }>
                                                <input placeholder='Kỹ năng' className={ styles.input } value={ skill[ i ] } onChange={ e => setSkill( prev => ( [
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
                                    Khi điền và lưu thông tin, bạn đã đọc và chập thuận <a href={LINK_PRIVACY_POLICY} target="_blank" rel="noreferrer" className={ styles.link }>Chính sách bảo mật.</a>
                                </div>
                                <div className={ styles.button }>
                                    <button > Lưu</button>
                                    <button onClick={ handleAddSkill } > Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={ styles.right }>
                        <div className={ styles.box }>
                            <div className={ styles.top }>
                                <div className={ styles.box_title }>
                                    Kinh nghiệm làm việc
                                </div>
                                <div className={ styles.box_dot }>
                                    <img alt="" src="/images/account-profile-dot.svg" />
                                    <Link href={ ACCOUNT_VIEW_PROFILE } passHref>
                                        <a href='#' className={ styles.popup_container }>
                                            <span>
                                                Xem công khai
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
                                                    <button onClick={ ( e ) => handleDeleteExp( e, i ) } > Xoá</button>
                                                </div>
                                            }
                                            <div className={ styles.input_group }>
                                                <input placeholder='Công ty' className={ styles.input } value={ exp[ i ]?.company } onChange={ e => setExp( prev => ( [
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
                                                    <input placeholder='Chức vụ' className={ styles.input } value={ exp[ i ]?.position } onChange={ e => setExp( prev => ( [
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
                                                        <option value="" disabled>Từ</option>
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
                                                        <option value="" disabled>Đến</option>
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
                                                <textarea placeholder='Mô tả' className={ `${ styles.input } ` } value={ exp[ i ]?.description } onChange={ e => setExp( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        description: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ `${ styles.input_group } ${ styles.textarea } ${ styles.small }` }>
                                                <textarea placeholder='Thành tựu' className={ `${ styles.input } ` } value={ exp[ i ]?.achievement } onChange={ e => setExp( prev => ( [
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
                                    Khi điền và lưu thông tin, bạn đã đọc và chập thuận <a href={LINK_PRIVACY_POLICY} target="_blank" rel="noreferrer" className={ styles.link }>Chính sách bảo mật.</a>
                                </div>
                                <div className={ styles.button }>
                                    <button > Lưu</button>
                                    <button onClick={ hanldeAddExp } > Thêm</button>
                                </div>
                            </form>
                        </div>
                        <div className={ styles.box }>
                            <div className={ styles.top }>
                                <div className={ styles.box_title }>
                                    Học vấn
                                </div>
                                <div className={ styles.box_dot }>
                                    <img alt="" src="/images/account-profile-dot.svg" />
                                    <Link href={ ACCOUNT_VIEW_PROFILE } passHref>
                                        <a href='#' className={ styles.popup_container }>
                                            <span>
                                                Xem công khai
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
                                                    <button onClick={ ( e ) => handleDeleteEducation( e, i ) } > Xoá</button>
                                                </div>
                                            }
                                            <div className={ styles.input_group }>
                                                <input placeholder='Trường' className={ styles.input } value={ education[ i ]?.university } onChange={ e => setEducation( prev => ( [
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
                                                    <input placeholder='Thành phố' className={ styles.input } value={ education[ i ]?.city } onChange={ e => setEducation( prev => ( [
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
                                                        <option>Từ</option>
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
                                                        <option>Đến</option>
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
                                                <textarea placeholder='Bằng cấp' className={ `${ styles.input } ` } value={ education[ i ]?.degree } onChange={ e => setEducation( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        degree: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ `${ styles.input_group } ${ styles.textarea } ${ styles.small }` }>
                                                <textarea placeholder='Chuyên ngành' className={ `${ styles.input } ` } value={ education[ i ]?.major } onChange={ e => setEducation( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        major: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ styles.input_group }>
                                                <input placeholder='Chứng chỉ' className={ styles.input } value={ education[ i ]?.certificate } onChange={ e => setEducation( prev => ( [
                                                    ...prev.slice( 0, i ),
                                                    {
                                                        ...prev[ i ],
                                                        certificate: e.target.value
                                                    },
                                                    ...prev.slice( i + 1 ),
                                                ] ) ) } />
                                            </div>
                                            <div className={ styles.input_group }>
                                                <input placeholder='Giải thưởng' className={ styles.input } value={ education[ i ]?.prize } onChange={ e => setEducation( prev => ( [
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
                                    Khi điền và lưu thông tin, bạn đã đọc và chập thuận <a href={LINK_PRIVACY_POLICY} target="_blank" rel="noreferrer" className={ styles.link }>Chính sách bảo mật.</a>
                                </div>
                                <div className={ styles.button }>
                                    <button > Lưu</button>
                                    <button onClick={ hanldeAddEducation }> Thêm</button>
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