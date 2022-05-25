import axios from '../../sevices/axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from "react-bootstrap/Spinner";

const PopupUpdateAccount = () =>
{
	const [ loading, setLoading ] = useState( false )
	const [ form, setForm ] = useState( {
		job_id: '',
		demand_id: '',
		phone: ''
	} )
	const [ selection, setSelection ] = useState( null )
	const [ selectionDemand, setSelectionDemand ] = useState( null )

	const { user } = useSelector( state => state?.account )

	useEffect( () =>
	{
		axios.get( 'register/form-register-user-selection' ).then( response =>
		{
			setSelection( response.data )
		} ).catch( error =>
		{
		} )
	}, [] )

	useEffect( () =>
	{
		if ( form?.job_id )
		{
			var selectionFilter = selection?.filter( e => e?.parent_id == form?.job_id )
			setSelectionDemand( selectionFilter )
			setForm( prev => ( {
				...prev,
				demand_id: ''
			} ) )
		}
	}, [ form?.job_id, selection ] )

	const handleSubmit = ( e ) =>
	{
		e.preventDefault()

		if ( form?.phone.length < 10 || form?.phone.length > 15 )
		{
			alert( 'Số điện thoại phải chứa từ 10 đến 15 ký tự' )
			return false
		}

		var formData = new FormData
		formData.append( 'phone', form?.phone )
		formData.append( 'job_id', form?.job_id )
		formData.append( 'demand_id', form?.demand_id )
		setLoading( true )
		axios.post( 'page/account/update-account/submit', formData ).then( response =>
		{
			setLoading( false )
			window.location.href = window.location.href
		} ).catch( error =>
		{
			alert( 'Lưu thất bại' )
			setLoading( false )
		} )
	}

	return (
		<div className={ `popup-update-account ${ !user?.data || user?.data?.phone && user?.data?.job_id && user?.data?.demand_id ? 'hide' : '' }` }>
			<div className='box'>
				<div className='title'>
					Cập nhật tài khoản
				</div>
				<form className='form' onSubmit={ handleSubmit }>
					<div className='form-group'>
						<input required name='phone' placeholder='Số điện thoại' value={ form?.phone } onChange={ e => setForm( prev => ( { ...prev, phone: e.target.value } ) ) } />
					</div>
					<div className='form-group'>
						<select
							required
							defaultValue=""
							onChange={ e => setForm( prev => ( { ...prev, job_id: e.target.value } ) ) }
						>
							<option value='' disabled  >Công việc</option>
							{
								selection?.filter( x => x?.type == 'job' )?.map( ( e, i ) => (
									<option key={ i } value={ e?.id }>{ e?.selection }</option>
								) )
							}
						</select>
					</div>
					<div className='form-group'>
						<select
							required
							value={ form?.demand_id }
							onChange={ e => setForm( prev => ( { ...prev, demand_id: e.target.value } ) ) }
						>
							<option value='' disabled >Nhu cầu</option>
							{
								selectionDemand?.map( ( e, i ) => (
									<option key={ i } value={ e?.id }>{ e?.selection }</option>
								) )
							}
						</select>
					</div>
					<div className='button'>
						<button type='submit' disabled={ loading }>
							{
								loading ? <><Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
									disabled={ !loading }
								/> <span>&nbsp;&nbsp;&nbsp;</span></> : ''
							}
							Cập nhật
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default PopupUpdateAccount