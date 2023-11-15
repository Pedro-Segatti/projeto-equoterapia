package com.api.desafio.utils;

import com.api.desafio.model.Configuracoes;
import com.api.desafio.service.ConfiguracoesService;
import com.api.desafio.service.FichaEvolAtividadeMaterialService;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.*;
import java.util.*;

public class RelatorioUtil {

    public static ResponseEntity<byte[]> gerarRelatorios(JsonObject jsonParams, List registros, Configuracoes config) {
        if(ListUtil.isEmpty(registros)){
            return new ResponseEntity<byte[]>(new byte[] {}, HttpStatus.NO_CONTENT);
        }

        try{
            JsonObject jsonConvertido = new Gson().fromJson(jsonParams, JsonObject.class);
            String nomeRelatorio = jsonConvertido.get("nomeRelatorio").getAsString();
            JasperReport compileReport = null;
            InputStream stream = RelatorioUtil.class.getClassLoader().getResourceAsStream("relatorios/" + nomeRelatorio + ".jrxml");
            compileReport = JasperCompileManager.compileReport(stream);
            JsonObject parametros = jsonConvertido.get("parametros").getAsJsonObject();
            Map<String, Object> parameters = new HashMap<>();
            for(Map.Entry<String, JsonElement> valor : parametros.entrySet()){
                parameters.put(valor.getKey().toString(), valor.getValue().getAsString());
            }

            String base64Data = config.getConfImageLogo().split(",")[1];
            parameters.put("IMG", Base64.getDecoder().decode(new String(base64Data).getBytes("UTF-8")));
            JasperPrint jasperPrint = null;
            jasperPrint = JasperFillManager.fillReport(compileReport, parameters, new JRBeanCollectionDataSource(registros));
            byte data[] = JasperExportManager.exportReportToPdf(jasperPrint);
            return new ResponseEntity<byte[]>(Base64.getEncoder().encode(data), HttpStatus.OK);
        } catch (JRException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Integer getParamInteger(JsonObject json, String param){
        if(json.get(param) != null){
            return json.get(param).getAsInt();
        }
        return null;
    }
}