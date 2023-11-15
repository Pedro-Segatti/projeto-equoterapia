package com.api.desafio.utils;

import com.api.desafio.model.Cep;
import com.google.gson.Gson;

import java.io.Serializable;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.temporal.ChronoUnit;

public class IntegracaoViaCep implements Serializable{
    private static final String VIA_CEP_URL = "https://viacep.com.br/ws/";

    public static Cep findCep(String cepString) {
        cepString = cepString.replaceAll("-","");
        try {
            HttpClient httpClient = HttpClient.newBuilder()
                    .connectTimeout(Duration.of(10, ChronoUnit.SECONDS))
                    .build();

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(VIA_CEP_URL + cepString + "/json"))
                    .build();

            HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            Gson gson = new Gson();
            return gson.fromJson(httpResponse.body(), Cep.class);

        } catch (Exception e) {
            return null;
        }
    }
}
