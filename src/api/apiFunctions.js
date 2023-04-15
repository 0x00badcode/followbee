import api from './api';

export async function login(email, password) {
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password,
        });

        return { success: true, data: response.data };
    } catch (error) {
        let message = 'Login failed: An unknown error occurred.';
        if (error.response && error.response.data && error.response.data.message) {
            message = 'Login failed: ' + error.response.data.message;
        }

        return { success: false, error: message };
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

// export async function createQuest(title, description, goal, creatorId) {
//     // Create quest function code
// }

// export async function updateQuest(questId, title, description, goal, progress, creatorId) {
//     // Update quest function code
// }

// export async function deleteQuest(questId, creatorId) {
//     // Delete quest function code
// }

// export async function searchContentCreators(query) {
//     // Search content creators function code
// }
