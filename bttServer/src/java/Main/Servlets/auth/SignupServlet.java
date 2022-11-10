package Main.Servlets.auth;

import Main.database.Connect;
import Main.AuthPackage.Auth;
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

public class SignupServlet extends HttpServlet {
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
                
                Auth credentials = new Auth(jsonObjectCode.get("name").toString(), jsonObjectCode.get("email").toString(), jsonObjectCode.get("password").toString());
                System.out.println("hello");
                
                boolean first = true;//credentials.validateEmail();
                
                boolean second = true;//credentials.validatePassword();
                System.out.println("hello");
                
                if (first == true && second == true){
                    Connection conn = con.getConnector();
                    PreparedStatement stmt =   conn.prepareStatement("insert into users values (?, ?, ?)");
                    stmt.setString(1, credentials.getUsername());
                    stmt.setString(2, credentials.getEmail());
                    stmt.setString(3, credentials.getPassword());
                    
                    int couter = stmt.executeUpdate();
                    
                    System.out.println(couter + " records inserted!");
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
