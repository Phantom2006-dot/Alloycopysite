const API_BASE = import.meta.env.VITE_API_URL || "/api";
const API_KEY = import.meta.env.VITE_API_KEY || "";

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options;
  
  const token = localStorage.getItem("auth_token");
  
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const baseUrl = API_BASE.endsWith("/api") ? API_BASE.replace(/\/api$/, "") : API_BASE;
  const fullUrl = API_BASE.endsWith("/api") ? `${API_BASE}${endpoint}` : `${API_BASE}/api${endpoint}`;
  
  const response = await fetch(fullUrl, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

export const api = {
  auth: {
    login: (username: string, password: string) =>
      request<{ token: string; user: any }>("/auth/login", {
        method: "POST",
        body: { username, password },
      }),
    register: (data: { username: string; email: string; password: string; name: string }) =>
      request<{ token: string; user: any }>("/auth/register", {
        method: "POST",
        body: data,
      }),
    me: () => request<any>("/auth/me"),
    logout: () => request<{ message: string }>("/auth/logout", { method: "POST" }),
  },

  articles: {
    list: (params?: { page?: number; limit?: number; category?: string; search?: string; status?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.category) searchParams.set("category", params.category);
      if (params?.search) searchParams.set("search", params.search);
      if (params?.status) searchParams.set("status", params.status);
      return request<{ articles: any[]; pagination: any }>(`/articles?${searchParams}`);
    },
    featured: () => request<any[]>("/articles/featured"),
    byCategory: (slug: string, page = 1) =>
      request<{ category: any; articles: any[] }>(`/articles/category/${slug}?page=${page}`),
    byAuthor: (id: number, page = 1) =>
      request<{ author: any; articles: any[] }>(`/articles/author/${id}?page=${page}`),
    getBySlug: (slug: string) => request<any>(`/articles/${slug}`),
    create: (data: any) => request<any>("/articles", { method: "POST", body: data }),
    update: (id: number, data: any) => request<any>(`/articles/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<{ message: string }>(`/articles/${id}`, { method: "DELETE" }),
    adminList: (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.status) searchParams.set("status", params.status);
      if (params?.search) searchParams.set("search", params.search);
      return request<{ articles: any[]; pagination: any }>(`/articles/admin/all?${searchParams}`);
    },
  },

  categories: {
    list: () => request<any[]>("/categories"),
    get: (slug: string) => request<any>(`/categories/${slug}`),
    create: (data: { name: string; description?: string }) =>
      request<any>("/categories", { method: "POST", body: data }),
    update: (id: number, data: { name?: string; description?: string }) =>
      request<any>(`/categories/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<{ message: string }>(`/categories/${id}`, { method: "DELETE" }),
  },

  tags: {
    list: () => request<any[]>("/tags"),
    create: (name: string) => request<any>("/tags", { method: "POST", body: { name } }),
    delete: (id: number) => request<{ message: string }>(`/tags/${id}`, { method: "DELETE" }),
  },

  media: {
    list: (params?: { page?: number; limit?: number; type?: string; search?: string; featured?: boolean }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.type) searchParams.set("type", params.type);
      if (params?.search) searchParams.set("search", params.search);
      if (params?.featured) searchParams.set("featured", "true");
      return request<{ items: any[]; pagination: any }>(`/media?${searchParams}`);
    },
    featured: () => request<any[]>("/media/featured"),
    byType: (type: string, page = 1) => request<any[]>(`/media/type/${type}?page=${page}`),
    get: (id: number) => request<any>(`/media/${id}`),
    create: (data: any) => request<any>("/media", { method: "POST", body: data }),
    update: (id: number, data: any) => request<any>(`/media/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<{ message: string }>(`/media/${id}`, { method: "DELETE" }),
    adminList: (params?: { page?: number; limit?: number; type?: string; status?: string; search?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.type) searchParams.set("type", params.type);
      if (params?.status) searchParams.set("status", params.status);
      if (params?.search) searchParams.set("search", params.search);
      return request<{ items: any[]; pagination: any }>(`/media/admin/all?${searchParams}`);
    },
  },

  team: {
    list: () => request<any[]>("/team"),
    byDepartment: (department: string) => request<any[]>(`/team/department/${department}`),
    get: (id: number) => request<any>(`/team/${id}`),
    create: (data: any) => request<any>("/team", { method: "POST", body: data }),
    update: (id: number, data: any) => request<any>(`/team/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<{ message: string }>(`/team/${id}`, { method: "DELETE" }),
    adminList: () => request<any[]>("/team/admin/all"),
  },

  events: {
    list: (params?: { page?: number; limit?: number; status?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.status) searchParams.set("status", params.status);
      return request<{ events: any[]; pagination: any }>(`/events?${searchParams}`);
    },
    upcoming: () => request<any[]>("/events/upcoming"),
    past: () => request<any[]>("/events/past"),
    get: (slug: string) => request<any>(`/events/${slug}`),
    create: (data: any) => request<any>("/events", { method: "POST", body: data }),
    update: (id: number, data: any) => request<any>(`/events/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<{ message: string }>(`/events/${id}`, { method: "DELETE" }),
    adminList: () => request<any[]>("/events/admin/all"),
  },

  uploads: {
    list: (params?: { page?: number; limit?: number; folder?: string; search?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.folder) searchParams.set("folder", params.folder);
      if (params?.search) searchParams.set("search", params.search);
      return request<{ uploads: any[]; pagination: any }>(`/uploads?${searchParams}`);
    },
    upload: async (file: File, alt?: string, folder?: string) => {
      const formData = new FormData();
      formData.append("file", file);
      if (alt) formData.append("alt", alt);
      if (folder) formData.append("folder", folder);

      const token = localStorage.getItem("auth_token");
      const baseUrl = API_BASE.endsWith("/api") ? API_BASE : `${API_BASE}/api`;
      
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      if (API_KEY) headers["X-API-Key"] = API_KEY;

      const response = await fetch(`${baseUrl}/uploads`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Upload failed" }));
        throw new Error(error.message);
      }

      return response.json();
    },
    update: (id: number, data: { alt?: string; folder?: string }) =>
      request<any>(`/uploads/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<{ message: string }>(`/uploads/${id}`, { method: "DELETE" }),
  },

  products: {
    list: (params?: { page?: number; limit?: number; category?: string; search?: string; featured?: boolean }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.category) searchParams.set("category", params.category);
      if (params?.search) searchParams.set("search", params.search);
      if (params?.featured) searchParams.set("featured", "true");
      return request<{ products: any[]; pagination: any }>(`/products?${searchParams}`);
    },
    featured: () => request<any[]>("/products/featured"),
    byCategory: (slug: string, page = 1) =>
      request<{ category: any; products: any[]; pagination: any }>(`/products/category/${slug}?page=${page}`),
    get: (idOrSlug: string | number) => request<any>(`/products/${idOrSlug}`),
    create: (data: any) => request<any>("/products", { method: "POST", body: data }),
    update: (id: number, data: any) => request<any>(`/products/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<{ message: string }>(`/products/${id}`, { method: "DELETE" }),
    adminList: (params?: { page?: number; limit?: number; status?: string; search?: string; category?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.status) searchParams.set("status", params.status);
      if (params?.search) searchParams.set("search", params.search);
      if (params?.category) searchParams.set("category", params.category.toString());
      return request<{ products: any[]; pagination: any }>(`/products/admin/all?${searchParams}`);
    },
  },

  productCategories: {
    list: () => request<any[]>("/product-categories"),
    get: (slug: string) => request<any>(`/product-categories/${slug}`),
    create: (data: { name: string; description?: string; image?: string; sortOrder?: number }) =>
      request<any>("/product-categories", { method: "POST", body: data }),
    update: (id: number, data: { name?: string; description?: string; image?: string; sortOrder?: number; isActive?: boolean }) =>
      request<any>(`/product-categories/${id}`, { method: "PUT", body: data }),
    delete: (id: number) => request<{ message: string }>(`/product-categories/${id}`, { method: "DELETE" }),
    adminList: () => request<any[]>("/product-categories/admin/all"),
  },

  health: {
    check: () => request<{ status: string; timestamp: string; version: string; mode: string }>("/health"),
  },

  payments: {
    config: () => request<{ configured: boolean; publicKey: string | null }>("/payments/config"),
    initialize: (data: {
      amount: number;
      email: string;
      name: string;
      phone?: string;
      currency?: string;
      productId?: number;
      productTitle?: string;
      redirectUrl?: string;
    }) => request<{
      status: string;
      message: string;
      data: {
        public_key: string;
        tx_ref: string;
        amount: number;
        currency: string;
        payment_options: string;
        redirect_url: string;
        customer: {
          email: string;
          phone_number: string;
          name: string;
        };
        customizations: {
          title: string;
          description: string;
          logo: string;
        };
        meta: {
          product_id: number | null;
          source: string;
        };
      };
    }>("/payments/initialize", { method: "POST", body: data }),
    verify: (transactionId: string) => request<{
      status: string;
      message: string;
      data: {
        transactionId: number;
        txRef?: string;
        amount?: number;
        currency?: string;
        paymentType?: string;
        customer?: any;
        createdAt?: string;
      };
    }>(`/payments/verify/${transactionId}`),
    initiateBankTransfer: (data: {
      amount: number;
      email: string;
      phone?: string;
      name?: string;
      currency?: string;
    }) => request<{
      status: string;
      message: string;
      data?: {
        accountNumber: string;
        bankName: string;
        amount: number;
        reference: string;
        expiresAt: string;
      };
    }>("/payments/charge/bank-transfer", { method: "POST", body: data }),
  },
};
