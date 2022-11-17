package Main.UserSessionsServlet;

import Main.UserSessions.UserSessions;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class UserSessionsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream()));
        String jsonValue = "";
        if (reader!=null){
            jsonValue = reader.readLine();
        }
        Object file = JSONValue.parse(jsonValue);
        JSONObject jsonObjectValues = (JSONObject)file;
        
        try{
            Connect con = new Connect();
            con.connect();
            Statement stmt=con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
            ResultSt rs = stmt.executeQuery("SELECT max(sessID) from session_history");
            int id = rs.getInt(1) + 1;
            UserSessions newSess = new UserSessions(jsonObjectValues.get(""),jsonObjectValues.get(""),jsonObjectValues.get(""),jsonObjectValues.get(""));
            PreparedStatement sendStmt = conn.prepareStatement("INSERT INTO session_history VALUES (?,?,?,?,?)");
            sendStmt.setInt(1,id);
            sendStmt.setString(2, jsonObjectValues.get(""));
            sendStmt.setInt(3, jsonObjectValues.get(""));
            sendStmt.setDouble(4, jsonObjectValues.get(""));
            sendStmt.setDouble(5, jsonObjectValues.get(""));
            int couter = sendStmt.executeUpdate();
            System.out.printf("Inserted Success - %d",couter);
        }
        catch(SQLException e){
            System.out.println(e);
        }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
