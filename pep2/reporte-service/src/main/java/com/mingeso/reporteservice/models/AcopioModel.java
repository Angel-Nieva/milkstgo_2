package com.mingeso.reporteservice.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcopioModel {
    private Date fecha;
    private String turno;
    private String proveedor;
    private String kls_leche;
}
