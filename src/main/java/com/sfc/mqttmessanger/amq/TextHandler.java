package com.sfc.mqttmessanger.amq;

import javax.jms.TextMessage;

/**
 * Created by Prophet on 2017/1/9.
 */
public class TextHandler {
    public void handleText(byte[] bytes) throws Exception{
        String message = new String(bytes, "UTF-8");
        System.out.println(message);
    }
}
