const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/admin";

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_jwt") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// --- Auth ---
export async function sendAdminOtp(email: string) {
  const res = await fetch(`${API_BASE}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to send OTP");
  return true;
}

export async function verifyAdminOtp(email: string, otp: string) {
  const res = await fetch(`${API_BASE}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  const data = await res.json();
  if (!res.ok || !data.token) throw new Error(data.message || "OTP verification failed");
  return data.token;
}

// --- Users ---
export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/users`, {
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch users");
  return res.json();
}

export async function getUserById(id: string) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch user");
  return res.json();
}

export async function updateUser(id: string, data: any) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to update user");
  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to delete user");
  return res.json();
}

// --- Impact Cards ---
export async function getAllImpactCards() {
  const res = await fetch(`${API_BASE}/impact-cards`, {
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch impact cards");
  return res.json();
}

export async function createImpactCard(data: any) {
  const res = await fetch(`${API_BASE}/impact-cards`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to create impact card");
  return res.json();
}

export async function updateImpactCard(id: string, data: any) {
  const res = await fetch(`${API_BASE}/impact-cards/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to update impact card");
  return res.json();
}

export async function deleteImpactCard(id: string) {
  const res = await fetch(`${API_BASE}/impact-cards/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to delete impact card");
  return res.json();
}

// --- Achievement Cards ---
export async function getAllAchievementCards() {
  const res = await fetch(`${API_BASE}/achievement-cards`, {
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch achievement cards");
  return res.json();
}

export async function createAchievementCard(data: any) {
  const res = await fetch(`${API_BASE}/achievement-cards`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to create achievement card");
  return res.json();
}

export async function updateAchievementCard(id: string, data: any) {
  const res = await fetch(`${API_BASE}/achievement-cards/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to update achievement card");
  return res.json();
}

export async function deleteAchievementCard(id: string) {
  const res = await fetch(`${API_BASE}/achievement-cards/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to delete achievement card");
  return res.json();
}

// --- Success Stories ---
export async function getAllSuccessStories() {
  const res = await fetch(`${API_BASE}/success-stories`, {
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch success stories");
  return res.json();
}

export async function createSuccessStory(data: any) {
  const res = await fetch(`${API_BASE}/success-stories`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to create success story");
  return res.json();
}

export async function updateSuccessStory(id: string, data: any) {
  const res = await fetch(`${API_BASE}/success-stories/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to update success story");
  return res.json();
}

export async function deleteSuccessStory(id: string) {
  const res = await fetch(`${API_BASE}/success-stories/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to delete success story");
  return res.json();
}

// --- Media Cards ---
export async function getAllMediaCards() {
  const res = await fetch(`${API_BASE}/media-cards`, {
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to fetch media cards");
  return res.json();
}

export async function createMediaCard(data: any) {
  const res = await fetch(`${API_BASE}/media-cards`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to create media card");
  return res.json();
}

export async function updateMediaCard(id: string, data: any) {
  const res = await fetch(`${API_BASE}/media-cards/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to update media card");
  return res.json();
}

export async function deleteMediaCard(id: string) {
  const res = await fetch(`${API_BASE}/media-cards/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json", "Accept": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to delete media card");
  return res.json();
} 