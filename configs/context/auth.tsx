"use client";

import { AuthService } from "@youapp/services";
import { AuthRequest } from "@youapp/types";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (data: AuthRequest) => Promise<void>;
  loading: boolean;
  logout: () => Promise<void>;
  register: (data: AuthRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  };

  const login = useCallback(async (data: AuthRequest) => {
    try {
      const res = await AuthService().login(data);
      console.log({ res });
      setToken(res?.access_token);
      document.cookie = `access_token=${res?.access_token}`;
      router.push("/");
    } catch (error: any) {
      console.log({ error });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: AuthRequest) => {
    try {
      const res = await AuthService().register(data);
      console.log({ res });
      return res;
    } catch (error: any) {
      console.log({ error });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("access_token");
    document.cookie = `access_token=`;
    window.location.replace("/login");
  }, []);
  return (
    <AuthContext.Provider
      value={{ token, setToken, login, loading, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
