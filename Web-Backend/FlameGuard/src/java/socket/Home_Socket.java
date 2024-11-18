package socket;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import model.WebSocketManager;

@ServerEndpoint("/Home_WebSocket")
public class Home_Socket {

    @OnOpen
    public void onOpen(Session session) { // Register the session
        WebSocketManager.addSession(session);
        System.out.println("New WebSocket connection: " + session.getId());
    }

    @OnMessage
    public String onMessage(String message, Session session) {
        System.out.println("Received message from " + session.getId() + ": " + message);
        return "Server response: " + message;
    }

    @OnClose
    public void onClose(Session session) { // Remove session when closed        
        WebSocketManager.removeSession(session);
        System.out.println("WebSocket connection closed: " + session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("Error on WebSocket connection: " + session.getId());
        throwable.printStackTrace();
    }

    public static void sendAlertToAllClients(String message) {
        try {
            WebSocketManager.sendMessageToAll(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
