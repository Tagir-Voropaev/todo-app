// client/src/components/pages/Timetable/TimetableContent.jsx
import React, { useRef, useState, useEffect } from 'react'
import '../../../static/css/components/timetable/TimetableContent.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllLessons } from '../../../store/timetable/allLessonsSlice'
import TimetableDay from './TimetableDay'

const TimetableContent = () => {

    const dispatch = useDispatch();

    const [isScrolling, setIsScrolling] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);

    const { selectedGroup, selectedSchool } = useSelector(state => state.timetableNav);
    const { items: lessons } = useSelector(state => state.allLessons);

    useEffect(() => {
        dispatch(fetchAllLessons());
    }, [dispatch]);

    // Фильтрация занятий по выбранной группе
    const filteredLessons = lessons.filter(lesson => {
        // Если выбраны все школы
        if (selectedSchool === "Все школы") {
            // Если выбрана конкретная группа
            if (selectedGroup !== "Все группы") {
                return lesson.GroupModel?.name === selectedGroup;
            }
            return true;
        }
        
        // Если выбрана конкретная школа
        if (selectedSchool !== "Все школы") {
            // Если выбрана конкретная группа
            if (selectedGroup !== "Все группы") {
                return lesson.GroupModel?.name === selectedGroup && 
                       lesson.GroupModel?.SchoolModel?.name === selectedSchool.name;
            }
            // Показываем все занятия выбранной школы
            return lesson.GroupModel?.SchoolModel?.name === selectedSchool.name;
        }

        return true;
    });

    const days = [
        { id: 1, name: 'Понедельник' },
        { id: 2, name: 'Вторник' },
        { id: 3, name: 'Среда' },
        { id: 4, name: 'Четверг' },
        { id: 5, name: 'Пятница' },
        { id: 6, name: 'Суббота' },
        { id: 7, name: 'Воскресенье' }
    ];

    // Обработчики для скролла
    const handleMouseDown = (e) => {
        setIsScrolling(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsScrolling(false);
    };

    const handleMouseMove = (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.6;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <main
            className='timetable-content'
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {days.map(day => (
                <TimetableDay 
                    key={day.id} 
                    day={day}
                    lessons={filteredLessons.filter(lesson => lesson.dayOfWeek === day.id)}
                />
            ))}
        </main>
    )
}

export default TimetableContent