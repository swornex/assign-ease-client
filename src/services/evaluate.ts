import axios from "axios";
import { getAccessToken } from "../utils/token";
import { IEvaluateData } from "../interfaces/IEvaluateData";

/**
 * Retrieves the status of a user's assignment.
 *
 * @param {string | null} assignmentId - The ID of the assignment. If null, retrieves the status for all assignments.
 * @param {string | null} userId - The ID of the user. If null, retrieves the status for all users.
 * @returns {Promise} A promise that resolves with the status of the user's assignment.
 */
export const getUserAssignmentStatus = async (
  assignmentId: string | null,
  userId?: string | null
) => {
  const accessToken = getAccessToken();
  const userAssignmentStatusUrl =
    "http://localhost:3000/api/user-assignment-status";
  const res = await axios.get(userAssignmentStatusUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      assignmentId,
      userId
    }
  });
  return res;
};

/**
 * Evaluates an assignment by sending a POST request to the evaluation API.
 *
 * @param {IEvaluateData} evaluateData - The data to be sent in the POST request.
 * @return {Promise<AxiosResponse>} The response from the evaluation API.
 */
export const evaluateAssignment = async (evaluateData: IEvaluateData) => {
  const accessToken = getAccessToken();
  const evaluateAssignmentUrl = "http://localhost:3000/api/evaluations";

  const res = await axios.post(evaluateAssignmentUrl, evaluateData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res;
};
