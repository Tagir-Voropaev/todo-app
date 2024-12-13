import React, { useRef, useState } from 'react'
import '../../../static/css/components/timetable/TimetableContent.css'
const TimetableContent = () => {

    const [isScrolling, setIsScrolling] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);


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
        const walk = (x - startX) * 1; // Множитель скорости скролла
        containerRef.current.scrollLeft = scrollLeft - walk;
    };
    return (
        <div
            className='timetable-content'
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div draggable="false" className="timetable-day">
                <div className="timetable-day-title"><p>Понедельник</p></div>
                <div className="timetable-day-lessons">
                    <div className="timetable-lesson">
                        <div className="timetable-lesson-school">Школа</div>
                        <div className="timetable-lesson-group">Группа</div>
                        <div className="timetable-lesson-time">10:00 - 11:30</div>
                    </div>
                </div>
            </div>
            <div draggable="false" className="timetable-day">
                <div className="timetable-day-title"><p>Вторник</p></div>
                <div className="timetable-day-lessons">
                    <div className="timetable-lesson">
                        <div className="timetable-lesson-school">Школа</div>
                        <div className="timetable-lesson-group">Группа</div>
                        <div className="timetable-lesson-time">10:00 - 11:30</div>
                    </div>
                </div>
            </div>
            <div draggable="false" className="timetable-day">
                <div className="timetable-day-title"><p>Среда</p></div>
                <div className="timetable-day-lessons">
                    <div className="timetable-lesson">
                        <div className="timetable-lesson-school">Школа</div>
                        <div className="timetable-lesson-group">Группа</div>
                        <div className="timetable-lesson-time">10:00 - 11:30</div>
                    </div>
                </div>
            </div>
            <div draggable="false" className="timetable-day">
                <div className="timetable-day-title"><p>Четверг</p></div>
                <div className="timetable-day-lessons">
                    <div className="timetable-lesson">
                        <div className="timetable-lesson-school">Школа</div>
                        <div className="timetable-lesson-group">Группа</div>
                        <div className="timetable-lesson-time">10:00 - 11:30</div>
                    </div>
                </div>
            </div>
            <div draggable="false" className="timetable-day">
                <div className="timetable-day-title"><p>Пятница</p></div>
                <div className="timetable-day-lessons">
                    <div className="timetable-lesson">
                        <div className="timetable-lesson-school">Школа</div>
                        <div className="timetable-lesson-group">Группа</div>
                        <div className="timetable-lesson-time">10:00 - 11:30</div>
                    </div>
                </div>
            </div>
            <div draggable="false" className="timetable-day">
                <div className="timetable-day-title"><p>Суббота</p></div>
                <div className="timetable-day-lessons">
                    <div className="timetable-lesson">
                        <div className="timetable-lesson-school">Школа</div>
                        <div className="timetable-lesson-group">Группа</div>
                        <div className="timetable-lesson-time">10:00 - 11:30</div>
                    </div>
                </div>
            </div>
            <div draggable="false"className="timetable-day">
                <div className="timetable-day-title"><p>Воскресенье</p></div>
                <div className="timetable-day-lessons">
                    <div className="timetable-lesson">
                        <div className="timetable-lesson-school">Школа</div>
                        <div className="timetable-lesson-group">Группа</div>
                        <div className="timetable-lesson-time">10:00 - 11:30</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TimetableContent