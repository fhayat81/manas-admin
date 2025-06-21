const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

console.log("API_BASE_URL: ", API_BASE_URL)

// Types based on backend models
export interface User {
  _id: string
  full_name: string
  email: string
  date_of_birth: string
  gender: "male" | "female"
  marital_status: "divorcee" | "widow" | "single"
  education: "none" | "primary school" | "high school" | "bachelor's" | "master's" | "phd"
  profession: string
  phone_number: string
  interests_hobbies?: string
  brief_personal_description?: string
  location: {
    village: string
    tehsil: string
    district: string
    state: string
  }
  guardian: {
    name: string
    contact: string
  }
  caste: "general" | "obc" | "sc" | "st" | "other"
  religion: "hindu" | "muslim" | "christian" | "sikh" | "buddhist" | "jain" | "other"
  divorce_finalized?: boolean
  children?: {
    gender: "boy" | "girl"
    age: number
  }[]
  children_count: number
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface ImpactCard {
  _id: string
  id: number
  title: string
  description: string
  imageUrl: string
  link: string
  detailedDescription: string
}

export interface AchievementCard {
  _id: string
  id: number
  icon: string
  number: string
  title: string
  description: string
}

export interface SuccessStory {
  _id: string
  id: number
  quote: string
  author: string
  location: string
}

export interface MediaCard {
  _id: string
  id: number
  title: string
  date: string
  source: string
  description: string
  imageUrl: string
  detailedDescription?: string
}

// --- Admin Users ---
export interface AdminUser {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// --- Events ---
export interface Event {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  month: string;
  day: string;
  registerLink: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  why: string;
  areas: string[];
  areaOther?: string;
  availability: string;
  experience?: string;
  createdAt: string;
}

// Auth functions
export const sendAdminOTP = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error("Failed to send OTP")
  }

  return response.json()
}

export const verifyAdminOTP = async (email: string, otp: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  })

  if (!response.ok) {
    throw new Error("Failed to verify OTP")
  }

  return response.json()
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_jwt")
  return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  }
}

// Get authorized admin emails
export const getAuthorizedEmails = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/admin-users`, {
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error("Failed to fetch admin users")
    const adminUsers = await response.json()
    return [
      process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'manasfoundation2025@gmail.com', // Use env variable
      ...adminUsers.map((user: any) => user.email)
    ]
  } catch (error) {
    // Fallback to env variable if API fails
    return [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'manasfoundation2025@gmail.com']
  }
}

export const getAuthorizedAdminEmails = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/authorized-emails`, {
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch authorized emails")
    }

    const data = await response.json();
    return data.emails;
  } catch (error: unknown) {
    console.error("Failed to fetch authorized emails:", error)
    throw error
  }
}

// User Management
export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'GET',
      headers: getAuthHeaders(),
      mode: 'cors'
  })

  console.log("response: ", response)

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Error response:", errorText);
    throw new Error("Failed to fetch users")
  }

  return response.json()
}

export const getUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user")
  }

  return response.json()
}

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Failed to update user")
  }

  return response.json()
}

export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to delete user")
  }
}

// Impact Cards Management
export const getAllImpactCards = async (): Promise<ImpactCard[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/impact-cards`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch impact cards")
  }

  return response.json()
}

export const createImpactCard = async (cardData: Omit<ImpactCard, "_id" | "id">): Promise<ImpactCard> => {
  const response = await fetch(`${API_BASE_URL}/admin/impact-cards`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(cardData),
  })

  if (!response.ok) {
    throw new Error("Failed to create impact card")
  }

  return response.json()
}

export const updateImpactCard = async (id: string, cardData: Partial<ImpactCard>): Promise<ImpactCard> => {
  const response = await fetch(`${API_BASE_URL}/admin/impact-cards/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(cardData),
  })

  if (!response.ok) {
    throw new Error("Failed to update impact card")
  }

  return response.json()
}

export const deleteImpactCard = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/impact-cards/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to delete impact card")
  }
}

// Achievement Cards Management
export const getAllAchievementCards = async (): Promise<AchievementCard[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/achievement-cards`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch achievement cards")
  }

  return response.json()
}

export const createAchievementCard = async (
  cardData: Omit<AchievementCard, "_id" | "id">,
): Promise<AchievementCard> => {
  const response = await fetch(`${API_BASE_URL}/admin/achievement-cards`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(cardData),
  })

  if (!response.ok) {
    throw new Error("Failed to create achievement card")
  }

  return response.json()
}

export const updateAchievementCard = async (
  id: string,
  cardData: Partial<AchievementCard>,
): Promise<AchievementCard> => {
  const response = await fetch(`${API_BASE_URL}/admin/achievement-cards/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(cardData),
  })

  if (!response.ok) {
    throw new Error("Failed to update achievement card")
  }

  return response.json()
}

export const deleteAchievementCard = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/achievement-cards/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to delete achievement card")
  }
}

// Success Stories Management
export const getAllSuccessStories = async (): Promise<SuccessStory[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/success-stories`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch success stories")
  }

  return response.json()
}

export const createSuccessStory = async (storyData: Omit<SuccessStory, "_id" | "id">): Promise<SuccessStory> => {
  const response = await fetch(`${API_BASE_URL}/admin/success-stories`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(storyData),
  })

  if (!response.ok) {
    throw new Error("Failed to create success story")
  }

  return response.json()
}

export const updateSuccessStory = async (id: string, storyData: Partial<SuccessStory>): Promise<SuccessStory> => {
  const response = await fetch(`${API_BASE_URL}/admin/success-stories/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(storyData),
  })

  if (!response.ok) {
    throw new Error("Failed to update success story")
  }

  return response.json()
}

export const deleteSuccessStory = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/success-stories/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to delete success story")
  }
}

// Media Cards Management
export const getAllMediaCards = async (): Promise<MediaCard[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/media-cards`, {
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch media cards")
  }

  return response.json()
}

export const createMediaCard = async (cardData: Omit<MediaCard, "_id" | "id">): Promise<MediaCard> => {
  const response = await fetch(`${API_BASE_URL}/admin/media-cards`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(cardData),
  })

  if (!response.ok) {
    throw new Error("Failed to create media card")
  }

  return response.json()
}

export const updateMediaCard = async (id: string, cardData: Partial<MediaCard>): Promise<MediaCard> => {
  const response = await fetch(`${API_BASE_URL}/admin/media-cards/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(cardData),
  })

  if (!response.ok) {
    throw new Error("Failed to update media card")
  }

  return response.json()
}

export const deleteMediaCard = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/media-cards/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error("Failed to delete media card")
  }
}

// Admin Users Management
export const getAllAdminUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/admin-users`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch admin users");
  return response.json();
};

export const createAdminUser = async (data: { email: string }): Promise<AdminUser> => {
  const response = await fetch(`${API_BASE_URL}/admin/admin-users`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create admin user");
  return response.json();
};

export const updateAdminUser = async (id: string, data: { email: string }): Promise<AdminUser> => {
  const response = await fetch(`${API_BASE_URL}/admin/admin-users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update admin user");
  return response.json();
};

export const deleteAdminUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/admin-users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete admin user");
};

// Event Management
export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/events`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
};

export const createEvent = async (data: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/admin/events`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create event");
  return response.json();
};

export const updateEvent = async (id: string, data: Partial<Event>): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update event");
  return response.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete event");
};

export const getAllVolunteers = async (): Promise<Volunteer[]> => {
  const response = await fetch(`${API_BASE_URL}/volunteer`);
  if (!response.ok) {
    throw new Error("Failed to fetch volunteers");
  }
  return response.json();
};
