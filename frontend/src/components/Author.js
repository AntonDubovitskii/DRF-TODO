import React from 'react';


const AuthorItem = ({author}) => {
    return(
        <tr>
            <td>
                {author.firstName}
            </td>
            <td>
                {author.lastName}
            </td>
            <td>
                {author.birthdayYear}
            </td>
        </tr>
    )
}


const AuthorList = ({authors}) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Birthday year
            </th>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>
    )
}

export default AuthorList