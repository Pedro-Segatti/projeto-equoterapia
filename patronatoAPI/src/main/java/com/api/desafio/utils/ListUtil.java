package com.api.desafio.utils;

import java.util.List;

public class ListUtil {

    public static boolean isEmpty(List registros){
        return registros == null || registros.isEmpty();
    }

    public static boolean isNotEmpty(List registros){
        return !isEmpty(registros);
    }
}
