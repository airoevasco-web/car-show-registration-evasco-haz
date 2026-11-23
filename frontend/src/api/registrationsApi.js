const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5205';

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `API Error (${response.status})`;
    try {
      const problem = await response.json();
      if (problem.errors) {
        errorMessage = Object.values(problem.errors).flat().join(' ');
      } else if (problem.detail || problem.title) {
        errorMessage = problem.detail || problem.title;
      }
    } catch {
      // Fallback if response isn't JSON
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function getRegistrations({ participantName = '', type = '', status = '', page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams();
  if (participantName) params.append('participantName', participantName);
  if (type) params.append('type', type);
  if (status) params.append('status', status);
  params.append('page', page.toString());
  params.append('pageSize', pageSize.toString());

  const response = await fetch(`${API_BASE_URL}/api/registrations?${params.toString()}`);
  return handleResponse(response);
}

export async function getSummary() {
  const response = await fetch(`${API_BASE_URL}/api/registrations/summary`);
  return handleResponse(response);
}