import axiosInstance from "./axiosConfig";

/**
 * API Client for clothing management.
 */

/**
 * Fetch all clothing items for the connected user.
 * @returns {Promise} Resolves to a list of clothing items.
 */
export const getClothingItems = async () => {
    try {
        const response = await axiosInstance.get("/api/clothing/my-items");
        return response.data;
    } catch (error) {
        console.error("Error fetching clothing items:", error);
        throw error;
    }
};

/**
 * Add a new clothing item.
 * @param {Object} clothing - Clothing data (name, tags, image URL, etc.).
 * @returns {Promise} Resolves to the created clothing item.
 */
export const addClothing = async (clothing) => {
    try {
        const response = await axiosInstance.post("/api/clothing", clothing);
        return response.data;
    } catch (error) {
        console.error("Error adding clothing item:", error);
        throw error;
    }
};

/**
 * Update an existing clothing item.
 * @param {number} clothingId - The ID of the clothing item to update.
 * @param {Object} updatedData - Updated clothing data.
 * @returns {Promise} Resolves to the updated clothing item.
 */
export const updateClothing = async (clothingId, updatedData) => {
    try {
        const response = await axiosInstance.put(`/api/clothing/${clothingId}/update`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating clothing item:", error);
        throw error;
    }
};

/**
 * Delete a clothing item.
 * @param {number} clothingId - The ID of the clothing item to delete.
 * @returns {Promise} Resolves to a success message.
 */
export const deleteClothing = async (clothingId) => {
    try {
        const response = await axiosInstance.delete(`/api/clothing/${clothingId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting clothing item:", error);
        throw error;
    }
};

/**
 * Fetch all available tags.
 * @returns {Promise} Resolves to a list of tags.
 */
export const getAllTags = async () => {
    try {
        const response = await axiosInstance.get("/api/tags");
        return response.data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
    }
};

/**
 * Fetch tags associated with a specific clothing item.
 * @param {number} clothingId - The ID of the clothing item.
 * @returns {Promise} Resolves to a list of tags.
 */
export const getClothingTags = async (clothingId) => {
    try {
        const response = await axiosInstance.get(`/api/clothing/${clothingId}/tags`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tags for clothing item:", error);
        throw error;
    }
};

/**
 * Upload an image to the server.
 * @param {File} file - The image file to upload.
 * @returns {Promise} Resolves to the public URL of the uploaded image.
 */
export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post("/api/clothing/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data; // Ensure API returns the URL under this key
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

/**
 * Fetch a clothing item by its ID.
 * @param {number} clothingId - The ID of the clothing item.
 * @returns {Promise} Resolves to the clothing item.
 */
export const getClothingById = async (clothingId) => {
    try {
        const response = await axiosInstance.get(`/api/clothing/${clothingId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching clothing item by ID:", error);
        throw error;
    }
};

/**
 * Fetch user profile by email.
 * @param {string} email - The email of the user.
 * @returns {Promise} Resolves to the user profile.
 */
export const getProfile = async (email) => {
    try {
        const response = await axiosInstance.get(`/api/profile/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

/**
 * Update user profile.
 * @param {string} email - The email of the user to update.
 * @param {Object} updatedProfile - Updated profile data.
 * @returns {Promise} Resolves to the updated user profile.
 */
export const updateProfile = async (email, updatedProfile) => {
    try {
        const response = await axiosInstance.put(`/api/profile/${email}/update`, updatedProfile);
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};

/**
 * Update user avatar.
 * @param {string} email - The email of the user to update.
 * @param {File} avatarFile - The new avatar file.
 * @returns {Promise} Resolves to the new avatar URL.
 */
export const updateAvatar = async (email, avatarFile) => {
    try {
        const formData = new FormData();
        formData.append("file", avatarFile);

        const response = await axiosInstance.post(`/api/profile/${email}/update-avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating avatar:", error);
        throw error;
    }
};
/**
 * Change user password.
 * @param {Object} passwordData - Object containing oldPassword and newPassword.
 * @returns {Promise} Resolves to a success message.
 */
export const changePassword = async (passwordData) => {
    try {
        const response = await axiosInstance.put('/api/auth/change-password', passwordData);
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};
