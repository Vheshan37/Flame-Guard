package controller;

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
        Home_Socket.sendAlertToAllClients("New Update Detected.");
        System.out.println(req.getParameter("name"));
        resp.getWriter().write("Hello");
    }
}
