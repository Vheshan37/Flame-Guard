package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.entity.User;
import model.validators.Validator;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@MultipartConfig
@WebServlet(name = "UserSignIn", urlPatterns = {"/UserSignIn"})
public class UserSignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Initializing Stage
        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("status", false);

        System.out.println(req.getParameter("username"));

        String username = req.getParameter("username");
        String password = req.getParameter("password");

        if (username == null) {
            jsonObject.addProperty("message", "Username is required.");
        } else if (username.length() < 5 || username.length() > 20) {
            jsonObject.addProperty("message", "Username must be between 5 and 20 characters.");
        } else if (!Validator.validatePassword(password, 8, true)) {
            jsonObject.addProperty("message", "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a digit.");
        } else {

            // Processing Stage
            Criteria userTable = session.createCriteria(User.class);
            userTable.add(Restrictions.and(
                    Restrictions.eq("username", username),
                    Restrictions.eq("password", password)
            ));

            if (!userTable.list().isEmpty()) {
                jsonObject.addProperty("status", true);
                jsonObject.addProperty("message", "Validation successful.");
            } else {
                jsonObject.addProperty("message", "No records found matching the provided username and password.");
            }
        }

        // Finalizing Stage
        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject)); // change this when the mobile app completed
    }

}
