package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import socket.Home_Socket;

@WebServlet(name = "Home", urlPatterns = {"/Home"})
public class Home extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Step 1: Read JSON payload from the request
        StringBuilder jsonStringBuilder = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonStringBuilder.append(line);
            }
        }

        String jsonPayload = jsonStringBuilder.toString();
        System.out.println("Received JSON: " + jsonPayload);

        // Step 2: Parse JSON using Gson
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(jsonPayload, JsonObject.class);

        // Step 3: Access JSON parameters
        String temperature = jsonObject.get("temperatur").getAsString(); // Note: Use "temperatur"
        boolean flameDetected = jsonObject.get("flame").getAsBoolean();

        System.out.println("Temperature: " + temperature);
        System.out.println("Flame Detected: " + flameDetected);

//        Home_Socket.sendAlertToAllClients("New Update Detected.");

        // Step 4: Respond back to the client (ESP32)
        resp.setContentType("application/json");
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", "success");
        responseObject.addProperty("message", "Data received successfully");

        resp.getWriter().write(responseObject.toString());
    }
}
