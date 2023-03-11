package com.api.desafio.utils;

import java.io.Serializable;
import java.util.List;

public class StringUtil implements Serializable {

    public static String join(List<String> stringList, String separator){
        if (ListUtil.isEmpty(stringList)) {
            return null;
        }

        StringBuilder retorno = new StringBuilder();
        for (String str : stringList) {
            if (stringList.size() != 1) {
                retorno.append(str).append(separator);
            }
            retorno.append(str);
        }

        return retorno.toString();
    }

    public static boolean notNullOrEmpty(String valor){
        return valor != null && !valor.isEmpty();
    }

    public static boolean nullOrEmpty(String valor){
        return !notNullOrEmpty(valor);
    }
}
