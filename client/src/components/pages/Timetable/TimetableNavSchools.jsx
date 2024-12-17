import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSchools } from '../../../store/timetable/allSchoolsSlice'
import { fetchCreateSchool } from '../../../store/timetable/createSchoolSlice'
import {
    toggleSchoolDropdown,
    setSelectedSchool,
    toggleSchoolInput,
    toggleGroupInput
} from '../../../store/timetable/timetableNavSlice'
import axios from '../../../axios'
import Warning from '../../Warning'

const TimetableNavSchools = () => {


    const dispatch = useDispatch()
    const schoolRef = useRef(null)
    const [newSchoolName, setNewSchoolName] = useState('')
    const [hideWarning, setHideWarning] = useState(false)
    const [itemToDelete, setItemToDelete] = useState({})


    const {
        isOpenSchool,
        selectedSchool,
        inputToggleSchool,
        inputToggleGroup
    } = useSelector(state => state.timetableNav)

    const { items: schools } = useSelector(state => state.allschools)
    const { status: createStatus } = useSelector(state => state.createSchool)

    useEffect(() => {
        dispatch(fetchAllSchools())
    }, [dispatch])

    useEffect(() => {
        if (createStatus === 'loaded') {
            dispatch(fetchAllSchools())
            setNewSchoolName('')
            dispatch(toggleSchoolInput(false))
        }
    }, [createStatus, dispatch])

    const handleClickOutside = useCallback((event) => {
        if (schoolRef.current && !schoolRef.current.contains(event.target)) {
            dispatch(toggleSchoolDropdown(false))
            dispatch(toggleSchoolInput(false))
        }
    }, [dispatch])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [handleClickOutside])

    const handleSchoolSelect = useCallback((school) => {
        dispatch(setSelectedSchool(school))
        dispatch(toggleSchoolDropdown(false))
    }, [dispatch])

    const openSchoolHandler = useCallback(() => {
        dispatch(toggleSchoolDropdown(!isOpenSchool))
    }, [dispatch, isOpenSchool])

    const inputToggleHandlerSchool = useCallback(() => {
        dispatch(toggleSchoolInput(!inputToggleSchool))
        if (inputToggleGroup) {
            dispatch(toggleGroupInput(false))
        }
    }, [dispatch, inputToggleSchool, inputToggleGroup])

    const handleCreateSchool = useCallback(() => {
        if (newSchoolName.trim()) {
            dispatch(fetchCreateSchool({ name: newSchoolName.trim() }))
        }
    }, [dispatch, newSchoolName])

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleCreateSchool()
        }
    }, [handleCreateSchool])

    const hideWarningHandler = () => {
        setHideWarning(false)
    }
    const handleSchoolDelete = async () => {
        try {
            await axios.delete('/schools', { data: { id: itemToDelete.id } })
            setHideWarning(false)
            dispatch(fetchAllSchools())
        } catch (error) {
            console.error('Ошибка при удалении школы:', error)
        }
    }
    const onDeleteSchool = (school, e) => {
        e.stopPropagation() // Предотвращаем всплытие события
        setHideWarning(true)
        setItemToDelete(school)
    }

    return (
        <div className="dropdown" ref={schoolRef}>
            {hideWarning && (
                <Warning
                    message={`Удалить школу "${itemToDelete.name}"?`}
                    onConfirm={handleSchoolDelete}
                    onCancel={hideWarningHandler}
                />
            )}
            <button
                className="dropdown-toggle"
                onClick={openSchoolHandler}
            >
                {selectedSchool.name || "Все школы"}
                <span className="dropdown-arrow">▼</span>
            </button>
            {isOpenSchool && (
                <ul className="dropdown-menu">
                    <li className="dropdown-item add" onClick={inputToggleHandlerSchool}>
                        <button className='btn-action btn-add'>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </li>
                    {inputToggleSchool && (
                        <li className="dropdown-item">
                            <div className="input-group">
                                <input
                                    className='input'
                                    type="text"
                                    placeholder='Добавить школу...'
                                    value={newSchoolName}
                                    onChange={(e) => setNewSchoolName(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    className='btn-action btn-add'
                                    onClick={handleCreateSchool}
                                    disabled={!newSchoolName.trim()}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </li>
                    )}
                    <li className="dropdown-item" onClick={() => handleSchoolSelect("Все школы")}>
                        Все школы
                    </li>
                    {schools.map((school) => (
                        <li
                            key={school.id}
                            className="dropdown-item"
                            onClick={() => handleSchoolSelect(school)}
                        >
                            <span>{school.name}</span>
                            <button
                                className='btn-action btn-delete'
                                onClick={(e) => onDeleteSchool(school, e)}
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TimetableNavSchools