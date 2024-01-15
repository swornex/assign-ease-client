import axios from "axios";
import { getAccessToken } from "../utils/token";
import { ICreateAssignment } from "../interfaces/ICreateAssignment";

/**
 * Creates an assignment by making a POST request to the specified URL with the provided assignment data and authorization token.
 *
 * @param {ICreateAssignment} assignmentData - The data for the assignment to be created.
 * @return {Promise<AxiosResponse>} A promise that resolves to the response from the server.
 */
export const createAssignment = async (assignmentData: ICreateAssignment) => {
  const accessToken = getAccessToken();

  const addAssignmentUrl = "http://localhost:3000/api/assignments";

  const res = await axios.post(addAssignmentUrl, assignmentData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res;
};

/**
 * Submits an assignment.
 *
 * @param {Object} submissionData - The data required for submission.
 * @param {string} submissionData.submissionUrl - The URL for the submission.
 * @param {string | null} submissionData.assignmentId - The ID of the assignment (or null if not applicable).
 * @return {Promise} A promise that resolves to the response from the submission API.
 */
export const submitAssignment = async (submissionData: {
  submissionUrl: string;
  assignmentId: string | null;
}) => {
  const accessToken = getAccessToken();

  const submissionUrl = "http://localhost:3000/api/submissions";

  const res = await axios.post(submissionUrl, submissionData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res;
};

/**
 * Retrieves an assignment by its ID.
 *
 * @param {string | null} id - The ID of the assignment.
 * @return {Promise<AxiosResponse>} A promise that resolves to the response object.
 */
export const getAssignmentById = async (id: string | null) => {
  const accessToken = getAccessToken();

  const assignmentUrl = `http://localhost:3000/api/assignments/${id}`;

  const res = await axios.get(assignmentUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res;
};

/**
 * Edits an assignment.
 *
 * @param {string | null} id - The ID of the assignment to edit.
 * @param {ICreateAssignment} assignmentData - The updated assignment data.
 * @return {Promise<AxiosResponse<any>>} The response from the API request.
 */
export const editAssignment = async (
  id: string | null,
  assignmentData: ICreateAssignment
) => {
  const accessToken = getAccessToken();

  const updateAssignmentUrl = `http://localhost:3000/api/assignments/${id}`;

  const res = await axios.patch(updateAssignmentUrl, assignmentData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return res;
};
