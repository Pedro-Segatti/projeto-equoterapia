package com.api.desafio.utils;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.*;

public class RelatorioUtil {

    public static ResponseEntity<byte[]> gerarRelatorios(String jsonParams, List registros) {
        if(ListUtil.isEmpty(registros)){
            return new ResponseEntity<byte[]>(new byte[] {}, HttpStatus.NO_CONTENT);
        }

        JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(Arrays.asList(), false);
        try{
            JsonObject jsonConvertido = new Gson().fromJson(jsonParams, JsonObject.class);
            String nomeRelatorio = jsonConvertido.get("nomeRelatorio").getAsString();

            JasperReport compileReport = null;
            compileReport = JasperCompileManager.compileReport(new FileInputStream("src/main/resources/relatorios/" + nomeRelatorio + ".jrxml"));
            JsonObject parametros = jsonConvertido.get("parametros").getAsJsonObject();
            Map<String, Object> parameters = new HashMap<>();
            for(Map.Entry<String, JsonElement> valor : parametros.entrySet()){
                parameters.put(valor.getKey().toString(), valor.getValue().getAsString());
            }
            JasperPrint jasperPrint = null;
            jasperPrint = JasperFillManager.fillReport(compileReport, parameters, new JRBeanCollectionDataSource(registros));
            byte data[] = JasperExportManager.exportReportToPdf(jasperPrint);

            return new ResponseEntity<byte[]>(Base64.getEncoder().encode(data), HttpStatus.OK);
        } catch (JRException | FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
