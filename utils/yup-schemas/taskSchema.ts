import * as yup from "yup";

const newTaskSchema = yup
  .object()
  .shape({
    title: yup.string().required("Task title is required"),
    body: yup.string().required("Task body is required"),
    status: yup
      .string()
      .oneOf(
        ["CREATED", "IN PROGRESS", "COMPLETED"],
        "Task status field is present but it must be one of CREATED, IN PROGRESS, COMPLETED"
      ),
  })
  .noUnknown(true, "Unknown params found in task")
  .strict(true);

const updatedTaskSchema = yup
  .object()
  .shape({
    title: yup.string(),
    body: yup.string(),
    createdAt: yup.string(),
    finishedAt: yup.string(),
  })
  .noUnknown(true, "Unknown params found in task")
  .strict(true);

  const updatedTaskStatusSchema = yup
  .object()
  .shape({
    status: yup
      .string()
      .oneOf(
        ["CREATED", "IN PROGRESS", "COMPLETED"],
        "Task status must be one of CREATED, IN PROGRESS, COMPLETED"
      )
      .required("Task status is required"),
  })
  .noUnknown(true, "Unknown params found in task")
  .strict(true);

export const isValidNewTask = async (task: Object) => {
  return await newTaskSchema.validate(task, { abortEarly: false });
};

export const isValidUpdatedTask = async (task: Object) => {
  return await updatedTaskSchema.validate(task, { abortEarly: false });
};

export const isValidUpdatedTaskStatus = async (task: Object) => {
  return await updatedTaskStatusSchema.validate(task, { abortEarly: false });
};
