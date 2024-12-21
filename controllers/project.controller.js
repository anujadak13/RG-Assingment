import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";

const CreateProject = async (req, res) => {
    const { title, description} = req.body;

     const project = await Project.create({ title, description, userId: req.user.id });
     const user = await project.findByPk(project.userId)   
 
     if(!user){
         throw new ApiError(500, "Somthing went wrong while creating project")
     }

     return res.status(200).json(
         new ApiResponse(200, project, "Project created successfully")
    )

   try {
     await sendEmail(req.user.email, 'New Project Created', `Project "${title}" has been created successfully.`)
   } catch (error) {
    
   }
 
}

const GetProject = async (req, res) => {
        const projects = await Project.findAll({ where: { userId: req.user.id } });
        if(!projects){
            throw new ApiError(500, "Somthing went wrong while fetching project")
        }
        return res.status(200).json(
            new ApiResponse(200, project, "Projects find successfully")
          )
}

const UpdateProject= async (req, res) => {
    const { id } = req.params;

        const project = await Project.findByPk(id);
        if (!project || project.userId !== req.user.id) {
            throw new ApiError(404, "Project not found")
        }
        await project.update(req.body);
        return res.status(200).json(
            new ApiResponse(200, project, "Project updated successfully")
          )
}

const DeleteProject = async (req, res) => {
    const { id } = req.params;
        const project = await Project.findByPk(id);
        if (!project || project.userId !== req.user.id) {
            throw new ApiError(404, "Project not found")
        }
        await project.destroy();
        return res.status(200).json(
            new ApiResponse(200, project, "Project updated successfully")
          )
}

export{
    CreateProject,
    GetProject,
    UpdateProject,
    DeleteProject
}