import React from 'react'
import '../../../static/css/Warning.css'
// import { warningScript } from '../store/warningSlice';
import axios from '../../../axios'
import { useDispatch } from 'react-redux'



const WarningScriptNav = ({ warningVal }) => {
    console.log(warningVal)
    const dispatch = useDispatch()
    // const { warningHide } = useSelector(state => state.warning);
    const onOkHandler = async () => {
        await axios.delete(warningVal.propurl, warningVal.propdata)
        warningVal.hide(false);

        dispatch(warningVal.fetchupdate())
    }
    const onCancelHandler = () => {
        warningVal.hide(false);
    }


    return (


        <div className="warning-wrapper">
            <div className='warning-block'>
                <div className="warning-content">
                    <p>Вы действительно хотите удалить?</p>
                    <div className="warning-buttons">
                        <button onClick={onOkHandler} className='warning-ok warning-button'>Да</button>
                        <button onClick={onCancelHandler} className='warning-cancel warning-button'>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WarningScriptNav