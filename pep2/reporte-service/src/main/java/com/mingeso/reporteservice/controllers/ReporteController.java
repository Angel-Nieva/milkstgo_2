package com.mingeso.reporteservice.controllers;

import com.mingeso.reporteservice.entities.ReporteEntity;
import com.mingeso.reporteservice.services.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/planillaPagos")
public class ReporteController {
    @Autowired
    private ReporteService reporteService;

    @GetMapping()
    public ResponseEntity<List<ReporteEntity>> obtenerPlanillaPagos() {
        reporteService.calcularPlantillaPago();
        List<ReporteEntity> planillaPagos = reporteService.obtenerPlanillaPagos();
        if (planillaPagos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(planillaPagos);
    }
}
