package Main.UserPackage;

public class UserSettings {
    private int themeNumber;
    private int fontSize;
    private String fontFamily;

    public void setThemeNumber(int eNumber){this.themeNumber = eNumber;}
    public void setFontSize(int eSize){this.fontSize = eSize;}
    public void setFamily(String eFamily){this.fontFamily = eFamily;}
    
    public int getThemeNumber(){return this.themeNumber;}
    public int getFontSize(){return this.fontSize;}
    public String getFontFamily(){return this.fontFamily;}

    //Pending
    public UserSettings(){
        this.themeNumber = 1;
        this.fontSize = 16;
        this.fontFamily = "";
    }

    public UserSettings(int eTheme,int eFontSize,String eFamily){
        this.themeNumber = eTheme;
        this.fontSize = eFontSize;
        this.fontFamily = eFamily;
    }
}
