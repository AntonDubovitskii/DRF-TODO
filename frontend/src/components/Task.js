import React from 'react';


const TaskItem = ({task}) => {
    return(
        <tr>
            <td>
                {task.title}
            </td>
            <td>
                {task.description}
            </td>
            <td>
                {task.createdDate}
            </td>

        </tr>
    )
}


const TaskList = ({tasks}) => {
    return (
        <table>
            <th>
                Title
            </th>
            <th>
                Description
            </th>
            <th>
                Date
            </th>
            {tasks.map((task) => <TaskItem task={task} />)}
        </table>
    )
}

export default TaskList