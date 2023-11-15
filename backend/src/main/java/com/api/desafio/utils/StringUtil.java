package com.api.desafio.utils;

import org.apache.commons.collections.MapUtils;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
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

    public static String replaceTextVars(Map<String, String> vars, String text) {
        if (MapUtils.isEmpty(vars)) {
            return "";
        }

        for (Map.Entry<String, String> entry : vars.entrySet()) {
            String variable = entry.getKey();
            String content = entry.getValue();
            text = text.replace(variable, content);
        }

        return text;
    }
}
