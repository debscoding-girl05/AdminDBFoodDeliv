import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '@/lib/firebaseConfig';

interface User {
  id: string; // Firestore document ID
  name: string;
  surname: string;
  email: string;
  password: string; // You might not need to store this here, keep it for initial creation
  tel: string;
  status: boolean;
  image: string;
  role: string; // 'admin', 'user', etc.
}

interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  editUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  setImage: (id: string, image: string) => void;
  updateRole: (id: string, role: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()( // Ensure the type is used directly in create
  persist(
    (set) => ({
      users: [],
      fetchUsers: async () => {
        try {
          const userCollection = collection(db, 'users');
          const snapshot = await getDocs(userCollection);
          const usersList = snapshot.docs.map((doc) => {
            const data = doc.data() as Omit<User, 'id'>; // Exclude 'id' from User type
            return { id: doc.id, ...data }; // Use Firestore document ID
          });
          set({ users: usersList });
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      addUser: async (user: Omit<User, 'id'>) => {
        try {
          const docRef = await addDoc(collection(db, 'users'), user);
          set((state) => ({
            users: [
              ...state.users,
              {
                ...user,
                id: docRef.id, // Firestore document ID
              },
            ],
          }));
        } catch (error) {
          console.error('Error adding user:', error);
        }
      },
      editUser: async (id: string, user: Partial<User>) => {
        try {
          const userRef = doc(db, 'users', id);
          await updateDoc(userRef, user);
          set((state) => ({
            users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
          }));
        } catch (error) {
          console.error('Error editing user:', error);
        }
      },
      deleteUser: async (id: string) => {
        try {
          const userRef = doc(db, 'users', id);
          await deleteDoc(userRef);
          set((state) => ({
            users: state.users.filter((user) => user.id !== id),
          }));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      },
      setImage: (id: string, image: string) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, image } : user
          ),
        }));
      },
      updateRole: async (id: string, role: string) => {
        try {
          const userRef = doc(db, 'users', id);
          await updateDoc(userRef, { role });
          set((state) => ({
            users: state.users.map((user) =>
              user.id === id ? { ...user, role } : user
            ),
          }));
        } catch (error) {
          console.error('Error updating role:', error);
        }
      },
    }),
    {
      name: 'users-storage', // Persist the state to localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
