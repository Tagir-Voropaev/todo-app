// client/src/components/pages/Timetable/TimetableDay.jsx
import React from 'react'
import TimetableLesson from './TimetableLesson'

const TimetableDay = ({ day, lessons }) => {
    // Сортируем занятия по времени начала
    const sortedLessons = [...lessons].sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
    });

    return (
        <section className="timetable-day" draggable="false">
            <header className="timetable-day-header">
                <h2 className="timetable-day-title">{day.name}</h2>
            </header>
            <div className="timetable-day-lessons">
                {sortedLessons.length > 0 ? (
                    sortedLessons.map(lesson => (
                        <TimetableLesson key={lesson.id} lesson={lesson} />
                    ))
                ) : (
                    <div className="timetable-day-empty">
                        <p>Нет занятий</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default TimetableDay