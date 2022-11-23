package Main.AuthPackage;
import java.util.regex.*;;


class Validations {
    public static boolean emailValidation(String eEmail){
        Pattern emailRegexPattern = Pattern.compile("^[A-Z0-9+_.-]+@[A-Z.-]+$",Pattern.CASE_INSENSITIVE);
        Matcher isEmailMatching = emailRegexPattern.matcher(eEmail);
        boolean isMatch = isEmailMatching.find();
        return isMatch;
    }

    public static boolean passwordValidation(String ePassword){
        Pattern passwordRegexPattern = Pattern.compile("^(?=.*[0-9])"
            + "(?=.*[a-z])(?=.*[A-Z])"
            + "(?=.*[@#$%^&+=])"
            + "(?=\\S+$).{8,20}$"
        );
        Matcher isPasswordMatching = passwordRegexPattern.matcher(ePassword);
        boolean isMatch = isPasswordMatching.find();
        return isMatch;
    }
}

public class AuthHelperFunc {
    public static void main(String[] args){
        String emailTest1 = "pranav18gupta@gmail.com";
        String emailTest2 = "pranav14g@jgoir.com";
        String emailTest3 = "pr3353*(%$@ieo53434.*(##";
        String emailTest4 = "pra43@jogijo234.com";

        String passwordTest1 = "testing";
        String passwordTest2 = "Testing@123";
        String passwordTest3 = "Testing214";
        String passwordTest4 = "@54556";

        System.out.println("Email Validation");
        System.out.println(Validations.emailValidation(emailTest1));
        System.out.println(Validations.emailValidation(emailTest2));
        System.out.println(Validations.emailValidation(emailTest3));
        System.out.println(Validations.emailValidation(emailTest4));

        System.out.println("\nPassword Validation");
        System.out.println(Validations.passwordValidation(passwordTest1));
        System.out.println(Validations.passwordValidation(passwordTest2));
        System.out.println(Validations.passwordValidation(passwordTest3));
        System.out.println(Validations.passwordValidation(passwordTest4));

    }
}
