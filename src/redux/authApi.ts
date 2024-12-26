
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for user data
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

export interface LoginUserData {
  email?: string; // Either email or mobile is required
  mobile?: string;
  password: string;
}

export interface LogoutUserData {
  cookie: string; // Token is required for logout
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile?: string; // Optional field for flexibility
}

export interface AuthResponse {
  message: string;
  token?: string; // Token for login response
  user?: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
    profile?: string; // Optional field for flexibility
  };
}

// Create the API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5002/api/auth",
    baseUrl: "https://auth-server-ten-cyan.vercel.app/api/auth",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    /**
     * Endpoint for user registration
     */
    registerUser: builder.mutation<AuthResponse, RegisterUserData>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    /**
     * Endpoint for user login
     */
    loginUser: builder.mutation<AuthResponse, LoginUserData>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutUser: builder.mutation<AuthResponse, LogoutUserData>({
      query: (userData) => ({
        url: "/logout",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutAdmin: builder.mutation<AuthResponse, LogoutUserData>({
      query: (userData) => ({
        url: "/logout-admin",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Auth"],
      transformResponse: (data: { result: IUser[] }) => data.result, // Adjusted to map result to IUser[]
    }),

    getUserDetails: builder.query<IUser, string>({
      query: (id) => ({
        url: `/user-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
      transformResponse: (data: IUser) => data, // Return IUser directly
    }),

    deActivateUser: builder.mutation<AuthResponse, string>({
      query: (id) => ({
        url: `/deactivate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Auth"],
    }),

    activateUser: builder.mutation<AuthResponse, string>({
      query: (id) => ({
        url: `/activate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLogoutAdminMutation,
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
  useDeActivateUserMutation,
  useActivateUserMutation,
} = authApi;











// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Define types for user data
// export interface RegisterUserData {
//   name: string;
//   email: string;
//   password: string;
//   mobile: string;
// }

// export interface LoginUserData {
//   email?: string; // Either email or mobile is required
//   mobile?: string;
//   password: string;
// }

// export interface LogoutUserData {
//   cookie: string; // Token is required for logout
// }
// export interface IUser {

//   id: string;
//   name: string;
//   email: string;
//   mobile: string;
//   profile?: string; // Optional field for flexibility

// }

// export interface AuthResponse {
//   message: string;
//   token?: string; // Token for login response
//   user?: {
//     id: string;
//     name: string;
//     email: string;
//     mobile: string;
//     role: string;
//     profile?: string; // Optional field for flexibility
//   };
// }

// // Create the API slice
// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5002/api/auth",
//     credentials: "include",
//   }),
//   tagTypes: ["Auth"],
//   endpoints: (builder) => ({
//     /**
//      * Endpoint for user registration
//      */
//     registerUser: builder.mutation<AuthResponse, RegisterUserData>({
//       query: (userData) => ({
//         url: "/register",
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["Auth"],
//     }),

//     /**
//      * Endpoint for user login
//      */
//     loginUser: builder.mutation<AuthResponse, LoginUserData>({
//       query: (userData) => ({
//         url: "/login",
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["Auth"],
//     }),


//     logoutUser: builder.mutation<AuthResponse, LogoutUserData>({
//       query: (userData) => ({
//         url: "/logout",
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["Auth"],
//     }),

//     logoutAdmin: builder.mutation<AuthResponse, LogoutUserData>({
//       query: (userData) => ({
//         url: "/logout-admin",
//         method: "POST",
//         body: userData,
//       }),
//       invalidatesTags: ["Auth"],
//     }),

//     getAllUsers: builder.query<AuthResponse[], any>({
//       query: () => ({
//         url: "/users",
//         method: "GET",
//       }),
//       providesTags: ["Auth"],
//       transformResponse: (data: IUser[]) => data.result,
//     }),

//     getUserDetails: builder.query<IUser, string>({
//       query: (id) => ({
//         url: `/user-details/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["Auth"],
//       transformResponse: (data: AuthResponse<IUser>) => data.result,
//     }),

//     deActivateUser: builder.mutation<AuthResponse>({
//       query: id => {
//         return {
//           url: `/deactivate/${id}`,
//           method: "PUT",

//         }
//       },
//       providesTags: ["Auth"]
//     }),

//     activateUser: builder.mutation<AuthResponse>({
//       query: id => {
//         return {
//           url: `/activate/${id}`,
//           method: "PUT",
//         }
//       },
//       providesTags: ["Auth"]
//     }),


//   }),
// });


// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useLogoutUserMutation,
//   useLogoutAdminMutation,
//   useGetAllUsersQuery,
//   useGetUserDetailsQuery,
//   useDeActivateUserMutation,
//   useActivateUserMutation,
// } = authApi;
