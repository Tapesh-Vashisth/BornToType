package Main.Api;

import Main.UserPackage.UserSettings;
import Main.UserPackage.UserAccount;
import Main.database.Connect;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

public class DeleteUserServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
                UserAccount user = new UserAccount(jsonObjectCode.get("username").toString(), "", jsonObjectCode.get("password").toString());
                
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("select * from user_settings where username = '" + user.getUsername() + "' and password = '" + user.getPassword() + "'");
                
                if (rs.next() == true){
//                    delete user sessions 
                      stmt.executeUpdate("delete from session_history where username = '" + user.getUsername() + "'");

//                    delete user settings 
                      stmt.executeUpdate("delete from user_settings where username = '" + user.getUsername() + "'");

//                    delete user 
                      stmt.executeUpdate("delete from users where username = '" + user.getUsername() + "'");

                    response.setStatus(200);
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
