package Main.UserSessions;
public class UserSessions {
    private String username;
    private int wordsPerMin;
    private double accuracy;
    private double timing_mode;
    
    public String getUsername(){return username;}
    public int getWordsPerMin(){return wordsPerMin;}
    public double getAccuracy(){return accuracy;}
    public double getTimingMode(){return timing_mode;}
    
    public void setWordsPerMin(int eWPM){wordsPerMin = eWPM;}
    public void setAccuracy(double eAcc){accuracy = eAcc;}
    public void setTimingMode(double eTM){timing_mode = eTM;}
    public void setUsername(String eUser){username = eUser;}
    
    public UserSessions(String eUser,int eWPM,double eAcc,double eTM){
        username = eUser;
        wordsPerMin = eWPM;
        accuracy = eAcc;
        timing_mode = eTM;
    }
}
