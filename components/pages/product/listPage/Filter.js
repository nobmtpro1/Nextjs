import { useRouter } from 'next/router'
import React from 'react'

const Filter = ( { styles, courseCategory } ) =>
{

    const router = useRouter()

    const handleChangeCategory = ( category ) =>
    {
        router.push( {
            pathname: router.pathname,
            query: { ...router.query, category, page: 1 },
        } )
    }

    const handleChangePrice = ( price ) =>
    {
        router.push( {
            pathname: router.pathname,
            query: { ...router.query, price, page: 1 },
        } )
    }

    const handleChangeLevel = ( level ) =>
    {
        router.push( {
            pathname: router.pathname,
            query: { ...router.query, level, page: 1 },
        } )
    }

    const handleChangeCertificateType = ( type ) =>
    {
        router.push( {
            pathname: router.pathname,
            query: { ...router.query, certificateType: type, page: 1 },
        } )
    }

    return (
        <div className={ styles.filter }>
            <div className={ styles.selects }>
                <div className={ styles.select }>
                    <select
                        value={ router.query.category || "" }
                        onChange={ ( e ) => handleChangeCategory( e.target.value ) }
                    >
                        <option value="">Nhóm chủ đề</option>
                        {
                            courseCategory?.map( ( e, i ) => (
                                <option key={ i } value={ e.id }>{ e.name }</option>
                            ) )
                        }
                    </select>
                </div>
                <div className={ styles.select }>
                    <select
                        value={ router.query.price || "" }
                        onChange={ ( e ) => handleChangePrice( e.target.value ) }
                    >
                        <option value="">Mức giá</option>
                        <option value={ 1 }>Dưới 499.000đ</option>
                        <option value={ 2 }>Từ 499.000 - 1.999.000đ</option>
                        <option value={ 3 }>Trên 1.999.000đ</option>
                    </select>
                </div>
                <div className={ styles.select }>
                    <select
                        value={ router.query.certificateType || "" }
                        onChange={ ( e ) => handleChangeCertificateType( e.target.value ) }
                    >
                        <option value="">Chứng chỉ</option>
                        <option value={ 0 }>Chứng chỉ đơn</option>
                        <option value={ 1 }>Chứng chỉ chuyên nghiệp</option>
                    </select>
                </div>
                <div className={ styles.select }>
                    <select
                        value={ router.query.level || "" }
                        onChange={ ( e ) => handleChangeLevel( e.target.value ) }
                    >
                        <option value="">Cấp độ</option>
                        <option value={ 0 }>Cơ bản</option>
                        <option value={ 1 }>Trung bình</option>
                        <option value={ 2 }>Nâng cao</option>
                    </select>
                </div>
            </div>
            <div className={ styles.result }>
                {
                    router.query.category && <div className={ styles.box } onClick={ () => handleChangeCategory( "" ) }>
                        {
                            courseCategory?.find( e => e.id == router.query.category )?.name
                        }
                    </div>
                }
                {
                    router.query.price && <div className={ styles.box } onClick={ () => handleChangePrice( "" ) }>
                        {
                            router.query.price == 1 ? "Dưới 499.000đ" :
                                router.query.price == 2 ? "Từ 499.000 - 1.999.000đ" :
                                    router.query.price == 3 ? "Trên 1.999.000đ" : ''
                        }
                    </div>
                }
                {
                    router.query.certificateType && <div className={ styles.box } onClick={ () => handleChangeCertificateType( "" ) }>
                        {
                            router.query.certificateType == 0 ? "Chứng chỉ đơn" :
                                router.query.certificateType == 1 ? "Chứng chỉ chuyên nghiệp" : ''
                        }
                    </div>
                }
                {
                    router.query.level && <div className={ styles.box } onClick={ () => handleChangeLevel( "" ) }>
                        {
                            router.query.level == 0 ? "Cơ bản" :
                                router.query.level == 1 ? "Trung bình" :
                                    router.query.level == 2 ? "Nâng cao" : ''
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Filter