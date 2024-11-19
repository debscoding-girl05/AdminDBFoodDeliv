import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  tel: string;
  status: boolean;
  image: string;
}

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
  editUser: (id: number, user: User) => void;
  deleteUser: (id: number) => void;
  setImage: (id: number, image: string) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      users: [],
      addUser: (user: Omit<User, "id">) =>
        set((state) => {
          return {
            users: [
              ...state.users,
              {
                ...user,
                id: Date.now(),
              },
            ],
          };
        }),
      editUser: (id: number, user: User) =>
        set((state) => ({
          users: state.users.map((l) => (l.id === id ? user : l)),
        })),
      deleteUser: (id: number) =>
        set((state) => ({
          users: state.users.filter((l) => l.id !== id),
        })),
      setImage: (id: number, image: string) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, image } : user
          ),
        })),
    }),
    {
      name: "users-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
