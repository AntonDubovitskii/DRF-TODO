import React from 'react';


const WorkerItem = ({worker}) => {
    return(
        <tr>
            <td>
                {worker.id}
            </td>
            <td>
                {worker.firstName}
            </td>
            <td>
                {worker.lastName}
            </td>
        </tr>
    )
}


const WorkerList = ({workers}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                First name
            </th>
            <th>
                Last year
            </th>
            {workers.map((worker) => <WorkerItem worker={worker} />)}
        </table>
    )
}

export default WorkerList