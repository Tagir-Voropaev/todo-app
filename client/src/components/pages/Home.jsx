import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../store/tasksSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    return (
            <div className="wrapper">
                <h1>Home</h1>
            </div>
    )
}


export default Home;