package Main.database;
import java.sql.*;

public class Connect {
    private Connection myConn = null;
    private String user;
    private String password;
    private String db;
    
    public Connect(){
        db = "btt";
        user = "root";
        password = "furava";
    }
    
    public Connect(String u, String passw, String db){
        this.user = u;
        this.password = passw;
        this.db = db;
    }
    
    public Connection getConnector(){
        return myConn;
    }
    
    public void closeConnection() throws SQLException{
        myConn.close();
    }
    
    public void connect() throws SQLException{
        try{  
            Class.forName("com.mysql.cj.jdbc.Driver");  
            myConn=DriverManager.getConnection(  
            "jdbc:mysql://localhost:3306/" + this.db, this.user, this.password);
            System.out.println("successfully connected");
        }catch(Exception e){
            System.out.println(e);
        }
    }
}