import React from 'react';


const LibUserItem = ({lib_user}) => {
    return(
        <tr>
            <td>
                {lib_user.username}
            </td>
            <td>
                {lib_user.firstname}
            </td>
            <td>
                {lib_user.lastname}
            </td>
            <td>
                {lib_user.email}
            </td>
        </tr>
    )
}


const LibUsersList = ({lib_users}) => {
    return (
        <table>
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Email
            </th>
            {lib_users.map((lib_user) => <LibUserItem lib_user={lib_user} />)}
        </table>
    )
}

export default LibUsersList