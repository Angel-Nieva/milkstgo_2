package com.mingeso.reporteservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrasaSolidoModel {
    private String proveedor;
    private Integer grasa;
    private Integer solido;
}
