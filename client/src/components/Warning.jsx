import React from 'react'
import '../static/css/Warning.css'
import { useDispatch, useSelector } from 'react-redux'
import { warningScript } from '../store/warningSlice';
const Warning = (props) => {

    const dispatch = useDispatch();
    const { warningHide } = useSelector(state => state.warning);
    const onOkHandler = () => {
        dispatch(warningScript({warningval: true}))
    }
    const onCancelHandler = () => {
        console.log(warningHide)
    }
    

    return (


        <div className="warning-wrapper">
            <div className='warning-block'>
                <div className="warning-content">
                    <p>Вы действительно хотите удалить {props.text}?</p>
                    <div className="warning-buttons">
                        <button onClick={onOkHandler}className='warning-ok warning-button'>Да</button>
                        <button onClick={onCancelHandler} className='warning-cancel warning-button'>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Warning