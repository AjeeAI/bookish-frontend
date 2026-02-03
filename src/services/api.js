// src/services/api.js
import { db, auth } from "../firebase-config";
import { 
  collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, 
  query, orderBy, serverTimestamp 
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/driliwdn7/image/upload";
const UPLOAD_PRESET = "bookish_image"; // e.g., 'blog_images'
const articlesCollection = collection(db, "articles");

export const api = {

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Image upload failed");

    const data = await response.json();
    return data.secure_url; // Returns the internet URL of the image
  },
  // --- PUBLIC: READ ARTICLES ---
  getArticles: async () => {
    // Query documents ordered by date
    const q = query(articlesCollection, orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    
    // Map Firestore docs to your App's format
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firebase Timestamp to readable date string if needed
      date: doc.data().created_at?.toDate().toISOString().split('T')[0]
    }));
  },

  getArticleById: async (id) => {
    const docRef = doc(db, "articles", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Article not found");
    return { id: docSnap.id, ...docSnap.data() };
  },

  // --- ADMIN: AUTH ---
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { 
      user: userCredential.user, 
      token: await userCredential.user.getIdToken() 
    };
  },

  // --- ADMIN: WRITE ARTICLES ---
  createArticle: async (data) => {
    await addDoc(articlesCollection, {
      ...data,
      created_at: serverTimestamp() // Let Firebase set the time
    });
  },

  updateArticle: async (id, data) => {
    const docRef = doc(db, "articles", id);
    await updateDoc(docRef, data);
  },

  deleteArticle: async (id) => {
    const docRef = doc(db, "articles", id);
    await deleteDoc(docRef);
  },

  // --- EXTRAS ---
  sendMessage: async (contactData) => {
    try {
      await addDoc(collection(db, "messages"), {
        firstName: contactData.firstName, 
      lastName: contactData.lastName,
      
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      sent_at: new Date() // Adds a timestamp automatically so you know when it was sent
      });
    } catch (error) {
      console.error("Error saving message:", error);
      throw error; // Re-throw so the UI knows it failed
    }
  },

  // 1. Get all messages (Newest first)
  getMessages: async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Sort by date (assuming sent_at is a Timestamp)
    return messages.sort((a, b) => (b.sent_at?.seconds || 0) - (a.sent_at?.seconds || 0));
  },

  // 2. Delete a message
  deleteMessage: async (id) => {
    await deleteDoc(doc(db, "messages", id));
  },

  markAsRead: async (id) => {
    await updateDoc(doc(db, "messages", id), {
      read: true
    });
  },
  
  subscribeNewsletter: async (email) => {
    await addDoc(collection(db, "subscribers"), {
      email,
      joined_at: serverTimestamp()
    });
  }
};





// const API_BASE_URL = "https://bookish-backend-oy5j.onrender.com/api";

// // Helper to get token
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return token ? { 
//     "Content-Type": "application/json", 
//     "Authorization": `Bearer ${token}` 
//   } : { "Content-Type": "application/json" };
// };

// export const api = {
//   // --- PUBLIC ---
//   getArticles: async () => {
//     const res = await fetch(`${API_BASE_URL}/articles`);
//     return res.json();
//   },
//   getArticleById: async (id) => {
//     const res = await fetch(`${API_BASE_URL}/articles/${id}`);
//     return res.json();
//   },
//   sendMessage: async (formData) => {
//     await fetch(`${API_BASE_URL}/contact`, {
//       method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData)
//     });
//   },
//   subscribeNewsletter: async (email) => {
//     await fetch(`${API_BASE_URL}/subscribe`, {
//       method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email })
//     });
//   },

//   // --- ADMIN (NEW) ---
//   login: async (email, password) => {
//     const res = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     if (!res.ok) throw new Error("Login Failed");
//     return res.json();
//   },

//   createArticle: async (data) => {
//     const res = await fetch(`${API_BASE_URL}/articles`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error("Failed to create post");
//     return res.json();
//   },

//   // ADD THIS NEW FUNCTION:
//   updateArticle: async (id, data) => {
//     const res = await fetch(`${API_BASE_URL}/articles/${id}`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error("Failed to update post");
//     return res.json();
//   },
  
//   deleteArticle: async (id) => {
//     await fetch(`${API_BASE_URL}/articles/${id}`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     });
//   }
// };