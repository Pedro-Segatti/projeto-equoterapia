package com.api.desafio.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateUtil {

    public static String dataFormatada(Date d) {
        if (d == null) {
            return "";
        }
        try {
            return getDateFormat().format(d);
        } catch (Exception e) {
            return "";
        }
    }

    public static DateFormat getDateFormat() {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy", new Locale("pt", "BR"));
        df.setLenient(false);
        return df;
    }

}
