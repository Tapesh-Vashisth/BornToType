package Main.Servlets.auth;

import Main.database.Connect;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
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
            }catch (SQLException e){
                System.out.println(e);
            }
            
            
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
