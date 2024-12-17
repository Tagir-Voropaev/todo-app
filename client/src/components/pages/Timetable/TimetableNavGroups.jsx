import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllGroups } from '../../../store/timetable/allGroupsSlice'
import { fetchCreateGroup } from '../../../store/timetable/createGroupSlice'
import {
    toggleGroupDropdown,
    setSelectedGroup,
    toggleGroupInput,
    toggleSchoolInput
} from '../../../store/timetable/timetableNavSlice'
import axios from '../../../axios'
import Warning from '../../Warning'

const TimetableNavGroups = () => {
    const dispatch = useDispatch()
    const groupRef = useRef(null)
    const [newGroupName, setNewGroupName] = useState('')

    const [hideWarning, setHideWarning] = useState(false)
    const [itemToDelete, setItemToDelete] = useState({})


    const {
        isOpenGroup,
        selectedSchool,
        selectedGroup,
        inputToggleGroup,
        inputToggleSchool
    } = useSelector(state => state.timetableNav) || {
        isOpenGroup: false,
        selectedSchool: 'Все школы',
        selectedGroup: 'Все группы',
        inputToggleGroup: false,
        inputToggleSchool: false
    }

    const { items: groups = [] } = useSelector(state => state.allgroups) || {}
    const { status: createStatus } = useSelector(state => state.createGroup)

    useEffect(() => {
        dispatch(fetchAllGroups())
    }, [dispatch])

    // Обновляем список групп после успешного создания
    useEffect(() => {
        if (createStatus === 'loaded') {
            dispatch(fetchAllGroups())
            setNewGroupName('')
            dispatch(toggleGroupInput(false))
        }
    }, [createStatus, dispatch])

    const handleClickOutside = useCallback((event) => {
        if (groupRef.current && !groupRef.current.contains(event.target)) {
            dispatch(toggleGroupDropdown(false))
            dispatch(toggleGroupInput(false))
        }
    }, [dispatch])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [handleClickOutside])

    const getSelectedSchoolGroups = useCallback(() => {
        if (selectedSchool === 'Все школы') return []
        return groups.filter(group => group.schoolId === selectedSchool.id)
    }, [selectedSchool, groups])

    const handleGroupSelect = useCallback((group) => {
        const groupName = typeof group === 'string' ? group : group.name
        dispatch(setSelectedGroup(groupName))
        dispatch(toggleGroupDropdown(false))
    }, [dispatch])

    const openGroupHandler = useCallback(() => {
        dispatch(toggleGroupDropdown(!isOpenGroup))
    }, [dispatch, isOpenGroup])

    const inputToggleHandlerGroup = useCallback(() => {
        dispatch(toggleGroupInput(!inputToggleGroup))
        if (inputToggleSchool) {
            dispatch(toggleSchoolInput(false))
        }
    }, [dispatch, inputToggleGroup, inputToggleSchool])

    const handleCreateGroup = useCallback(() => {
        if (newGroupName.trim() && selectedSchool.id) {
            dispatch(fetchCreateGroup({
                name: newGroupName.trim(),
                schoolId: selectedSchool.id
            }))
        }
    }, [dispatch, newGroupName, selectedSchool])

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleCreateGroup()
        }
    }, [handleCreateGroup])


    const hideWarningHandler = () => {
        setHideWarning(false)
    }

    const handleGroupDelete = async () => {
        try {
            await axios.delete('/groups', { data: { id: itemToDelete.id } })
            setHideWarning(false)
            dispatch(fetchAllGroups())
        } catch (error) {
            console.error('Ошибка при удалении группы:', error)
        }
    }

    const onDeleteGroup = (group, e) => {
        e.stopPropagation()
        setHideWarning(true)
        setItemToDelete(group)
        dispatch(toggleGroupDropdown(false))
    }
    return (
        <div className="dropdown" ref={groupRef}>
            {hideWarning && (
                <Warning
                    message={`Удалить группу "${itemToDelete.name}"?`}
                    onConfirm={handleGroupDelete}
                    onCancel={hideWarningHandler}
                />
            )}
            <button 
                className="dropdown-toggle"
                onClick={openGroupHandler}
                disabled={selectedSchool === 'Все школы'}
            >
                {selectedGroup}
                <span className="dropdown-arrow">▼</span>
            </button>
            {isOpenGroup && (
                <ul className="dropdown-menu">
                    <li className="dropdown-item add" onClick={inputToggleHandlerGroup}>
                        <button className='btn-action btn-add'>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </li>
                    {inputToggleGroup && (
                        <li className="dropdown-item">
                            <div className="input-group">
                                <input 
                                    className='input'
                                    type="text" 
                                    placeholder='Добавить группу...'
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button 
                                    className='btn-action btn-add'
                                    onClick={handleCreateGroup}
                                    disabled={!newGroupName.trim()}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </li>
                    )}
                    <li className="dropdown-item" onClick={() => handleGroupSelect("Все группы")}>
                        Все группы
                    </li>
                    {getSelectedSchoolGroups().length > 0 ? (
                        getSelectedSchoolGroups().map((group) => (
                            <li 
                                key={group.id} 
                                className="dropdown-item"
                                onClick={() => handleGroupSelect(group)}
                            >
                                <span>{group.name}</span>
                                <button 
                                    className='btn-action btn-delete'
                                    onClick={(e) => onDeleteGroup(group, e)}
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="dropdown-item disabled">
                            <span>Нет доступных групп</span>
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default TimetableNavGroups