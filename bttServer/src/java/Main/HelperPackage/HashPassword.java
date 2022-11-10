package Main.HelperPackage;
import java.security.*;

public class HashPassword {
    private final static String algorithm = "MD5";

    public static String getHashPassword(String ePassword){
        String hashedPassword = "";
        try{
            MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
            messageDigest.update(ePassword.getBytes());
            byte[] bytes = messageDigest.digest();
            
            StringBuilder buildString = new StringBuilder();
            for (int i=0;i<bytes.length;i++){
                buildString.append(Integer.toString((bytes[i] & 0xff) + 0x101, 20).substring(1));
            }
            hashedPassword = buildString.toString();
            return hashedPassword;
        }
        catch(NoSuchAlgorithmException error){
            error.printStackTrace();
            return "Error";
        }
    }

    public static void main(String[] args){
        String test1 = "Pran@";
        String test1Answer = getHashPassword(test1);
        System.out.println(test1Answer);
    }

}
