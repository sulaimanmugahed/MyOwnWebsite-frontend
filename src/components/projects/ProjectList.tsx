import { Box, Divider } from "@mui/material";
import { ProjectDto } from "../../utils/types/ProjectsTypes"

import ProjectListItem from "./ProjectListItem";


type ProjectsListProps = {
    projects: ProjectDto[]
    innerRef: React.Ref<HTMLDivElement>
}
export const ProjectList = ({
    projects,
    innerRef
}: ProjectsListProps) => {
    return (
        projects.map((project, index) => (
            <Box key={project.id}>
                {
                    projects.length === index - 1 ? (<ProjectListItem project={project} />) : (<ProjectListItem innerRef={innerRef} project={project} />)
                }
                <Divider variant='middle' />
            </Box>
        ))

    )
}
