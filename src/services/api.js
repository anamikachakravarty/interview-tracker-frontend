
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

// One reusable function for all API requests.
async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  // Handle unsuccessful HTTP responses.
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API request failed (${response.status}): ${errorText}`
    );
  }

  // DELETE requests may return no response body.
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Application API methods.
export const getApplications = () =>
  apiRequest("/applications/");

export const getApplication = (id) =>
  apiRequest(`/applications/${id}/`);

export const createApplication = (data) =>
  apiRequest("/applications/", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Interview API methods.
export const getInterviews = (applicationId) =>
  apiRequest(`/applications/${applicationId}/interviews/`);

export const createInterview = (applicationId, data) =>
  apiRequest(`/applications/${applicationId}/interviews/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Learning API methods.
export const getLearningTopics = () =>
  apiRequest("/learning/topics/");

export const getLearningProgress = () =>
  apiRequest("/learning/progress/");

export const createLearningTopic = (data) =>
  apiRequest("/learning/topics/", {
    method: "POST",
    body: JSON.stringify(data),
  });
