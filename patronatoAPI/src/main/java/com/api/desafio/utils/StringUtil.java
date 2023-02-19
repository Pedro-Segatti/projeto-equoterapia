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

}
