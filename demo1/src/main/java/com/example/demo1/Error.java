package com.example.demo1;

import javafx.event.ActionEvent;
import javafx.scene.control.Button;
import java.io.IOException;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;



public class Error {
//    private static Stage stg;
    public Button mainmenu;

//    @Override
//    public void start(Stage pstage) throws IOException {
//        stg= pstage;
//        pstage.setResizable(false);
//        FXMLLoader fxmlLoader = new FXMLLoader(Login.class.getResource("under-dev.fxml"));
//        Scene scene = new Scene(fxmlLoader.load(), 700, 600);

//    }
    public void playagain(ActionEvent ae) throws  IOException{
        Login m = new Login();
        m.changescene("hello-view.fxml");
    }
}