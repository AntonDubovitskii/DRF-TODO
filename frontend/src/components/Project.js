import React from 'react';


const ProjectItem = ({project}) => {
    return(
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.projectName}
            </td>
            <td>
                {project.repoLink}
            </td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Project name
            </th>
            <th>
                Repository Link
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList