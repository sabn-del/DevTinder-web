import { io } from "socket.io-client";
import { SOCKET_URL } from "./constants";

export const createSocketConnection = (userId) => {
    if (!userId) {
        console.error("Cannot create socket connection: userId is missing.");
        return null; // Or handle as appropriate
    }
    
    // ✅ FIX 3: Use the io-client library to add the userId to the query
    const socket = io(SOCKET_URL, {
        query: {
            userId: userId // Key must match what the backend expects ('userId')
        },
        withCredentials: true // If needed for cookie/CORS setup
    });

    return socket;
};