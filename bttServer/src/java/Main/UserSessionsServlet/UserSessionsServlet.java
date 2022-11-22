package Main.UserSessionsServlet;

import Main.UserSessions.UserSessions;
import Main.database.Connect;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.io.PrintWriter;
import java.sql.*;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class UserSessionsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
        String jsonValue = "";
        
        if (reader!=null){
            jsonValue = reader.readLine();
        }
        
        Object file = JSONValue.parse(jsonValue);
        JSONObject jsonObjectValues = (JSONObject)file;
        
        try{
            Connect con = new Connect();
            con.connect();
            Connection conn = con.getConnector();
            Statement stmt=conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
            
            String username = jsonObjectValues.get("username").toString();
            
            ResultSet rs = stmt.executeQuery("select * from session_history where username = '" + username + "'");
           
            JSONArray retr = new JSONArray();
            while (rs.next()){
                JSONObject hold = new JSONObject();
                hold.put("wpm", rs.getInt("3"));
                hold.put("accuracy", rs.getDouble("4"));
                hold.put("timingmode", (int)rs.getDouble("5"));
                retr.add(hold);
            }
            
            con.closeConnection();
            
            response.setStatus(200);
            response.setContentType("application/json");

            PrintWriter out = response.getWriter();
            out.print(retr);
            out.flush();
        }
        catch(SQLException e){
            System.out.println(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
        String jsonValue = "";
        
        if (reader!=null){
            jsonValue = reader.readLine();
        }
        
        Object file = JSONValue.parse(jsonValue);
        JSONObject jsonObjectValues = (JSONObject)file;
        
        try{
            Connect con = new Connect();
            con.connect();
            Connection conn = con.getConnector();
            Statement stmt=conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
            ResultSet rs = stmt.executeQuery("SELECT max(sessID) from session_history");
            
            int id = 0;
            
            if (rs.next() == true){
                id = rs.getInt(1) + 1;
            }
            
            UserSessions newSess = new UserSessions(
                    jsonObjectValues.get("username").toString(),
                    Integer.parseInt(jsonObjectValues.get("wpm").toString()),
                    Double.parseDouble(jsonObjectValues.get("accuracy").toString()),
                    Double.parseDouble(jsonObjectValues.get("timingmode").toString())
            );
            
            PreparedStatement sendStmt = conn.prepareStatement("INSERT INTO session_history VALUES (?,?,?,?,?)");
            sendStmt.setInt(1,id);
            
            sendStmt.setString(2, newSess.getUsername());
            sendStmt.setInt(3, newSess.getWordsPerMin());
            sendStmt.setDouble(4, newSess.getAccuracy());
            sendStmt.setDouble(5, newSess.getTimingMode());
            int couter = sendStmt.executeUpdate();
            
            System.out.printf("Inserted Success - %d",couter);
            
            con.closeConnection();
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
