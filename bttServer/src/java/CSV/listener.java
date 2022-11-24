package CSV;

import javax.servlet.ServletContextEvent;  
import javax.servlet.ServletContextListener;
import java.io.FileReader;
import java.io.IOException;//signals an exception of some kind has occurred
import java.io.BufferedReader;
import Main.database.Connect;
import com.mysql.cj.protocol.Resultset;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class listener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("hmmmmm");
        String sample = ",";
        String mystring;
        try
        {
            Connect con = new Connect();
            con.connect();
            Connection conn = con.getConnector();
            try {
                
                Statement stmt = conn.createStatement();
//                uploading the users
                BufferedReader brdrd = new BufferedReader(new FileReader("D:\\tapesh\\web_finale\\bornToType\\bttServer\\src\\java\\CSV\\users.csv"));
                System.out.println("users");

                int counter = 0;
                while ((mystring = brdrd.readLine()) != null)  //Reads a line of text
                {
                    if (counter == 0){
                        counter++;
                        continue;
                    }
                    String[] user = mystring.split(sample);//utilized to split the string
                    for (int i = 0; i < user.length; i++){
                        ResultSet rs = stmt.executeQuery("select * from users where username = '" + user[0] + "'");
                        if (rs.next() == false){
                            stmt.executeUpdate("insert into users values ('" + user[0] + "','" + user[1] + "','" + user[2] + "')");
                        }else{
                            stmt.executeUpdate("update users set email = '" + user[1] + "', password = '" + user[2] + "' where username = '" + user[0] + "'");
                        }
                    }
                }
                
                System.out.println("users_settings");
                
//                uploading the user_settings
                brdrd = new BufferedReader(new FileReader("D:\\tapesh\\web_finale\\bornToType\\bttServer\\src\\java\\CSV\\user_settings.csv"));
                
                counter = 0;
                while ((mystring = brdrd.readLine()) != null)  //Reads a line of text
                {
                    if (counter == 0){
                        counter++;
                        continue;
                    }
                    String[] setting = mystring.split(sample);//utilized to split the string
                    for (int i = 0; i < setting.length; i++){
                        ResultSet rs = stmt.executeQuery("select * from user_settings where username = '" + setting[0] + "'");
                        if (rs.next() == false){
                            stmt.executeUpdate("insert into user_settings values ('" + setting[0] + "'," + setting[1] + "," + setting[2] + ",'" + setting[3] + "')");
                        }else{
                            stmt.executeUpdate("update user_settings set theme = '" + setting[1] + "', fontSize ='" + setting[2] + "', fontfamily ='" + setting[3] + "' where username = '" + setting[0] + "'");
                        }
                    }
                }
                System.out.println("session_history");

//                uploading the sessions_history
                brdrd = new BufferedReader(new FileReader("D:\\tapesh\\web_finale\\bornToType\\bttServer\\src\\java\\CSV\\session_history.csv"));
                
                
                counter = 0;
                while ((mystring = brdrd.readLine()) != null)  //Reads a line of text
                {
                    if (counter == 0){
                        counter++;
                        continue;
                    }
                    String[] session = mystring.split(sample);//utilized to split the string
                    for (int i = 0; i < session.length; i++){
                        
                        ResultSet rs = stmt.executeQuery("select * from session_history where sessID = '" + session[1] + "'");
                        if (rs.next() == false){
                            stmt.executeUpdate("insert into session_history values (" + session[1] + ",'" + session[0] + "'," + session[2] + "," + session[3] + "," + session[4] + ")");
                        }else{
                            stmt.executeUpdate("update session_history set username = '" + session[0] + "', wpm ='" + session[2] + "', accuracy = '" + session[3] + "', timing_mode = '" + session[4] + "' where sessID = " + session[1]);
                        }
                    }
                }
                
                
            } catch (IOException e) {
                System.err.println(e);
            }
        }
        catch (SQLException e)//catches exception in the try block
        {
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("Shutting down!");
    }
}