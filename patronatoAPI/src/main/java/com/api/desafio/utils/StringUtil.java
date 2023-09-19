package com.api.desafio.utils;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

public class StringUtil implements Serializable {

    public static String join(List<String> stringList, String separator){
        if (ListUtil.isEmpty(stringList)) {
            return null;
        }

        return stringList.stream().collect(Collectors.joining(separator));
    }

    public static boolean notNullOrEmpty(String valor){
        return valor != null && !valor.isEmpty();
    }

    public static boolean nullOrEmpty(String valor){
        return !notNullOrEmpty(valor);
    }
}
