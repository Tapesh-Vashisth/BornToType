package Main.UserPackage;
import Main.HelperPackage.HashPassword;

interface user{
    public String changePassword(String ePassword);
    public String changeEmail(String eEmail);
}

public class UserAccount implements user{
    private String username;
    private String email;
    private String password;
    private UserSettings settings;

    public void setUsername(String eUsername){this.username = eUsername;}
    public void setEmail(String eEmail){this.email = eEmail;}
    public void setPassword(String ePassword){this.password = ePassword;}
    public void setSettings(UserSettings set){this.settings = set;}

    public String getUsername(){return this.username;}
    public String getEmail(){return this.email;}
    public String getPassword(){return this.password;}
    public UserSettings getSettings(){return this.settings;}

    public String changePassword(String ePassword){
        String enteredHashPassword = HashPassword.getHashPassword(ePassword);
        if (this.password.equals(enteredHashPassword)){
            throw new Error("Please enter a new Password!");
        }
        setPassword(enteredHashPassword);
        return enteredHashPassword;
    }

    public String changeEmail(String eEmail){
        if (this.email.equals(eEmail)){
            throw new Error("Please enter a new Email!");
        }
        return eEmail;
    }

    public UserAccount(String eUsername,UserSettings eSettings){
        this.username = eUsername;
        this.settings = eSettings;
    }
    
    public UserAccount(String email,String passw){
        this.email = email;
        this.password = passw;
    }

    public UserAccount(String eUsername,String email,String eEmail,String ePassword){
        this.username = eUsername;
        this.email = eEmail;
        this.password = ePassword;
        this.settings = new UserSettings();
    }
}
