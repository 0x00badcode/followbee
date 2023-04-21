import api from './api';

// -------------------------------------------- //
// --------------------AUTH-------------------- //
// -------------------------------------------- //

export async function login(email, password) {
    try {
        const response = await api.post('/api/auth/login', {
            email: email,
            password: password,
        });
        return { success: true, data: response.data };
    } catch (error) {
        let errorMessage = 'An unknown error occurred.';

        if (error.response && error.response.status === 401) {
            errorMessage = 'Incorrect password.';
        } else if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }

        return { success: false, error: errorMessage };
    }
}

export async function register(username, email, password, isCreator) {
    try {
        const response = await api.post('/api/auth/register', {
            username,
            email,
            password,
            isCreator,
        });

        return { success: true, data: response.data };
    } catch (error) {
        let message = 'Registration failed: An unknown error occurred.';
        if (error.response && error.response.data && error.response.data.message) {
            message = 'Registration failed: ' + error.response.data.message;
        }

        return { success: false, error: message };
    }
}


// -------------------------------------------- //
// --------------------QUESTS------------------ //
// -------------------------------------------- //

export async function getQuestsForCreator(creatorId) {
    try {
        const response = await api.get(`/api/quests/${creatorId}/quests`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data.error || 'Internal server error' };
    }
}

export async function getQuest(questId) {
    try {
        const response = await api.get(`/api/quests/${questId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data.error || 'Internal server error' };
    }
}

export async function createQuest(title, description, goal, creatorId) {
    try {
        const response = await api.post('/api/quests', {
            title,
            description,
            goal,
            creatorId,
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data.error || 'Internal server error' };
    }
}

export async function updateQuest(questId, title, description, goal, progress, creatorId) {
    try {
        const response = await api.put(`/api/quests/${questId}`, {
            title,
            description,
            goal,
            progress,
            creatorId,
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data.error || 'Internal server error' };
    }
}

export async function deleteQuest(questId) {
    try {
        const response = await api.delete(`/api/quests/${questId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response.data.error || 'Internal server error' };
    }
}

export async function getQuestById(questId) {
    try {
        const response = await api.get(`/api/quests/${questId}`, {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error fetching quest:', error.response.data);
        return { success: false, error: error.response.data.error };
    }
}

export async function getCreatorQuestsAndLayout(username) {
    try {
      const response = await axios.get(`/api/users/${username}/layout`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error fetching quests and layout',
      };
    }
  }


// -------------------------------------------- //
// --------------------USERS------------------- //
// -------------------------------------------- //

export async function searchContentCreators(query) {
    try {
        const response = await api.get(`/api/users/search?q=${query}`, {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error searching content creators:', error.response.data);
        return { success: false, error: error.response.data.error };
    }
}

export async function getUserInfo(userId, token) {
    try {
      const response = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Failed to fetch user information' };
    }
  }

