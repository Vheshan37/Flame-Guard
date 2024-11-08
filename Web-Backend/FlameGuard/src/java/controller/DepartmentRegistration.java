package controller;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.entity.Department;
import model.entity.District;
import model.entity.User;
import org.hibernate.Session;

@WebServlet(name = "DepartmentRegistration", urlPatterns = {"/DepartmentRegistration"})
public class DepartmentRegistration extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Initializing Stage
        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();

        // Processing Stage
        session.save(createDepartment(req, session));
        session.beginTransaction().commit();

        // Finalizing Stage
        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write("It's Done, Department Registered"); // Change the response, When the mobile app completed
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
}
