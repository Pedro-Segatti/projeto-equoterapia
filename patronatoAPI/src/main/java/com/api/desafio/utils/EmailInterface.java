package com.api.desafio.utils;

import com.api.desafio.model.Configuracoes;

public interface EmailInterface {
    void enviarEmail(Email details, Configuracoes configuracoes);
}
