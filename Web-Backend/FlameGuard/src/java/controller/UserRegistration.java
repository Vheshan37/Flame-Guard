package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.entity.District;
import model.entity.User;
import model.validators.Validator;
import org.hibernate.Session;

@WebServlet(name = "UserRegistration", urlPatterns = {"/UserRegistration"})
public class UserRegistration extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Initializing Stage
        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();

        // Processing Stage
        String name = req.getParameter("name");
        String mobile = req.getParameter("mobile");
        String address = req.getParameter("address");
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("status", false);

        if (name == null || name.isEmpty()) {
            jsonObject.addProperty("message", "Name is required.");
        } else if (mobile == null || mobile.isEmpty()) {
            jsonObject.addProperty("message", "Mobile is required.");
        } else if (address == null || address.isEmpty()) {
            jsonObject.addProperty("message", "Address is required.");
        } else if (username == null || username.isEmpty()) {
            jsonObject.addProperty("message", "Username is required.");
        } else if (username.length() < 5 || username.length() > 20) {
            jsonObject.addProperty("message", "Username must be between 5 and 20 characters.");
        } else if (password == null || password.isEmpty()) {
            jsonObject.addProperty("message", "Password is required.");
        } else if (!Validator.validatePassword(password, 8, true)) {
            jsonObject.addProperty("message", "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a digit.");
        } else if (req.getParameter("district") == null || req.getParameter("district").isEmpty()) {
            jsonObject.addProperty("message", "District is required.");
        } else {
            int district = Integer.parseInt(req.getParameter("district"));

            jsonObject.addProperty("status", true);

            District districtObj = (District) session.load(District.class, district);

            User user = new User();
            user.setName(req.getParameter("name"));
            user.setMobile(req.getParameter("mobile"));
            user.setAddress(req.getParameter("address"));
            user.setUsername(req.getParameter("username"));
            user.setPassword(req.getParameter("password"));
            user.setDistrict(districtObj);
            session.save(user);
            session.beginTransaction().commit();
        }

        // Finalizing Stage
        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject)); // change this when the mobile app completed
    }

}
