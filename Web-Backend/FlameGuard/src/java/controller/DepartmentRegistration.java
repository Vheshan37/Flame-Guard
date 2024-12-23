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
import model.entity.Department;
import model.entity.District;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "DepartmentRegistration", urlPatterns = {"/DepartmentRegistration"})
public class DepartmentRegistration extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("success", false);

        JsonObject checkValidity = checkValidity(req, session);
        if (checkValidity.get("status").getAsBoolean()) {
            session.save(createDepartment(req, session));
            session.beginTransaction().commit();
            jsonObject.addProperty("success", true);
            jsonObject.addProperty("message", "Registration successful! The department has been added to the system and is ready for use.");
        } else {
            jsonObject.addProperty("message", checkValidity.get("message").getAsString());
        }

        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(jsonObject)); // Change the response, When the mobile app completed
    }

    public Department createDepartment(HttpServletRequest req, Session session) {
        District district = (District) session.load(District.class, req.getParameter("district"));

        Department department = new Department();
        department.setName(req.getParameter("name"));
        department.setCode(req.getParameter("code"));
        department.setDistrict(district);
        department.setStatus("in");

        return department;
    }

    public JsonObject checkValidity(HttpServletRequest req, Session session) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("status", false);

        if (req.getParameter("name").isEmpty()) {
            jsonObject.addProperty("message", "Name is required.");
        } else if (req.getParameter("name").length() > 45) {
            jsonObject.addProperty("message", "Name size is too long.");
        } else if (req.getParameter("code").isEmpty()) {
            jsonObject.addProperty("message", "Code is required.");
        } else if (req.getParameter("code").length() != 6) {
            jsonObject.addProperty("message", "Code mus contain 6 digits.");
        } else {
            Criteria departmentTable = session.createCriteria(Department.class);
            departmentTable.add(Restrictions.eq("code", req.getParameter("code")));
            if (departmentTable.list().isEmpty()) {
                jsonObject.addProperty("status", true);
            } else {
                jsonObject.addProperty("message", "This department is already registered in the system.");
            }
        }

        return jsonObject;
    }
}
