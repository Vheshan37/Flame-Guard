package controller;

import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.entity.District;
import model.entity.User;
import org.hibernate.Session;

@WebServlet(name = "UserRegistration", urlPatterns = {"/UserRegistration"})
public class UserRegistration extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Initializing Stage
        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();

        // Processing Stage
        session.save(createUser(req, session)); // Create user entity & save it on a hibernate session

        session.beginTransaction().commit();

        // Finalizing Stage
        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write("It's Done"); // change this when the mobile app completed
    }

    public User createUser(HttpServletRequest req, Session session) {
        District district = (District) session.load(District.class, req.getParameter("district"));

        User user = new User();
        user.setName(req.getParameter("name"));
        user.setMobile(req.getParameter("mobile"));
        user.setAddress(req.getParameter("address"));
        user.setUsername(req.getParameter("username"));
        user.setPassword(req.getParameter("password"));
        user.setDistrict(district);

        return user;
    }

}
