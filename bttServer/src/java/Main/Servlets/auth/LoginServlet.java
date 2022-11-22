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
import Main.UserPackage.UserAccount;
import Main.UserPackage.UserSettings;

public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            System.out.println("GET");
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
                
//                creating thhe user 
                UserAccount user = new UserAccount(email, password);
                
                
                Statement stmt = conn.createStatement();
                
//                get the user with the given username 
                ResultSet users = stmt.executeQuery("select * from users where email ='" + user.getEmail() + "'");
                if (users.next()){
                    JSONObject retr = new JSONObject();
                    
                    user.setUsername(users.getString(1));
                    
                    retr.put("username", user.getUsername());
                    retr.put("email", user.getEmail());
                    String cmp = users.getString(3);
//                    comparing the passwords 
                    if (cmp.equals(user.getPassword())){
                        ResultSet settings = stmt.executeQuery("select * from user_settings where username ='" + users.getString(1) + "'");
                        if (settings.next() == true){
                            UserSettings set = new UserSettings(settings.getInt(2), settings.getInt(3), settings.getString(4));
                            user.setSettings(set);
                            
                            retr.put("theme", user.getSettings().getThemeNumber());
                            retr.put("fontSize", user.getSettings().getFontSize());
                            retr.put("fontfamily", user.getSettings().getFontFamily());
                        }else{
                            retr.put("theme", 0);
                            retr.put("fontSize", 20);
                            retr.put("fontfamily", "Sofia");
                        }

                        con.closeConnection();
                        response.setStatus(200);
                        response.setContentType("application/json");
                        
                        PrintWriter out = response.getWriter();
                        out.print(retr);
                        out.flush();
                    }else{
                        con.closeConnection();
                        response.sendError(401);
                    }
                }else{
                    response.sendError(401);
                }
                
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
