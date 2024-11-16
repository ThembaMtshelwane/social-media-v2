import { create } from "zustand";
import { User } from "../definitions";
import axios from "axios";

const defaultUser = {
  _id: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  DOB: "",
  email: "",
  createdAt: "",
  updatedAt: "",
};

type CreateUserResponse = {
  success: boolean;
  message?: string;
};

type UserStore = {
  users: User[];
  user: User;
  setUser: (user: User) => void;
  createUser: (newUser: User) => Promise<CreateUserResponse | null>;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
};

export const useUser = create<UserStore>((set, get) => ({
  users: [],
  user: defaultUser,

  setUser: (user: User) =>
    set((state) => ({
      users: [...state.users, user], // add the user to the list
      user,
    })),

  createUser: async (newUser: User) => {
    try {
      const res = await axios.post("/api/users", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { success, message } = res.data;
      return { success, message };
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        success: false,
        message: "Error creating user",
      };
    }
  },

  fetchUsers: async () => {
    try {
      const res = await axios.get("/api/users");
      const data = res.data;
      set({ users: data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  fetchUser: async (id: string) => {
    try {
      const { users } = get();
      const userExists = users.find((user) => user._id === id);
      if (!userExists) {
        const res = await axios.get(`/api/users/${id}`);
        const data = res.data;
        set({ users: [...users, data.data] });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
}));
