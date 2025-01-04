import projectModel from "../models/project.model.js";
import mongoose, { mongo } from "mongoose";

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("User is required");
  }

  let project;
  try {
    project = await projectModel.create({
      name,
      users: [userId],
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Project name already exists");
    }
    throw error;
  }

  return project;
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  const alluserProjects = await projectModel.find({
    users: userId,
  });

  return alluserProjects;
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  if (!users) {
    throw new Error("users are required");
  }

  if (
    !Array.isArray(users) ||
    users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
  ) {
    throw new Error("Invalid userId(s) in users array");
  }

  if (!userId) {
    throw new Error("userId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  const project = await projectModel.findOne({
    _id: projectId,
    users: userId,
  });

  console.log(project);

  if (!project) {
    throw new Error("User not belong to this project");
  }

  const updatedProject = await projectModel.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      $addToSet: {
        users: {
          $each: users,
        },
      },
    },
    {
      new: true,
    }
  );

  return updatedProject;
};

export const getProjectById = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectId");
  }

  const project = await projectModel
    .findOne({
      _id: projectId,
    })
    .populate("users");

  return project;
};

export const updateFileTree = async ({ projectId, fileTree }) => {
  // Validate inputs
  if (!projectId) {
    throw new Error("Project ID is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project ID format.");
  }

  if (!fileTree || typeof fileTree !== "object") {
    throw new Error("File tree is required and must be an object.");
  }

  try {
    // Attempt to update the project
    const project = await projectModel.findOneAndUpdate(
      { _id: projectId },
      { fileTree },
      { new: true } // Return the updated document
    );

    // Handle case where no project is found
    if (!project) {
      throw new Error("Project not found.");
    }

    return project;
  } catch (error) {
    // Handle database or unexpected errors
    console.error(`Error updating file tree: ${error.message}`);
    throw new Error(
      "An error occurred while updating the file tree. Please try again later."
    );
  }
};
