import React, { useEffect } from 'react'
import '../../../static/css/components/timetable/TimetableNav.css'
import { useDispatch } from 'react-redux'
import { fetchAllSchools } from '../../../store/timetable/allSchoolsSlice'
import TimetableNavSchools from './TimetableNavSchools'
import TimetableNavGroups from './TimetableNavGroups'
import TimetableNavLesson from './TimetableNavLesson'

const TimetableNav = () => {
    const dispatch = useDispatch()
   
    useEffect(() => {
        dispatch(fetchAllSchools());
    }, [dispatch]);

    return (
        <nav className='nav'>
            <div className='nav-container'>
                <div className="nav-dropdowns">
                    <TimetableNavSchools />
                    <TimetableNavGroups />
                </div>
                <TimetableNavLesson />
            </div>
        </nav>
    )
}


export default TimetableNav