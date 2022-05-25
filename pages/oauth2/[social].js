import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import axios from '../../sevices/axios'
import Layout from '../../components/layouts/Layout'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/accountSlice'
import Spinner from 'react-bootstrap/Spinner'

const Index = () =>
{
    const dispatch = useDispatch()
    const router = useRouter()
    const { social } = router.query
    const [ loading, setLoading ] = useState( false )
    const [ error, setError ] = useState( null )

    useEffect( () =>
    {
        if ( social )
        {
            setLoading( prev => true )
            axios.get( 'auth/' + social + '/callback?' + router.asPath.split( '?' )[ 1 ] ).then( response =>
            {
                setLoading( prev => false )
                dispatch( loginSuccess( response.data.data ) )
                window.location.href = '/'
            } ).catch( error =>
            {
                setError( error.message )
            } )
        }
    }, [ social, router, dispatch ] )

    return (
        <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' } }>
            {
                loading ? <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                </Spinner> : error ? <Layout>{ error }</Layout> : ''
            }
        </div>

    )
}

export default Index
