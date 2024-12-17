// client/src/components/pages/Timetable/TimetableAddLesson.jsx
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllLessons } from '../../../store/timetable/allLessonsSlice' // Добавляем импорт
import { createLesson, clearStatus } from '../../../store/timetable/createLessonSlice'
import '../../../static/css/components/timetable/TimetableNavLesson.css'

const TimetableNavLesson = () => {

    const dispatch = useDispatch()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [formData, setFormData] = useState({
        schoolId: '',
        groupId: '',
        dayOfWeek: '',
        room: '',
        startTime: '',
        endTime: ''
    })

    const { items: schools } = useSelector(state => state.allschools)
    const { items: groups } = useSelector(state => state.allgroups)
    const { status, error } = useSelector(state => state.createLesson)

    const days = [
        { id: 1, name: 'Понедельник' },
        { id: 2, name: 'Вторник' },
        { id: 3, name: 'Среда' },
        { id: 4, name: 'Четверг' },
        { id: 5, name: 'Пятница' },
        { id: 6, name: 'Суббота' },
        { id: 7, name: 'Воскресенье' }
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(createLesson(formData)).unwrap()
            setIsFormVisible(false)
            setFormData({
                schoolId: '',
                groupId: '',
                dayOfWeek: '',
                room: '',
                startTime: '',
                endTime: ''
            })
            dispatch(clearStatus())
            // Обновляем список занятий после успешного создания
            dispatch(fetchAllLessons())
        } catch (err) {
            console.error('Failed to create lesson:', err)
        }
    }

    // Добавляем отображение статуса и ошибок
    const renderStatus = () => {
        if (status === 'loading') {
            return <div className="status-message loading">Создание занятия...</div>
        }
        if (status === 'failed') {
            return <div className="status-message error">{error}</div>
        }
        if (status === 'succeeded') {
            return <div className="status-message success">Занятие успешно создано!</div>
        }
        return null
    }

    return (
        <div className="nav-lesson-add">
            <button 
                className="btn-add-lesson"
                onClick={() => setIsFormVisible(true)}
            >
                Добавить занятие
            </button>

            {isFormVisible && (
                <div className="timetable-add-lesson-modal">
                    <div className="timetable-add-lesson-form-container">
                        <h2>Добавление занятия</h2>
                        <form onSubmit={handleSubmit} className="timetable-add-lesson-form">
                            <div className="form-group">
                                <label>Школа:</label>
                                <select
                                    name="schoolId"
                                    value={formData.schoolId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Выберите школу</option>
                                    {schools.map(school => (
                                        <option key={school.id} value={school.id}>
                                            {school.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Группа:</label>
                                <select
                                    name="groupId"
                                    value={formData.groupId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Выберите группу</option>
                                    {groups
                                        .filter(group => !formData.schoolId || group.schoolId === parseInt(formData.schoolId))
                                        .map(group => (
                                            <option key={group.id} value={group.id}>
                                                {group.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label>День недели:</label>
                                <select
                                    name="dayOfWeek"
                                    value={formData.dayOfWeek}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Выберите день</option>
                                    {days.map(day => (
                                        <option key={day.id} value={day.id}>
                                            {day.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Кабинет:</label>
                                <input
                                    type="text"
                                    name="room"
                                    value={formData.room}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Время начала:</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Время окончания:</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {renderStatus()}
                            <div className="form-buttons">
                                <button type="submit" className="submit-button">
                                    Добавить
                                </button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setIsFormVisible(false)}
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TimetableNavLesson