package Main.Servlets.auth;
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

public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            System.out.println("hello");
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
                String email = jsonObjectCode.get("email").toString();
                String password = jsonObjectCode.get("password").toString();
                
                Statement stmt = conn.createStatement();
                ResultSet users = stmt.executeQuery("select * from users where email ='" + email + "'");
                users.next();
    
                System.out.println("hello");
                JSONObject retr = new JSONObject();
                retr.put("username", users.getString(1));
                retr.put("email", users.getString(2));
                String cmp = users.getString(3);

                ResultSet settings = stmt.executeQuery("select * from user_settings where username ='" + users.getString(1) + "'");
                settings.next();
                
                retr.put("theme", settings.getInt(2));
                System.out.println("hell");
                retr.put("fontSize", settings.getInt(3));
                retr.put("fontfamily", settings.getString(4));
               
                System.out.println("hell");
                if (cmp.equals(password)){
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
            }     
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
