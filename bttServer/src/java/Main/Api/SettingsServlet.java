package Main.Api;


import Main.UserPackage.UserSettings;
import Main.database.Connect;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.*;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class SettingsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            BufferedReader br = 
                 new BufferedReader(new InputStreamReader(request.getInputStream()));

            String json = "";
            if(br != null){
                json = br.readLine();
            }
            Object file = JSONValue.parse(json);
            
            System.out.println(json);
            
            JSONObject jsonObjectCode = (JSONObject)file;
            Connect con;
            
            try {
                con = new Connect();
                con.connect();
                Connection conn = con.getConnector();
                String username = jsonObjectCode.get("username").toString();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("select * from user_settings where username = '" + username + "'");
                
                if (rs.next() == true){
                    JSONObject retr = new JSONObject();
                    UserSettings set = new UserSettings(rs.getInt(2), rs.getInt(3), rs.getString(4));
                    retr.put("fontSize", set.getFontSize());
                    retr.put("fontfamily", set.getFontFamily());
                    retr.put("theme", set.getThemeNumber());
                    response.setStatus(200);
                    response.setContentType("application/json");
                    PrintWriter out = response.getWriter();
                    out.print(retr);
                    out.flush();
                }else{
                    response.sendError(401);
                }
            }catch (SQLException e){
                System.out.println(e);
                response.sendError(403);
            }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            BufferedReader br = 
                 new BufferedReader(new InputStreamReader(request.getInputStream()));

            String json = "";
            if(br != null){
                json = br.readLine();
            }
            Object file = JSONValue.parse(json);
            
            System.out.println(json);
            
            JSONObject jsonObjectCode = (JSONObject)file;
            Connect con;
            
            try {
                con = new Connect();
                con.connect();
                Connection conn = con.getConnector();
                UserSettings set = new UserSettings(Integer.parseInt(jsonObjectCode.get("theme").toString()), Integer.parseInt(jsonObjectCode.get("fontSize").toString()), jsonObjectCode.get("fontFamily").toString());
                String username = jsonObjectCode.get("username").toString();
                int fontSize = set.getFontSize();
                int theme = set.getThemeNumber();
                String fontfamily = set.getFontFamily();
                
                Statement stmt = conn.createStatement();
                stmt.executeUpdate("update user_settings set fontSize = " + fontSize + ", theme = " + theme + ", fontfamily = '" + fontfamily + "'where username = '" + username + "'");
                response.setStatus(200);
            }catch (SQLException e){
                System.out.println(e);
                response.sendError(403);
            }
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
