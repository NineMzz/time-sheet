// Define the types for the loginRequest object
interface AuthConfig {
    clientId: string;
    authority: string;
    redirectUri: string;
    scopes: string[];
  }
  
  interface CacheConfig {
    cacheLocation: 'sessionStorage' | 'localStorage';
    storeAuthStateInCookie: boolean;
  }
  
  interface LoginRequestConfig {
    auth: AuthConfig;
    cache: CacheConfig;
  }
  
  const loginRequest: LoginRequestConfig = {
    auth: {
      // clientId: "d64b9ed3-3cb0-43e1-85c6-39aa7d10691a", // Replace with your actual client ID
      clientId: "de34b982-8b56-421c-8c93-f61162e03193",
      authority: "https://login.microsoftonline.com/eb1f94dc-8d25-4c67-985c-04be74c8f698", // Replace with your actual tenant ID
      redirectUri: "http://localhost:3000", // Replace with your actual redirect URI
      scopes: ["Calendars.Read"], // Add any other necessary scopes
    },
    cache: {
      cacheLocation: "sessionStorage", // Or 'localStorage' if you prefer
      storeAuthStateInCookie: false, // Set to true if you want to store auth state in a cookie
    },
  };
  
  export { loginRequest };
  