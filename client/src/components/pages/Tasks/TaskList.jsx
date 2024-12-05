import React, { useEffect } from 'react'
import "../../../static/css/components/tasks/TaskList.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../../store/tasksSlice'
import axios from '../../../axios'
// const TaskList = () => {

//     // Существующие задачи
//     const dispatch = useDispatch();
//     const { tasks } = useSelector(state => state.tasks);

//     //Получение задач
//     useEffect(() => {
//         dispatch(fetchTasks())
//     }, [dispatch])

//     const filteredTasks = tasks.items.filter(task => {
//         return task.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
//     })

//     const onDeleteButtton = async (value) => {
//         await axios.delete('/tasks', {data: { id: value.id },})
//         dispatch(fetchTasks())
//     }
//     return (
//         <ul className="task-list">
//             {tasks.status === 'loaded'
//                 ? (tasks.items.map(item => {
//                     return (
//                         <li key={item.id} className='task-elem'>
//                             <p className='task-title'>{item.title}</p>
//                             <p className='task-time'>{item.timetask}</p>
//                             <p className='task-date'>{item.datetask}</p>
//                             <button className='task-delete' onClick={e => onDeleteButtton(item)}><i className="fa-solid fa-trash"></i></button>
//                         </li>
//                     )
//                 }))
//                 : (<h1>Loading...</h1>)
//             }

//         </ul>

//     )
// }

// export default TaskList