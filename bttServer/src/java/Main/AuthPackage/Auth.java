package Main.AuthPackage;

class LoginCredentials {
    private String email;
    private String password;

    public void setEmail(String eEmail){this.email = eEmail;}
    public void setPassword(String ePassword){this.password = ePassword;}

    public String getEmail(){return this.email;}
    public String getPassword(){return this.password;}

    //Used for checking if email is entered according to regex
    public boolean validateEmail(){
        return Validations.emailValidation(getEmail());
    }

    //Used for checking if password is entered according to regex
    public boolean validatePassword(){
        return Validations.passwordValidation(getPassword());
    }

    public void validateInputs(){
        if (!validateEmail()){throw new Error("Enter Valid Email Address");}
        if (!validatePassword()){throw new Error("Password must contain:\n1) Atleast 8 characters\n2) Atleast 1 UpperCase Letter \n3) Atleast 1 Special Character \n4) Atleast 1 number");}
    }

    public LoginCredentials(){
        this.email = "";
        this.password = "";
    }

    public LoginCredentials(String eEmail,String ePassword){
        this.email = eEmail;
        this.password = ePassword;
    }
}

public class Auth extends LoginCredentials{
    private String username;

    public void setUsername(String eUsername){this.username = eUsername;}
    public String getUsername(){return this.username;}

    public Auth(String eUsername,String eEmail,String ePassword){
        super(eEmail, ePassword);
        this.username = eUsername;
    }
}
