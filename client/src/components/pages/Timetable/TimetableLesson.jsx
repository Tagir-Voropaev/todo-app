// client/src/components/pages/Timetable/TimetableLesson.jsx
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllLessons } from '../../../store/timetable/allLessonsSlice'
import axios from '../../../axios'
import Warning from '../../Warning'

const TimetableLesson = ({ lesson }) => {

    const dispatch = useDispatch()

    const [hideWarning, setHideWarning] = useState(false)
    const [itemToDelete, setItemToDelete] = useState({})

    const hideWarningHandler = () => {
        setHideWarning(false)
    }

    const handleGroupDelete = async () => {
        try {
            await axios.delete('/lessons', { data: { id: itemToDelete.id } })
            setHideWarning(false)
            dispatch(fetchAllLessons())
        } catch (error) {
            console.error('Ошибка при удалении занятия:', error)
        }
    }

    const onDeleteLesson = (lesson) => {
        setHideWarning(true)
        setItemToDelete(lesson)
    }

    return (
        <article className="timetable-lesson">
            {hideWarning && (
                <Warning
                    message="Вы действительно хотите удалить этот элемент?"
                    onConfirm={handleGroupDelete}
                    onCancel={hideWarningHandler}
                />
            )}
            <button className="timetable-lesson-delete" onClick={() => onDeleteLesson(lesson)}>
                <i className="fa-solid fa-minus"></i>
            </button>
            <div className="timetable-lesson-info">
                <h3 className="timetable-lesson-school">{lesson.GroupModel?.SchoolModel?.name}</h3>
                <p className="timetable-lesson-group">{lesson.GroupModel?.name}</p>
            </div>
            <div className="timetable-lesson-room">
                <p>Кабинет: {lesson.room}</p>
                <time className="timetable-lesson-time">
                    {lesson.startTime} - {lesson.endTime}
                </time>
            </div>
        </article>
    )
}

export default TimetableLesson