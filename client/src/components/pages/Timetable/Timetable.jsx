import React from 'react'
import '../../../static/css/components/timetable/Timetable.css'
import TimetableNav from './TimetableNav'
import TimetableContent from './TimetableContent'


const Timetable = () => {
    return (
        <div className='wrapper'>
            <div className="window-block">
                <h1 className='window-title'>Расписание</h1>
                <div className="timetable-block">
                    <TimetableNav />
                    <TimetableContent />
                </div>
            </div>
        </div>
    )
}

export default Timetable