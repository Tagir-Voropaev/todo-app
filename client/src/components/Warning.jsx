import React from 'react'
import '../static/css/Warning.css'

const Warning = ({
    message, // основной текст предупреждения
    onConfirm, // функция подтверждения
    onCancel, // функция отмены
}) => {
    return (
        <div className="warning-wrapper">
            <div className='warning-block'>
                <div className="warning-content">
                    <p className='warning-message'>{message}</p>
                    <div className="warning-buttons">
                        <button onClick={onConfirm} className='warning-ok warning-button'>Да</button>
                        <button onClick={onCancel} className='warning-cancel warning-button'>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Warning